const fs = require('fs')
const path = require('path')

const pluginPrefix =  __dirname + '/../node_modules/';

const plugins = {
  // always needs to initialize the api solc object
  'smart-contracts-core': { path: pluginPrefix + '@evan.network/smart-contracts-core' },
}

const isAgent = source => path.basename(source).startsWith('smart-agent-') && fs.lstatSync(source).isDirectory()
const getAgents = source => fs.readdirSync(source).map(name => path.join(source, name))
      .filter(isAgent).map(f => path.basename(f))

const agents = getAgents('../../..')
for(let a of agents)
  plugins[a] = { path: pluginPrefix + a }

exports['default'] = {
  plugins: (api) => {
    return plugins
  }
}
