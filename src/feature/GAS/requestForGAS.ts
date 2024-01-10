export const requestForGAS = (formId: string) => {
  const gasWebAppUrl =
    'https://script.google.com/macros/s/AKfycbxnQj4z355gNd77-sqru4fNVa8D0GgEGQubMDX40NU9/dev'
  const fullUrl = `${gasWebAppUrl}?formId=${formId}`

  // 新タブで遷移する
  const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
