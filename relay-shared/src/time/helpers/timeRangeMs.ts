export interface TimeRange {
  start: Date
  end: Date
}
export default function timeRangeMs(timeRange: TimeRange) {
  const { start, end } = timeRange
  return end.getTime() - start.getTime()
}
