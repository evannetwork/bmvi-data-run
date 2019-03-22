'use strict'
const { Action, api } = require('actionhero')

const rxEtherAccount = /^0x[\da-fA-F]{40}/

class SmartAgentBmvidatarun extends Action {
  constructor() {
    super()
    this.name = 'smart-agents/bmvi-data-run/bmvi-data-run'
    this.description = 'Bmvi-data-run action.'
    this.inputs = {
      srcId: {
        required: true,
        validator: this.accountValidator,
      },
    }
    this.outputExample = { }
  }

  accountValidator (param) {
    if (!param.match(rxEtherAccount)) {
      throw new Error('not a valid account address')
    }
  }

  async run({ params, response }) {
    try {
      // a signed message can be given to validate account
      // for signing messags see https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#sign
      // var srcId = await api.eth.web3.eth.accounts.recover(
      //   api.config.smartAgentBmvidatarun.sign_message, params.srcSignature);
      // if(srcId !== params.srcId) throw new Error("No verified Account.")

      /*
        do stuff
        api.smartAgentBmvidatarun.exampleFunction('some value')
      */

      response.status = 'success'

    } catch (ex) {
      api.log(ex)
      response.status = 'error'
      response.error = ex
    }
  }
}

module.exports = {
  SmartAgentBmvidatarun
}
