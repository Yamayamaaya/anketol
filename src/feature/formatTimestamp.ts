import type { Timestamp } from 'firebase/firestore'

export const formatTimestamp = (timestamp: Timestamp) => {
  const now = new Date()
  const date = timestamp.toDate()
  const diff = now.getTime() - date.getTime()

  if (diff < 3600000) {
    // 1時間以内の場合
    const minutes = Math.floor(diff / 60000) // ミリ秒を分に変換
    return `${minutes}分前`
  }

  if (diff < 86400000) {
    // 1日以内の場合
    const hours = Math.floor(diff / 3600000) // ミリ秒を時間に変換
    return `${hours}時間前`
  }

  if (diff < 604800000) {
    // 1週間以内の場合
    const days = Math.floor(diff / 86400000) // ミリ秒を日にちに変換
    return `${days}日前`
  }

  // それ以降は、月日を返す
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}
