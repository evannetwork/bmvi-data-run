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
    <div class="bg-level-1 border p-3 m-3">
      <evan-loading v-if="loading"></evan-loading>
      <template v-if="!loading">
        <div class="d-flex pb-3 pt-3 border-bottom align-items-center">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.nav.financing` | translate }}
          </h4>
        </div>

        <div class="text-center">
          <i class="fas fa-check text-success m-4" style="font-size: 5em;" v-if="financing"></i>
          <i class="fas fa-times text-danger m-4" style="font-size: 5em;" v-if="!financing"></i>

          <h3 class="m-3">
            {{ `_bmvi.vehicle.financing.${ financing }` | translate }}
          </h3>

          <div class="d-flex justify-content-center mb-3"
            v-if="activeAccount === '0x2483205A7689bf78d930519229EA96D43E491D3b'">
            <evan-modal ref="submitModal">
              <template v-slot:header>
                <h5 class="modal-title">
                  {{ '_bmvi.vehicle.financing.question' | translate }}
                </h5>
              </template>
              <template v-slot:body>
                <p>{{ '_bmvi.vehicle.financing.question-desc' | translate }}</p>
              </template>
              <template v-slot:footer>
                <button type="button" class="btn btn-rounded font-weight-normal"
                  :class="{ 'btn-danger': financing, 'btn-success': !financing }"
                  @click="setFinancing(); $refs.submitModal.hideModal()">
                  {{ `_bmvi.vehicle.financing.set.${ !financing }` | translate }}
                </button>
              </template>
            </evan-modal>
            <button type="submit" class="btn btn-rounded d-flex align-items-center"
              @click="$refs.submitModal.showModal()"
              :class="{ 'btn-danger': financing, 'btn-success': !financing }"
              :disabled="syncing">
              <div class="spinner-border spinner-border-sm text-light mr-3"
                v-if="syncing">
              </div>
              <span>{{ `_bmvi.vehicle.financing.set.${ !financing }` | translate }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import FinancingComponent from './financing.ts';
  export default FinancingComponent;
</script>

