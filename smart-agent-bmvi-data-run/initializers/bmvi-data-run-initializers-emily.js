'use strict'

const csv = require('csv-parser')
const fs = require('fs')

const {
  api,
  Initializer,
} = require('actionhero')

const abiDecoder = require('abi-decoder')

module.exports = class SmartAgentBmviDataRunInitializerEmily extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run-emily'
    this.loadPriority = 4100
    this.startPriority = 4100
    this.stopPriority = 4100
  }

  async initialize() {
    if (api.config.smartAgentBmviDataRunEmily.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmviDataRunEmily extends api.smartAgents.SmartAgent {
      /**
       * initialize smart agent and create runtime
       *
       * @return     {Promise}  resolved when done
       */
      async initialize () {
        await super.initialize()
        this.streams = {}
        this.maintenances = {}
        this.cursors = {}
      }

      /**
       * start listener for maintenance messages via 'maintenanceData' field
       *
       * @return     {Promise}  resolved when done
       */
      async startMaintenanceWatcher() {
        this.managedTwins = Object.keys(api.config.smartAgentBmviDataRunEmily.emilies)
        // add DataContract abi to decoder
        abiDecoder.addABI(JSON.parse(this.runtime.contractLoader.contracts.DataContract.interface))

        api.eth.blockEmitter.on('data', async (block) => {
          for (let tx of block.transactions) {
            if (tx.from === this.config.ethAccount) {
              // ignore own entries
              continue;
            }
            // check if target of transaction in list of contracts from profile
            if (this.managedTwins.includes(tx.to)) {
              const input = abiDecoder.decodeMethod(tx.input)
              if (input) {
                // check if target list is 'usagelog'
                if (input.params[0].value[0] ===
                    this.runtime.nameResolver.soliditySha3('maintenanceData')) {
                  api.log('fetching maintenanceData', 'debug')
                  // retrieve all entries, starting with newest entry
                  const entries = await this.runtime.dataContract.getListEntries(
                    tx.to,
                    'maintenanceData',
                    this.config.ethAccount,
                    true,
                    true,
                    1,
                    0,
                    true,
                  )

                  if (entries.filter(entry => entry.maintenanceApproved).length) {
                    api.log('found maintenance approval', 'debug')
                    this.maintenances[tx.to] = true
                  } else if (entries.filter(entry => entry.maintenanceFinished).length) {
                    api.log('found maintenance finished', 'debug')
                    this.maintenances[tx.to] = false
                  }
                }
              }
            }
          }
        })
      }

      /**
       * start streaming car data to streamer
       *
       * @return     {Promise}  { description_of_the_return_value }
       */
      async startStreaming () {
        const emilies = await this._getEmilies()
        for (let contractId of Object.keys(emilies)) {
          try {
            const data = await this._getCsvData(`${__dirname}/../csv/${emilies[contractId]}`)

            // check each car is approved, will not stream data (move) as long it is not approved
            let approved = false
            setInterval(async () => {
              try {
                approved = await this.runtime.dataContract.getEntry(
                  contractId, 'approval', this.config.ethAccount)
                api.log(`twin "${contractId}" is ${approved ? ' ' : 'not '}approved`, 'debug')
              } catch (ex) {
                api.log(`could not check if "${contractId}" is approved; ` +
                  ex.message || ex, 'error')
              }
            }, this.config.appvovalCheckInterval)

            // fade coordinates to maintenance point
            let maintenanceFade = 0
            setInterval(async () => {
              // only for cars, that have an approved maintenance
              if (this.maintenances[contractId]) {
                // increase fade by step (reduces distance to maintenance point with each step)
                maintenanceFade += this.config.maintenanceFadeStep
                if (maintenanceFade >= 1) {
                  // if maintenance point hash been reached, lock on this point, reset cursor
                  maintenanceFade = 1
                  this.cursors[contractId] = 0
                }
              } else {
                maintenanceFade = 0
              }
            }, this.config.maintenanceFadeInterval)


            // stream interval
            this.cursors[contractId] = 0
            setInterval(async () => {
              // only stream if approved
              if (approved) {
                // pretend, data is from now
                const row = { ...data[this.cursors[contractId]], last_seen: Date.now() }
                // if maintenance fade is active, move from last point to maintenance point
                row.longitude = row.longitude * (1 - maintenanceFade) + this.config.maintenanceX * maintenanceFade
                row.latitude = row.latitude * (1 - maintenanceFade) + this.config.maintenanceY * maintenanceFade
                try {
                  await api.streamr.addToStream(contractId, row)
                } catch (ex) {
                  api.log(`could not stream data for ${contractId}; ${ex.message || ex}`, 'error')
                }
                // no not move in data array as long as maintenance is on the way
                if (!this.maintenances[contractId]) {
                  if (this.cursors[contractId]++ >= data.length) {
                    this.cursors[contractId] = 0;
                  }
                }
              }
            }, this.config.streamInterval)
          } catch (ex) {
            api.log(`could not get data for streaming; ${ex.message || ex}`, 'error')
          }
        }
      }

      /**
       * pare csv file and return data
       *
       * @param      {string}          file    name of file to parse
       * @return     {Promise<any[]>}  csv data as array of objects
       */
      async _getCsvData (file) {
        const data = [];
        await new Promise((resolve, reject) => {
          fs.createReadStream(file)
            .pipe(csv())
            .on('data', (row) => { data.push(row) })
            .on('end', () => { resolve(); })
            .on('error', (error) => { reject(error); })
        })
        api.log(`got ${data.length} lines of data`, 'info')
        return data;
      }

      /**
       * get object with emily ids and related data reference
       *
       * @return     {Promise<any>}  key is emily id (contractId), value is file name
       */
      async _getEmilies() {
        return Promise.resolve(this.config.emilies)
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunEmily = new SmartAgentBmviDataRunEmily(api.config.smartAgentBmviDataRunEmily)
    await smartAgentBmviDataRunEmily.initialize()
    await smartAgentBmviDataRunEmily.startStreaming()
    await smartAgentBmviDataRunEmily.startMaintenanceWatcher()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunEmily = smartAgentBmviDataRunEmily
  }
}
