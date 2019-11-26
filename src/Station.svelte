<script>
  import StationPlotLinks from "./StationPlotLinks.svelte";
  import { format } from "./number.js";

  export let feature;
  $: altitude = feature.geometry.coordinates[2];
  $: properties = feature.properties;
  $: region = properties["LWD-Region"];
  $: name = properties.name;
  const compass = ["NN", "NE", "EE", "SE", "SS", "SW", "WW", "NW", "NN"];
  $: windDirection =
    typeof properties.WR !== "number"
      ? "--"
      : compass[Math.round(((properties.WR + 360 - 22.5) % 360) / 45)];
</script>

<style>
  li {
    list-style: none;
    margin-top: 1ex;
  }
</style>

<li>
  <div>
    <abbr title={region}>{region.split(/ /)[0]}</abbr>
    <strong title={properties.date}>{name}</strong>
    {format(altitude, { unit: 'm' })}
    <StationPlotLinks {feature} />
  </div>

  {#if properties.HS != undefined}
    <div>
      Snow height:
      <span>{format(properties.HS, { unit: 'cm' })}</span>
      /
      <span>Δ24h{format(properties.HSD24)}</span>
      /
      <span>Δ48h{format(properties.HSD48)}</span>
      /
      <span>Δ72h{format(properties.HSD72)}</span>
    </div>
  {/if}

  {#if properties.LT != undefined}
    <div>
      Air temperature:
      <span>{format(properties.LT, { digits: 1, unit: '°C' })}</span>
      /
      <span>min{format(properties.LT_MIN, { digits: 1 })}</span>
      /
      <span>max{format(properties.LT_MAX, { digits: 1 })}</span>
    </div>
  {/if}

  {#if properties.WG != undefined}
    <div>
      Wind:
      <span>{format(properties.WG, { unit: 'km/h' })}</span>
      <span>{windDirection}</span>
      /
      <span>max{format(properties.WG_BOE)}</span>
    </div>
  {/if}
</li>
