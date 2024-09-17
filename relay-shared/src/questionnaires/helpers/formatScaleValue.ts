export default function formatScaleValue(value: number) {
  if (String(value) === String(parseInt(String(value)))) {
    return value
  }
  const fixed = value.toFixed(2)
  if (fixed.endsWith('00')) {
    return Math.round(value)
  } else {
    return fixed
  }
}
