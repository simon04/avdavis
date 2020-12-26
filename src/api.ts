export async function fetchData(): Promise<Geo.FeatureCollection> {
  const url = "https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson";
  const res = await fetch(url, { mode: "cors" });

  if (res.ok) {
    const json: Geo.FeatureCollection = await res.json();
    const lastModified = res.headers.get("Last-Modified");
    json.properties = {
      lastModified: new Date(lastModified).toLocaleString(),
    };
    return json;
  } else {
    const text = await res.text();
    throw new Error(text);
  }
}
