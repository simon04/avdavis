export async function fetchData() {
  // original https://lawine.tirol.gv.at/data/produkte/ogd.geojson
  const url = 'https://avdavis.legner.me/data/ogd.geojson';
  const res = await fetch(url, {mode: 'cors'});

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    const text = await res.text();
    throw new Error(text);
  }
}
