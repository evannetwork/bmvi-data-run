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
    <div class="bg-level-1 border m-3">
      <div class="d-flex p-2 pt-3 pb-3 border-bottom">
        <h4 class="m-0 ml-3">
          {{ '_bmvi.overview.usecase.title' | translate }}
        </h4>
      </div>

      <div class="pl-3 pr-3 text-center">
        <img class="img-fluid p-3 pl-5 pr-5 col-md-6"
          :src="`${ $store.state.bmviBaseUrl }/assets/usecase.png`">
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <div class="col-md-6 p-3" v-for="(usecase, index) in [ 1,2,3,4,5,6 ]">
        <div class="bg-level-1 border">
          <div class="d-flex p-2 pt-3 pb-3 border-bottom">
            <h4 class="m-0 ml-3">
              {{ `_bmvi.usecase-data.${ usecase }.title` | translate }}
            </h4>
          </div>

          <div class="d-block p-3"
            v-html="$t(`_bmvi.usecase-data.${ usecase }.desc`)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import InfoComponent from './info.ts';
  export default InfoComponent;
</script>

