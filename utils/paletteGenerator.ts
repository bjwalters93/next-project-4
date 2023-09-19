export default function paletteGenerator() {
  let colors = [];
  for (let i = 0; i < 360; i = i + 30) {
    colors.push(`hsl(${i}, 100%, 48%`);
  }
  return colors;
}
