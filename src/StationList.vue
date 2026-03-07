<script setup lang="ts">
import StationEntry from "./StationEntry.vue";
import { useSorted } from "@vueuse/core";

const props = defineProps<{
  features: Geo.Feature[];
}>();

const sortedFeatures = useSorted(
  props.features,
  (a, b) =>
    a.properties["LWD-Region"].localeCompare(b.properties["LWD-Region"]) ||
    b.geometry.coordinates[1]! - a.geometry.coordinates[1]!,
);
</script>

<style>
ul {
  padding: 0;
}
</style>

<template>
  <ul>
    <StationEntry v-for="feature in sortedFeatures" :key="feature.id" :feature="feature" />
  </ul>
</template>
