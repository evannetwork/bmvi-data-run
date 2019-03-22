'use strict'

const {
  api,
  Initializer,
} = require('actionhero')

const StreamrClient = require('streamr-client')

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
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunInsurance = new SmartAgentBmviDataRunInsurance(api.config.smartAgentBmviDataRunInsurance)
    await smartAgentBmviDataRunInsurance.initialize()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunInsurance = smartAgentBmviDataRunInsurance
  }
}
