// src/types/questionnaire.t
import type { Timestamp } from 'firebase/firestore'

export type Questionnaire = {
  id: string
  title: string
  url: string
  editUrl: string
  expiry: Timestamp | null
  userId: string
  createdTime: Timestamp
  updatedTime: Timestamp
  isAuthenticated: boolean
  active: boolean
  answeredCount?: number
}
