<script setup lang="ts">
import { ref } from "vue";
import StationEntry from "./StationEntry.vue";
import { useSorted } from "@vueuse/core";

const props = defineProps<{
  features: Geo.Feature[];
}>();

const sort = {
  "LWD-Region": (a: Geo.Feature, b: Geo.Feature) =>
    a.properties["LWD-Region"].localeCompare(b.properties["LWD-Region"]),
  "Snow height": (a: Geo.Feature, b: Geo.Feature) =>
    (b.properties.HS ?? 0) - (a.properties.HS ?? 0),
  Δ24h: (a: Geo.Feature, b: Geo.Feature) => (b.properties.HSD24 ?? 0) - (a.properties.HSD24 ?? 0),
  Δ48h: (a: Geo.Feature, b: Geo.Feature) => (b.properties.HSD48 ?? 0) - (a.properties.HSD48 ?? 0),
  Δ72h: (a: Geo.Feature, b: Geo.Feature) => (b.properties.HSD72 ?? 0) - (a.properties.HSD72 ?? 0),
  "Air temperature": (a: Geo.Feature, b: Geo.Feature) =>
    (b.properties.LT ?? 0) - (a.properties.LT ?? 0),
  Wind: (a: Geo.Feature, b: Geo.Feature) => (b.properties.WG ?? 0) - (a.properties.WG ?? 0),
};

const sortKey = ref<keyof typeof sort>("LWD-Region");

const sortedFeatures = useSorted(
  props.features,
  (a, b) => sort[sortKey.value](a, b) || b.geometry.coordinates[1]! - a.geometry.coordinates[1]!,
);
</script>

<style>
a.sort:nth-of-type(n + 2)::before {
  content: " | ";
}
ul {
  padding: 0;
}
</style>

<template>
  Sort by:
  <a v-for="(_, key) in sort" :key="key" @click.prevent="sortKey = key" href="#" class="sort">
    {{ key }}
  </a>
  <ul>
    <StationEntry v-for="feature in sortedFeatures" :key="feature.id" :feature="feature" />
  </ul>
</template>
