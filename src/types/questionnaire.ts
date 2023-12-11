// src/types/questionnaire.t
import type { Timestamp } from 'firebase/firestore'

export type Questionnaire = {
  title: string
  url: string
  expiry: Timestamp
  userId: string
  createdTime: Timestamp
  updatedTime: Timestamp
  answeredCount?: number
}