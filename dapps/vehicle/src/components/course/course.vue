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
  <div class="h-100 w-100 d-block">
    <l-map :zoom="config.zoom" :center="config.center">
      <l-tile-layer :url="config.url" :attribution="config.attribution"></l-tile-layer>
      <l-marker :lat-lng="config.marker"></l-marker>
      <l-polyline
      :lat-lngs="config.latlngs"
      :color="'green'">
      </l-polyline>
    </l-map>
  </div>
</template>

<script lang="ts">
  import CourseComponent from './course.ts';
  export default CourseComponent;
</script>

