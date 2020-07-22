<script lang="ts">
  export let feature: Geo.Feature;
  let innerWidth: number;
  let latitude: number;
  $: latitude = feature.geometry.coordinates[1];
  let longitude: number;
  $: longitude = feature.geometry.coordinates[0];
  let geo: string;
  $: geo = `geo:${latitude},${longitude}`;
  let osm: string;
  $: osm = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
  let plots: { interval: string; url: string }[];
  $: plots = "1d/tag 3d/dreitage 1w/woche 1m/monat 6m/winter"
    .split(" ")
    .map(i => {
      const [interval, fragment] = i.split("/");
      const width = innerWidth < 800 ? 540 : innerWidth < 1100 ? 800 : 1100;
      const url = `https://wiski.tirol.gv.at/lawine/grafiken/${width}/standard/${fragment}/${feature.properties.plot}.png`;
      return { interval, url };
    });
</script>

<style>
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

<svelte:window bind:innerWidth />
<ul>
  {#each plots as plot (plot.interval)}
    <li>
      <a href={plot.url}>{plot.interval}</a>
      {" "}
    </li>
  {/each}
  <li>
    <a href={geo}>geo:</a>
    {" "}
  </li>
  <li>
    <a href={osm} title="Show on OpenStreetMap">osm</a>
  </li>
</ul>
