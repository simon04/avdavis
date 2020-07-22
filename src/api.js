export async function fetchData() {
  const url = 'https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson';
  const res = await fetch(url, {mode: 'cors'});

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    const text = await res.text();
    throw new Error(text);
  }
}
