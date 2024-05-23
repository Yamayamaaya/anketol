import type { Timestamp } from 'firebase/firestore'

export const omitTimestamp = (timestamp: Timestamp) => {
  // 月、日、時、分のみを返す
  const date = timestamp.toDate()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = `0${date.getMinutes()}`.slice(-2)
  return `${month}/${day}  ${hours}:${minutes}`
}
