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
    this.loadPriority = 4000
    this.startPriority = 4000
    this.stopPriority = 4000
  }

  async initialize() {
    this.streamrClient = new StreamrClient({
      // See below for more options
      auth: {
          apiKey: 'JncwonwNSeaFyBiMd5TVugNfNyTVtwTsmTRDIAMbji6Q'
      }
    })
    // objects and values used outside initializer
    api.streamr = this
  }

  /**
   * adds data to a given address stream
   *
   * @param      {string}   streamId  The stream identifier
   * @param      {any}      data      data object to stream
   * @return     {Promise}  resolves when done
   */
  async addToStream(streamId, data) {
    return new Promise((resolve, reject) => {
      this.streamrClient.getOrCreateStream({
          name: streamId,
      }).then(async (stream) => {
        // send the given data to the stream then resolve
        await stream.publish(data)
        resolve()
      })
    })
  }
}
