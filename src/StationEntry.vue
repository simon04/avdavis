<script setup lang="ts">
import { computed } from "vue";
import StationLinks from "./StationLinks.vue";
import { format } from "./number.ts";

const props = defineProps<{
  feature: Geo.Feature;
}>();

const id = computed(() => props.feature.id);
const altitude = computed(() => props.feature.geometry.coordinates[2]);
const properties = computed(() => props.feature.properties);
const outdated = computed(
  () =>
    !properties.value.date ||
    new Date(properties.value.date).getTime() + 3 * 60 * 60 * 1000 < Date.now(),
);
const region = computed(() => properties.value["LWD-Region"]);
const name = computed(() => properties.value.name);
const compass = ["NN", "NE", "EE", "SE", "SS", "SW", "WW", "NW", "NN"];
const windDirection = computed(() =>
  typeof properties.value.WR !== "number"
    ? "--"
    : compass[Math.round(((properties.value.WR + 360 - 22.5) % 360) / 45)],
);
const HSD72or0 = computed(() => properties.value.HSD72 ?? 0);
const hsHistogram = computed(() => ({
  base: "#".repeat(Math.max(0, properties.value.HS - HSD72or0.value) / 4),
  add: "#".repeat(Math.max(0, HSD72or0.value) / 4),
  del: "-".repeat(-Math.min(0, HSD72or0.value) / 4),
}));
</script>

<style scoped>
li {
  list-style: none;
  margin-top: 1ex;
}
li:target {
  background: rgba(25, 171, 255, 0.2);
}
li:hover {
  background: rgba(25, 171, 255, 0.1);
  transition: 0.1s ease background;
}
.outdated {
  text-decoration: line-through;
}
</style>

<template>
  <li :id="id">
    <div>
      <a :href="'#' + id">#</a>
      {{ " " }}
      <abbr :title="region">{{ region.split(/ /)[0] }}</abbr>
      {{ " " }}
      <strong :title="properties.date">{{ name }}</strong>
      {{ " " }}
      {{ format(altitude, { unit: "m" }) }}
      <StationLinks :feature="feature" />
    </div>

    <div v-if="properties.HS !== undefined">
      <div :class="{ outdated }" style="float: right">
        <ins>{{ hsHistogram.add }}</ins
        ><del>{{ hsHistogram.del }}</del
        ><span>{{ hsHistogram.base }}</span>
      </div>
      <div :class="{ outdated }" style="clear: right">
        Snow height:
        <span>{{ format(properties.HS, { unit: "cm" }) }}</span>
        /
        <span>Δ24h{{ format(properties.HSD24) }}</span>
        /
        <span>Δ48h{{ format(properties.HSD48) }}</span>
        /
        <span>Δ72h{{ format(properties.HSD72) }}</span>
      </div>
    </div>

    <div v-if="properties.LT !== undefined" :class="{ outdated }">
      Air temperature:
      <span>{{ format(properties.LT, { digits: 1, unit: "°C" }) }}</span>
      /
      <span>min{{ format(properties.LT_MIN, { digits: 1 }) }}</span>
      /
      <span>max{{ format(properties.LT_MAX, { digits: 1 }) }}</span>
    </div>

    <div v-if="properties.WG !== undefined" :class="{ outdated }">
      Wind:
      <span>{{ format(properties.WG, { unit: "km/h" }) }}</span>
      {{ " " }}
      <span>{{ windDirection }}</span>
      /
      <span>max{{ format(properties.WG_BOE) }}</span>
    </div>
  </li>
</template>
