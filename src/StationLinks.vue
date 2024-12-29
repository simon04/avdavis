<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps<{
  feature: Geo.Feature;
}>();
const { width } = useWindowSize();

const latitude = computed<number>(() => props.feature.geometry.coordinates[1]);
const longitude = computed<number>(() => props.feature.geometry.coordinates[0]);
const geo = computed<string>(() => `geo:${latitude.value},${longitude.value}`);
const osm = computed<string>(
  () =>
    `https://www.openstreetmap.org/?mlat=${latitude.value}&mlon=${longitude.value}`,
);
const plots = computed<{ interval: string; url: string }[]>(() =>
  "1d/tag 3d/dreitage 1w/woche 1m/monat 6m/winter".split(" ").map((i) => {
    const [interval, fragment] = i.split("/");
    const width0 = width.value < 800 ? 540 : width.value < 1100 ? 800 : 1100;
    const url = `https://wiski.tirol.gv.at/lawine/grafiken/${width0}/standard/${fragment}/${props.feature.properties.plot}.png`;
    return { interval, url };
  }),
);
</script>

<style scoped>
ul,
li {
  padding: 0;
  display: inline;
}
li {
  list-style: none;
}
ul::before {
  content: "[ ";
}
ul::after {
  content: " ]";
}
</style>

<template>
  <ul>
    <li v-for="plot in plots" :key="plot.interval">
      <a :href="plot.url">{{ plot.interval }}</a>
      {{ " " }}
    </li>
    <li>
      <a :href="geo">geo:</a>
      {{ " " }}
    </li>
    <li>
      <a :href="osm" title="Show on OpenStreetMap">osm</a>
    </li>
  </ul>
</template>
