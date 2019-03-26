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
import axios from 'axios';

// evan.network imports
import { EvanComponent } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import { BmviVehicle } from 'vehicle.bmvi';

@Component({ })
export default class ListComponent extends mixins(EvanComponent) {
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
      '0xCAaE66c7bBc8CfD96832a2B064Def032912DB005',
      '0x26f264A0C290FD01047D8e07DF9e4a5Fd3263601',
      '0x36255C016c35123b226Ad8c5A4BD131aF765F6c7',
      '0x19531f172C8e217BbEdE910B76cD672cd3F5b355',
      '0x63EACF3FC4bE1fc812c2DEF4DB5572dd30eaFDE6',
      '0xBBb7C3311840AD48EDCE6B846A84c35eeff008e3',
      '0x4c99C9b06FE9E05CAe45D4eF03CC21A5de15deef',
      '0x87604D997fa74633e5BE286d69498B4BD3723620',
      '0x15602aE48526E54f0fD9fAe18EE45B7987a47039',
      '0x8DBC0A73C31CD952d5483495E6C97EbFb58eB349'
    ];

    this.vehicles = vehicleList.map((contractAddess: string) => {
      const twin = BmviVehicle.getVehicle((<any>this).getRuntime(), contractAddess);

      // load the twin data asynchroniously and show the loading symbol for each row
      twin.loading = true;
      Promise.resolve().then(async () => {
        try {
          await twin.getEntry('cocData');
        } catch (ex) {
          console.error(ex);
        }

        try {
          await twin.getEntry('metadata');
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
