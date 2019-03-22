'use strict'

const {
  api,
  Initializer,
} = require('actionhero')

const abiDecoder = require('abi-decoder')

module.exports = class SmartAgentBmvidatarunInsuranceWatcherInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run-insurance-watcher'
    this.loadPriority = 4000
    this.startPriority = 4000
    this.stopPriority = 4000
  }

  async initialize() {
    if (api.config.smartAgentBmviDataRunInsurance.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmviDataRunInsurance extends api.smartAgents.SmartAgent {
      async initialize () {
        await super.initialize()

        // watch for new repair messages
        // when the car is financed check if bank approves
        // then allow the repair
      }

      async startEventWatching() {

        this.managedTwins = api.config.smartAgentBmviDataRunInsurance.cars || []
        // add DataContract abi to decoder
        abiDecoder.addABI(JSON.parse(this.runtime.contractLoader.contracts.DataContract.interface))

        api.eth.blockEmitter.on('data', async (block) => {
          for (let tx of block.transactions) {
            // check if target of transaction in list of contracts from profile
            if (this.managedTwins.includes(tx.to)) {
              const input = abiDecoder.decodeMethod(tx.input)
              if (input) {
                // check if target list is 'usagelog'
                if (input.params[0].value[0] ===
                    this.runtime.nameResolver.soliditySha3('maintenanceData')) {
                  // retrieve all entries, starting with newest entry
                  const entries = await this.runtime.dataContract.getListEntries(
                    tx.to,
                    'maintenanceData',
                    config.ethAccount,
                    true,
                    true,
                    10,
                    0,
                    true,
                  )

                  const financed = await this.runtime.dataContract.getEntry(
                    tx.to,
                    'financing',
                    config.ethAccount
                  )

                  if(financed) {
                    // how this will be checked?
                  }
                }
              }
            }
          }
        })
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunInsurance = new SmartAgentBmviDataRunInsurance(api.config.smartAgentBmviDataRunInsurance)
    await smartAgentBmviDataRunInsurance.initialize()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunInsurance = smartAgentBmviDataRunInsurance
  }
}
