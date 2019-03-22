/*
  Copyright (c) 2018-present evan GmbH.

  Licensed under the Apache License, Version 2.0 (the 'License');
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an 'AS IS' BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const gulp = require('gulp')
const path = require('path')
const fs = require('fs')

gulp.task('link-agents', () => {
  const plugins = path.resolve(process.cwd(),'node_modules/@evan.network/edge-server-seed/config/plugins.js')
  const source_plugins = '../../../../scripts/config/plugins.js'
  try {
    fs.unlinkSync(plugins)
  } catch(e) {
    // silent throw
  }
  fs.symlink(source_plugins, plugins, () => { console.log('Replaced ', plugins) })
  gulp.src('smart-agent-*/config/*.js', { read: false })
    .on('data', d => {
      const c = d.history[0]
      const p = path.parse(c)
      const agent_name = p.dir.match('(smart-agent-.*)(/|\\\\)config')[1]
      const link = 'node_modules/@evan.network/edge-server-seed/config/' + p.base
      const dd = p.dir.slice(0,-7)
      const dlink = 'node_modules/@evan.network/edge-server-seed/node_modules/' + agent_name

      fs.symlink(c, link, (err) => {
        if(err) {
          console.log("ERROR linking plugin: ", err )
        } else {
          console.log("Linked plugin: ", agent_name )
        }
      })
      fs.symlink(dd, dlink, (err) => {
        if(err) {
          console.log("ERROR linking plugin: ", err )
        }
      })
    })
});