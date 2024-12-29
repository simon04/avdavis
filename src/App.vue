<script setup lang="ts">
import { computed } from "@vue/reactivity";
import AppTitle from "./AppTitle.vue";
import AppLoading from "./AppLoading.vue";
import StationList from "./StationList.vue";
import { useFetch } from "@vueuse/core";

const { data, isFetching, isFinished, error, response } =
  useFetch<Geo.FeatureCollection>(
    "https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson",
  ).json();
const lastModified = computed(() =>
  response.value?.headers.get("Last-Modified"),
);
</script>

<template>
  <main>
    <AppTitle />
    <p v-if="isFetching">
      Loading station data
      <AppLoading />
    </p>
    <p v-if="isFinished">
      The data is ready:
      <span>{{ data?.features?.length }} stations loaded.</span>
      <span v-if="lastModified">
        Last updated on
        {{ new Date(lastModified).toLocaleString("sv") }}.
      </span>
    </p>
    <p v-if="isFinished">
      Data &copy;
      <a href="https://www.tirol.gv.at/">Land Tirol</a>
      –
      <a
        href="https://www.data.gv.at/katalog/dataset/bb43170b-30fb-48aa-893f-51c60d27056f"
      >
        data.tirol.gv.at
      </a>
      –
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
    </p>
    <p v-if="isFinished">
      av/da/vis &copy;
      <a href="https://github.com/simon04">Simon Legner</a>
      –
      <a href="https://github.com/simon04/avdavis">simon04/avdavis</a>
      –
      <a href="https://www.gnu.org/licenses/gpl-3.0-standalone.html">GPL 3.0</a>
    </p>
    <hr />
    <StationList v-if="data?.features" :features="data.features" />
    <p v-if="error" style="color: red">{error.message}</p>
  </main>
</template>

<style scoped>
main {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px white;
  padding: 1em;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
