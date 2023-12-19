import type { Timestamp } from 'firebase/firestore'

export type AnswerLog = {
  id: string
  formId: string
  respondentGmail: string
  createdTime: Timestamp
  updatedTime: Timestamp
}
