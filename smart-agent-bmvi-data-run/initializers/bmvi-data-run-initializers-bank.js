'use strict'

const {
  api,
  Initializer,
} = require('actionhero')

const abiDecoder = require('abi-decoder')

module.exports = class SmartAgentBmvidatarunBankWatcherInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run-bank-watcher'
    this.loadPriority = 4000
    this.startPriority = 4000
    this.stopPriority = 4000
  }

  async initialize() {
    if (api.config.smartAgentBmviDataRunInsurance.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmviDataRunBank extends api.smartAgents.SmartAgent {
      /**
       * initialize smart agent and create runtime
       *
       * @return     {Promise}  resolved when done
       */
      async initialize () {
        await super.initialize()
        this.approvals = {}
      }

      async startEventWatching() {
        this.managedTwins = api.config.smartAgentBmviDataRunInsurance.cars || []
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
                  // retrieve all entries, starting with newest entry
                  const entries = await this.runtime.dataContract.getListEntries(
                    tx.to, 'maintenanceData', this.config.ethAccount, true, true, 10, 0, true)
                  // get financed status
                  const financed = await this.runtime.dataContract.getEntry(
                    tx.to, 'financing', this.config.ethAccount)
                  // keep only requests (only requests have the property 'description')
                  const requests = entries.filter(entry => entry.description)
                  if (requests.length && financed) {
                    const reference = requests[0].reference
                    if (!this.approvals[reference]) {
                      // mark as approved and assume, that approval will succeed
                      this.approvals[reference] = true
                      api.log(`approving damage report ${reference} for ${tx.to} from bank`)
                      await this.runtime.dataContract.addListEntries(
                        tx.to,
                        'maintenanceData',
                        [ { reference, bankApproved: true } ],
                        this.config.ethAccount,
                      )
                    }
                  }
                }
              }
            }
          }
        })
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunBank = new SmartAgentBmviDataRunBank(api.config.smartAgentBmviDataRunBank)
    await smartAgentBmviDataRunBank.initialize()
    await smartAgentBmviDataRunBank.startEventWatching()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunBank = smartAgentBmviDataRunBank
  }
}
