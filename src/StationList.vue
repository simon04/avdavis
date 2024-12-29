<script setup lang="ts">
import { computed } from "vue";
import StationEntry from "./StationEntry.vue";

const props = defineProps<{
  features: Geo.Feature[];
}>();

const sortedFeatures = computed(() =>
  [...props.features].sort(
    (a, b) =>
      a.properties["LWD-Region"].localeCompare(b.properties["LWD-Region"]) ||
      b.geometry.coordinates[1] - a.geometry.coordinates[1],
  ),
);
</script>

<style>
ul {
  padding: 0;
}
</style>

<template>
  <ul>
    <StationEntry
      v-for="feature in sortedFeatures"
      :key="feature.id"
      :feature="feature"
    />
  </ul>
</template>
