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

<template>
  <div>
    <div class="text-center">
      <br>
      <h4 class="text-secondary mt-3 font-weight-bold">
        {{ '_bmvi.welcome-to-bmvi' | translate }}
      </h4>

      <img class="img-fluid col-6 col-md-3 m-3"
        :src="`${ $store.state.bmviBaseUrl }/assets/data-run.png`">

      <h2 class="mt-4">{{ '_bmvi.startup' | translate }}</h2>
      <br>
    </div>
    <div class="d-md-flex container flex-wrap justify-content-center">
      <div class="
          p-3 col-md-5
          m-md-3 mb-3 p-4
          text-center
          bg-level-1 border evan-highlight"
        v-for="(type, index) in dashboardEntries"
        v-on:click="$router.push({ path: `${ dapp.baseHash }/${ type.path }` })">
        <i :class="type.icon"></i>

        <h3>
          {{ `_bmvi.overview.${ type.title }.title` | translate }}
        </h3>
        <span class="text-muted">
          {{ `_bmvi.overview.${ type.title }.desc` | translate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import OverviewComponent from './overview.ts';
  export default OverviewComponent;
</script>
