export const requestForGAS = (formId: string) => {
  const gasWebAppUrl =
    'https://script.google.com/macros/s/AKfycbzdlwrxbTb_mfCPvXqIcP5SivAvtEpeRNPGxjeiy9DZwEwJfGFv30RDZhjf-faIm67n/exec'
  const fullUrl = `${gasWebAppUrl}?formId=${formId}`

  // 新タブで遷移する
  window.open(fullUrl, '_blank')
}
