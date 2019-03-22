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
  <div class="evan theme-evan">
    <evan-dapp-wrapper
      :routes="null"
      v-on:loggedin="loadMetadata()">
      <template v-slot:content>
        <evan-loading v-if="loading"></evan-loading>

        <div class="p-3" v-if="error && !loading">
          <div class="border bg-level-1">
            <div class="d-flex p-2 pt-3 pb-3 border-bottom">
              <h4 class="m-0 ml-3">
                {{ '_bmvi.vehicle.error' | translate }}
              </h4>
            </div>

            <div class="p-3" v-html="$t('_bmvi.vehicle.error-desc')"></div>

            <div class="p-3 mt-3 text-center">
              <button type="submit" class="btn btn-rounded btn-primary"
                @click="backToList()">
                <span>{{ '_bmvi.vehicle.back-to-list' | translate }}</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="!loading && !error">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>

          <evan-dapp-wrapper-level-2>
            <template v-slot:content>
              <div class="w300">
                <div class="d-flex pl-2 pr-4 pt-3 pb-3 align-items-center justify-content-between border-bottom">
                  <h5 class="font-weight-bolder">
                    <i class="clickable fas fa-chevron-left mr-3"
                      @click="backToList()">
                    </i>
                    {{ '_bmvi.vehicle.title' | translate }}
                  </h5>
                  <h4><b class="text-primary">{{ metadata.fin }}</b></h4>
                </div>

                <ul class="nav small font-medium in w-100 mb-3 mt-auto">
                  <li class="w-100 p-4 clickable d-flex"
                    v-for="(route, index) in routes"
                    :class="{ 'active': isActive(route) }"
                    @click="evanNavigate(route)">
                    <span>{{ `_bmvi.vehicle.nav.${ route }` | translate }}</span>
                    <span class="mx-auto"></span>
                    <i class="fas fa-chevron-right"></i>
                  </li>
                </ul>
              </div>
            </template>
          </evan-dapp-wrapper-level-2>
        </div>
      </template>
    </evan-dapp-wrapper>
  </div>
</template>

<script lang="ts">
  import DashboardRootComponent from './root.ts';
  export default DashboardRootComponent;
</script>

