'use strict'

const {
  api,
  Initializer,
} = require('actionhero')

const StreamrClient = require('streamr-client')

module.exports = class SmartAgentBmvidatarunStreamrInitializer extends Initializer {
  constructor() {
    super()
    this.name = 'bmvi-data-run-streamr'
    this.loadPriority = 4100
    this.startPriority = 4100
    this.stopPriority = 4100
  }

  async initialize() {
    this.streamrClient = new StreamrClient({
      // See below for more options
      auth: {
          apiKey: 'JncwonwNSeaFyBiMd5TVugNfNyTVtwTsmTRDIAMbji6Q'
      }
    })
    // objects and values used outside initializer
    api.smartAgentBmvidatarunStreamr = this
  }

  /**
   * adds data to a given address stream
   *
   * @param      {string}   address  ethereum address of the contract
   * @param      {string}   title    title of the contract
   * @param      {any}      data     data object to stream
   * @return     {Promise}  resolves when done
   */
  async addToStream(address, title, data) {
    return new Promise((resolve, reject) => {
      this.streamrClient.getOrCreateStream({
          name: `${address}-(${title})`,
      }).then(async (stream) => {
        // send the given data to the stream then resolve
        await stream.publish(data)
        resolve()
      })
    })
  }
}
