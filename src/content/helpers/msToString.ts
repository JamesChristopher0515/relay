export default function msToString(millis: number) {
  if (millis <= 0) {
    return '0:00'
  }
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const hours = Math.floor(millis / hour)
  const minutes = String(Math.floor((millis % hour) / minute))
  const seconds = String(Math.floor((millis % minute) / second))
  return (
    (hours > 0 ? `${hours}:` : ``) +
    `${minutes.padStart(hours > 0 ? 2 : 1, '0')}:${seconds.padStart(2, '0')}`
  )
}
