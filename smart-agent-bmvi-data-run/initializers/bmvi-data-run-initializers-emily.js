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
      async initialize () {
        await super.initialize()
        this.streams = {}
      }

      async startStreaming () {
        const emilies = await this._getEmilies()
        for (let contractId of Object.keys(emilies)) {
          try {
            const data = await this._getCsvData(`${__dirname}/../csv/${emilies[contractId]}`)
            // const streamId = await this.runtime.dataContract.getEntry(
            //    contractId, 'streamId', this.config.ethAccount)
            const streamId = contractId
            // approved interval
            let approved = false
            setInterval(async () => {
              try {
                approved = await this.runtime.dataContract.getEntry(
                  contractId, 'approval', this.config.ethAccount)
                api.log(`twin "${contractId}" is ${approved ? ' ' : 'not '}approved`)
              } catch (ex) {
                api.log(`could not check if "${contractId}" is approved; ` +
                  ex.message || ex, 'error')
              }
            }, this.config.appvovalCheckInterval)
            // stream interval
            let cursor = 0
            setInterval(async () => {
              // only stream if approved
              if (approved) {
                // pretend, data is from now
                const row = { ...data[cursor], last_seen: Date.now() }
                try {
                  await api.streamr.addToStream(streamId, row)
                } catch (ex) {

                }
                if (cursor++ >= data.length) {
                  cursor = 0;
                }
              }
            }, this.config.streamInterval)
          } catch (ex) {
            api.log(`could not get data for streaming; ${ex.message || ex}`, 'error')
          }
        }
      }

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

      async _getEmilies() {
        return Promise.resolve(this.config.emilies)
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunEmily = new SmartAgentBmviDataRunEmily(api.config.smartAgentBmviDataRunEmily)
    await smartAgentBmviDataRunEmily.initialize()
    await smartAgentBmviDataRunEmily.startStreaming()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunEmily = smartAgentBmviDataRunEmily
  }
}
