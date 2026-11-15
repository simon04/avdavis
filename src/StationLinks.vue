<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { computed, ref } from "vue";
import "@albina-euregio/linea";

const props = defineProps<{
  feature: Geo.Feature;
}>();
const { width } = useWindowSize();

const id = computed<string>(() => props.feature.properties["LWD-Nummer"] ?? props.feature.id);
const linea = ref(false);
defineOptions({
  compilerOptions: {
    isCustomElement: (tag) => tag === "linea-plot",
  },
});

const latitude = computed<number>(() => props.feature.geometry.coordinates[1]!);
const longitude = computed<number>(() => props.feature.geometry.coordinates[0]!);
const geo = computed<string>(() => `geo:${latitude.value},${longitude.value}`);
const lineaFeatures = computed<string>(() =>
  JSON.stringify([
    {
      type: "Feature",
      id: props.feature.id,
      geometry: props.feature.geometry,
      properties: {
        name: props.feature.properties.name,
        shortName: /^[A-Za-z0-9]+$/.test(id.value) ? id.value : undefined,
        operator: props.feature.properties.operator,
        operatorLink: "https://lawine.tirol.gv.at/",
        operatorLicense: "CC BY 4.0",
        dataProviderID: "ALBINA",
        dataURLs: ["woche", "winter", "all"].map(
          (interval) =>
            `https://wiski.tirol.gv.at/lawine/grafiken/smet/${interval}/${id.value}.smet.gz`,
        ),
      },
    },
  ]),
);
const osm = computed<string>(
  () => `https://www.openstreetmap.org/?mlat=${latitude.value}&mlon=${longitude.value}`,
);
const plots = computed<{ interval: string; url: string }[]>(() =>
  "1d/tag 3d/dreitage 1w/woche 1m/monat 6m/winter".split(" ").map((i) => {
    const [interval, fragment] = i.split("/");
    const width0 = width.value < 800 ? 540 : width.value < 1100 ? 800 : 1100;
    const url = `https://wiski.tirol.gv.at/lawine/grafiken/${width0}/standard/${fragment}/${props.feature.properties.plot}.png`;
    return { interval: interval!, url };
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

dialog {
  width: 90vw;
  height: 90vh;
  overflow-y: scroll;
}
</style>

<template>
  <dialog :open="linea" @close="linea = false" closedby="any">
    <linea-plot
      v-if="linea"
      showtitle
      showsurfacehoarseries
      showexport
      showdatepicker
      :features="lineaFeatures"
      :forecast-latlon="`${latitude},${longitude}`"
    />
  </dialog>
  <ul>
    <li>
      <a href="#" @click.prevent="linea = true">
        linea
        {{ " " }}
      </a>
    </li>
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
