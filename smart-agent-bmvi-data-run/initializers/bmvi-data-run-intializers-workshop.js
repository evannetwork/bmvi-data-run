'use strict'

const {
  api,
  Initializer,
} = require('actionhero')


module.exports = class SmartAgentBmvidatarunWorkshopWatcherInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run-workshop-watcher'
    this.loadPriority = 4000
    this.startPriority = 4000
    this.stopPriority = 4000
  }

  async initialize() {
    if (api.config.smartAgentBmviDataRunWorkshop.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentBmviDataRunWorkshop extends api.smartAgents.SmartAgent {
      async initialize () {
        await super.initialize()

        // watch for new repair messages
        // when the car is financed check if bank approves
        // then allow the repair
      }

      async addRepairMessage(address, message) {
        const entries = await this.runtime.dataContract.addListEntries(
          address,
          'maintenanceData',
          [{date: Date.now(), description: message}],
          config.ethAccount,
        )
      }
    }

    // start the initialization code
    const smartAgentBmviDataRunWorkshop = new SmartAgentBmviDataRunWorkshop(api.config.smartAgentBmviDataRunWorkshop)
    await smartAgentBmviDataRunWorkshop.initialize()

    // objects and values used outside initializer
    api.smartAgentBmviDataRunWorkshop = smartAgentBmviDataRunWorkshop
  }
}
