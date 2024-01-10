import type { Questionnaire } from '@src/types/questionnaire'
import type { Timestamp } from 'firebase/firestore'

const validateTitle = (title: string) => {
  if (title === '') {
    return 'タイトルを入力してください'
  }
  return ''
}

const validateExpiry = (expiry: Timestamp | null) => {
  if (expiry === null) {
    return '有効期限を入力してください'
  }
  return ''
}

const validateUrl = (url: string, type: '回答用' | '編集用') => {
  if (url === '') {
    return `URL(${type})を入力してください`
  }

  const regex =
    type === '回答用'
      ? /^https:\/\/docs.google.com\/forms\/d\/e\/.+\/viewform$/
      : /^https:\/\/docs.google.com\/forms\/d\/.+\/edit$/

  if (!url.match(regex) && !!url.split('/')[6]) {
    return `URL(${type})が正しくありません`
  }

  return ''
}

export const validateQuestionnaire = (
  questionnaire: Pick<
    Questionnaire,
    'title' | 'url' | 'editUrl' | 'expiry' | 'active'
  >
) => {
  return (
    validateTitle(questionnaire.title) ||
    validateExpiry(questionnaire.expiry) ||
    validateUrl(questionnaire.url, '回答用') ||
    validateUrl(questionnaire.editUrl, '編集用')
  )
}
