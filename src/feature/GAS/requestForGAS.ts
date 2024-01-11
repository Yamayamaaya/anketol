export const requestForGAS = (formId: string) => {
  const gasWebAppUrl =
    'https://script.google.com/macros/s/AKfycbz6DIx2srv-7CZGDV-chEyX0mIQ0Bjftpyxwl15yYDnGw04Y6fHgrGKvqd6lJyKlq6kjQ/exec'
  const fullUrl = `${gasWebAppUrl}?formId=${formId}`

  // 新タブで遷移する
  window.open(fullUrl, '_blank')
}
