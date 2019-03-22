'use strict'

const {
  api,
  Initializer,
} = require('actionhero')


module.exports = class SmartAgentBmvidatarunInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run'
    this.loadPriority = 4100
    this.startPriority = 4100
    this.stopPriority = 4100
  }

  async initialize() {
    if (api.config.smartAgentBmvidatarun.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmvidatarun extends api.smartAgents.SmartAgent {
      async initialize () {
        await super.initialize()
      }
    }

    // start the initialization code
    const smartAgentBmvidatarun = new SmartAgentBmvidatarun(api.config.smartAgentBmvidatarun)
    await smartAgentBmvidatarun.initialize()

    // objects and values used outside initializer
    api.smartAgentBmvidatarun = smartAgentBmvidatarun
  }
}
