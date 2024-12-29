export function format(
  number: Number | undefined,
  { width = 4, digits = 0, unit = "", factor = 1 } = {},
) {
  if (typeof number === "number") {
    number *= factor;
    const sign = Math.sign(number) >= 0 ? "+" : "\u2212";
    const string = Math.abs(number).toFixed(digits);
    const padding = "0".repeat(Math.max(0, width - string.length));
    return sign + padding + string + (unit ? `\u2009${unit}` : "");
  } else {
    return ":" + "-".repeat(width);
  }
}
