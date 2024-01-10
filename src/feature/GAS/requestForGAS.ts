export const requestForGAS = (formId: string) => {
  const gasWebAppUrl =
    'https://script.google.com/macros/s/AKfycbxN-TdLYrxTwukvI-X3mdijYdGF7bfWHWnAr9vjdrttjiLeUngvJWibyW_6xsSNc4R0MQ/exec'
  const fullUrl = `${gasWebAppUrl}?formId=${formId}`

  // 遷移する
  window.location.href = fullUrl
}
