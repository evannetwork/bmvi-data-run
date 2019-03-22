'use strict'

const {
  api,
  Initializer,
} = require('actionhero')


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
      async initialize () {
        await super.initialize()

        // watch for new repair messages
        // when the car is financed approve
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunBank = new SmartAgentBmviDataRunBank(api.config.smartAgentBmviDataRunBank)
    await smartAgentBmviDataRunBank.initialize()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunBank = smartAgentBmviDataRunBank
  }
}
