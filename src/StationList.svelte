<script lang="ts">
  import Station from "./Station.svelte";
  export let features: Geo.Feature[];
  $: sortedFeatures = [...features].sort(
    (a, b) =>
      a.properties["LWD-Region"].localeCompare(b.properties["LWD-Region"]) ||
      b.geometry.coordinates[1] - a.geometry.coordinates[1]
  );
</script>

<style>
  ul {
    padding: 0;
  }
</style>

<ul>
  {#each sortedFeatures as feature (feature.id)}
    <Station {feature} />
  {/each}
</ul>
