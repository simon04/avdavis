<script lang="ts">
  import { onMount } from "svelte";
  import AppTitle from "./AppTitle.svelte";
  import Loading from "./Loading.svelte";
  import StationList from "./StationList.svelte";
  import { fetchData } from "./api.js";

  export let promise;

  onMount(() => {
    promise = fetchData();
  });
</script>

<style>
  main {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px white;
    padding: 1em;
    max-width: 1024px;
    margin: 0 auto;
  }
</style>

<main>
  <AppTitle />
  {#await promise}
    <p>
      Loading station data
      <Loading />
    </p>
  {:then data}
    <p>The data is ready: {data ? data.features.length : 0} stations loaded.</p>
    <p>
      Data &copy;
      <a href="https://www.tirol.gv.at/">Land Tirol</a>
      –
      <a
        href="https://www.data.gv.at/katalog/dataset/bb43170b-30fb-48aa-893f-51c60d27056f">
        data.tirol.gv.at
      </a>
      –
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
    </p>
    <p>
      av/da/vis &copy;
      <a href="https://github.com/simon04">Simon Legner</a>
      –
      <a href="https://github.com/simon04/avdavis">simon04/avdavis</a>
      –
      <a href="https://www.gnu.org/licenses/gpl-3.0-standalone.html">GPL 3.0</a>
    </p>
    <hr />
    <StationList features={data ? data.features : []} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
