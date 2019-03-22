'use strict'

const {
  api,
  Initializer,
} = require('actionhero')


module.exports = class SmartAgentBmviDataRunInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run'
    this.loadPriority = 4100
    this.startPriority = 4100
    this.stopPriority = 4100
  }

  async initialize() {
    if (api.config.smartAgentBmviDataRun.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmviDataRun extends api.smartAgents.SmartAgent {
      async initialize () {
        await super.initialize()
      }
    }

    // start the initialization code
    const smartAgentBmviDataRun = new SmartAgentBmviDataRun(api.config.smartAgentBmviDataRun)
    await smartAgentBmviDataRun.initialize()

    // objects and values used outside initializer
    api.smartAgentBmviDataRun = smartAgentBmviDataRun
  }
}
