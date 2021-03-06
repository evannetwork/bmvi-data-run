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
// import evan libs
import { RouteRegistrationInterface, DAppLoader, EvanIframe } from '@evan.network/ui-vue-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import OverviewComponent from './components/overview/overview.vue';
import ListComponent from './components/list/list.vue';
import InfoComponent from './components/info/info.vue';

// map them to element names, so they can be used within templates
const routeRegistration: Array<RouteRegistrationInterface> = [
  { path: '', component: OverviewComponent },
  { path: 'list', component: ListComponent },
  { path: 'usecase', component: InfoComponent },
  { path: `list/vehicle.bmvi.${ dappBrowser.getDomainName() } }/:address`, component: DAppLoader },
  { path: `vehicle.bmvi.${ dappBrowser.getDomainName() } }/:address`, component: DAppLoader },
];

export default routeRegistration;

