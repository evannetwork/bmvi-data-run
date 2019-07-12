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
    <bmvi-error v-if="error && !loading"></bmvi-error>
    <div class="bg-level-1 border p-3 m-3" v-if="!error">
      <evan-loading v-if="loading"></evan-loading>
      <template v-if="!loading && !error">
        <div class="d-flex pb-3 border-bottom align-items-center">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.nav.maintenance` | translate }}
          </h4>
          <div class="mx-auto"></div>
          <templace v-if="activeAccount === '0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc'">
            <evan-modal ref="submitModal">
              <template v-slot:header>
                <h5 class="modal-title">
                  {{ '_bmvi.vehicle.set-repair.question' | translate }}
                </h5>
              </template>
              <template v-slot:body>
                <p>{{ '_bmvi.vehicle.set-repair.question-desc' | translate }}</p>
              </template>
              <template v-slot:footer>
                <button type="button" class="btn btn-rounded btn-danger font-weight-normal"
                  @click="reportDamage(); $refs.submitModal.hide()">
                  {{ `_bmvi.vehicle.set-repair.title` | translate }}
                </button>
              </template>
            </evan-modal>
            <button type="submit" class="btn btn-rounded btn-danger d-flex align-items-center mr-3"
              @click="$refs.submitModal.show()"
              :disabled="syncing">
              <div class="spinner-border spinner-border-sm text-light mr-3"
                v-if="syncing">
              </div>
              <span>{{ '_bmvi.vehicle.set-repair.title' | translate }}</span>
            </button>
          </templace>
        </div>
        <table class="table table-borderless mt-3">
          <thead>
            <tr>
              <th>{{ '_bmvi.vehicle.maintenance.id' | translate }}</th>
              <th>{{ '_bmvi.vehicle.maintenance.description' | translate }}</th>
              <th>{{ '_bmvi.vehicle.maintenance.status' | translate }}</th>
              <th v-if="activeAccount === '0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc'"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, index) in maintenanceData">
              <td>{{ value.reference }}</td>
              <td class="d-flex">
                <span>{{ value.description }}</span>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(status, index) in [ 'bankApproved', 'insuraceApproved', 'maintenanceApproved', 'maintenanceFinished' ]">
                    <i class="mr-3 mdi mdi-check text-success" style="width: 16px" v-if="value[status]"></i>
                    <i class="mr-3 mdi mdi-close text-danger" style="width: 16px" v-if="!value[status]"></i>
                    {{ `_bmvi.vehicle.maintenance.${ status }` | translate }}
                  </li>
                </ul>
              </td>
              <td class="text-right"
                v-if="activeAccount === '0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc' && !value.maintenanceFinished && !syncing">
                <evan-modal ref="finishMaintenance">
                  <template v-slot:header>
                    <h5 class="modal-title">
                      {{ '_bmvi.vehicle.finish-maintenance.question' | translate }}
                    </h5>
                  </template>
                  <template v-slot:body>
                    <p>{{ '_bmvi.vehicle.finish-maintenance.question-desc' | translate }}</p>
                  </template>
                  <template v-slot:footer>
                    <button type="button" class="btn btn-rounded btn-success font-weight-normal"
                      @click="finishMaintenance(value.reference); $refs.finishMaintenance[index].hide()">
                      {{ `_bmvi.vehicle.finish-maintenance.title` | translate }}
                    </button>
                  </template>
                </evan-modal>
                <button type="submit" class="btn btn-rounded btn-outline-success icon-only"
                  @click="$refs.finishMaintenance[index].show()">
                  <i class="mdi mdi-check"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import MaintenanceComponent from './maintenance.ts';
  export default MaintenanceComponent;
</script>

