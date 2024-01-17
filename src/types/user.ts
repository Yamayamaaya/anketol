import type { Timestamp } from 'firebase/firestore'

export type User = {
  id: string
  email: string
  displayName: string
  photoURL: string
  createdTime: Timestamp
  updatedTime: Timestamp
  answerCount?: number
  lastNotificationCheckTime?: Timestamp
}
