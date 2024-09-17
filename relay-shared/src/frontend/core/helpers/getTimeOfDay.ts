export default function getTimeOfDay() {
  const hours = new Date().getHours()
  if (hours < 12) {
    return 'morning'
  } else if (hours < 17) {
    return 'afternoon'
  } else {
    return 'evening'
  }
}
