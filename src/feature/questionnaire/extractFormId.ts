export const extractFormId = (editUrl: string) => {
  const formId = editUrl.split('/')[5]
  if (formId) {
    return formId
  } else {
    return null
  }
}
