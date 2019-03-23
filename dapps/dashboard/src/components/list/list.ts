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
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios from 'axios';

// evan.network imports
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import { BmviVehicle } from 'vehicle.bmvi';

@Component({ })
export default class ListComponent extends Vue {
  /**
   * Show loading indicator
   */
  loading = true;

  /**
   * list of vehicles metadatas that should be displayed
   */
  vehicles: Array<any> = [ ];

  /**
   * Load the vehicle overview./
   */
  async created() {
    // const vehicleList = await axios.get('');
    const vehicleList = [
      '0xD516A0561bFa9Ed3ff99453f2298eCbED4CfAe01',
      '0xE08f6488DA3b4E1b2337e9fB2E6c39332B697299',
      '0x8D6eF9fA4b0147c172b30D9F12f78fD1EB0B9C32',
      '0xfC7C7B1528B9Ba90536d283294b056A0eE8E1a87',
      '0x0c6D0D3e975999A7D1FE5940c3478307f3dc834e',
      '0xe1A21eBdeB8Df12c8F81f0Ed124fcCF6A70D2070',
      '0x640195883d819C9B9389431738feAD2D89fC0350',
      '0x432aB827143078fbacd83bDa1cd2196E8dB5D666',
      '0xCd93D0cA6a721f77A3784EEd18733ae1Bbc6c10B',
      '0x2D96D4d034265ddd30C7fe7F923C189072c349DB'
    ];

    this.vehicles = vehicleList.map((contractAddess: string) => {
      const twin = BmviVehicle.getVehicle((<any>this).getRuntime(), contractAddess);

      // load the twin data asynchroniously and show the loading symbol for each row
      twin.loading = true;
      Promise.resolve().then(async () => {
        try {
          await twin.getEntry('metadata');
          await twin.getEntry('cocData');
        } catch (ex) {
          twin.error = ex;
          console.error(ex);
        }

        twin.loading = false;
      });

      return twin;
    })

    this.loading = false;
  }

  /**
   * Open the vehicle detail.
   *
   * @param      {any}  vehicle  vehicle object
   */
  openVehicle(vehicle: any) {
    (<any>this).evanNavigate([
      `list/vehicle.bmvi.${ dappBrowser.getDomainName() }`,
      vehicle.address
    ].join('/'));
  }
}
