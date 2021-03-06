/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

declare let L: any;

import StreamrClient from 'streamr-client/dist/streamr-client.web.min.js';

@Component({ })
export default class CourseComponent extends mixins(EvanComponent) {
   config = {
    zoom: 20,
    lat: 47.413220,
    lng: -1.219482,
    center: L.latLng(52.4824840842247, 13.3575149939551),
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: L.latLng(52.4824840842247, 13.3575149939551),
    latlngs: []
  }

  created() {
    const client = new StreamrClient({
      // See below for more options
      auth: {
        apiKey: 'JncwonwNSeaFyBiMd5TVugNfNyTVtwTsmTRDIAMbji6Q'
      }
    })

    // Create a stream for this example if it doesn't exist
    client.getOrCreateStream({
        name: (<any>this).dapp.contractAddress,
    }).then((stream) => {
      client.subscribe(
        {stream: stream.id},
        (message) => {
          this.config.marker = L.latLng(message.latitude, message.longitude)
          this.config.latlngs.push([message.latitude, message.longitude])
        },
      )
    })
  }
}
