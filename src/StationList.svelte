<script lang="ts">
  import Station from "./Station.svelte";
  export let features: Geo.Feature[];
  $: sortedFeaturs = [...features].sort(
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
  {#each sortedFeaturs as feature (feature.id)}
    <Station {feature} />
  {/each}
</ul>
