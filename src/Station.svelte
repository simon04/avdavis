<script type="ts">
  import StationLinks from "./StationLinks.svelte";
  import { format } from "./number.ts";

  export let feature: Geo.Feature;
  let id: string;
  $: id = feature.id;
  let altitude: number;
  $: altitude = feature.geometry.coordinates[2];
  let properties: Geo.Properties;
  $: properties = feature.properties;
  let outdated: boolean;
  $: outdated =
    !properties.date ||
    new Date(properties.date).getTime() + 3 * 60 * 60 * 1000 < Date.now();
  let region: string;
  $: region = properties["LWD-Region"];
  let name: string;
  $: name = properties.name;
  const compass = ["NN", "NE", "EE", "SE", "SS", "SW", "WW", "NW", "NN"];
  let windDirection: string;
  $: windDirection =
    typeof properties.WR !== "number"
      ? "--"
      : compass[Math.round(((properties.WR + 360 - 22.5) % 360) / 45)];
  $: HSD72or0 = properties.HSD72 ?? 0;
  $: hsHistogram = {
    base: '#'.repeat(Math.max(0, properties.HS - HSD72or0) / 4),
    add: '#'.repeat(Math.max(0, HSD72or0) / 4),
    del: '-'.repeat(-Math.min(0, HSD72or0) / 4),
  }
</script>

<style>
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

<li {id}>
  <div>
    <a href={'#' + id}>#</a>
    <abbr title={region}>{region.split(/ /)[0]}</abbr>
    <strong title={properties.date}>{name}</strong>
    {format(altitude, { unit: 'm' })}
    <StationLinks {feature} />
  </div>

  {#if properties.HS != undefined}
    <div class:outdated style="float: right">
      <ins>{hsHistogram.add}</ins><del>{hsHistogram.del}</del><span>{hsHistogram.base}</span>
    </div>
    <div class:outdated style="clear: right">
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
    <div class:outdated>
      Air temperature:
      <span>{format(properties.LT, { digits: 1, unit: '°C' })}</span>
      /
      <span>min{format(properties.LT_MIN, { digits: 1 })}</span>
      /
      <span>max{format(properties.LT_MAX, { digits: 1 })}</span>
    </div>
  {/if}

  {#if properties.WG != undefined}
    <div class:outdated>
      Wind:
      <span>{format(properties.WG, { unit: 'km/h' })}</span>
      <span>{windDirection}</span>
      /
      <span>max{format(properties.WG_BOE)}</span>
    </div>
  {/if}
</li>
