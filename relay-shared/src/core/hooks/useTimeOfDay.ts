export default function useTimeOfDay() {
  const time = new Date()
  const hours = time.getHours()
  const timeOfDay =
    hours < 12 ? 'morning' : hours < 18 ? 'afternoon' : 'evening'
  return timeOfDay
}
