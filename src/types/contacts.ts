import type { Timestamp } from 'firebase/firestore'

export type Contact = {
  id: string
  name: string
  title: string
  email: string
  message: string
  createdTime: Timestamp
  updatedTime: Timestamp
}
