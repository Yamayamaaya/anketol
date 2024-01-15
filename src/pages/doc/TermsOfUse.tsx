import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import CustomPage from '@src/components/CustomPage'

const TermsOfUse = () => {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/terms-of-use.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <CustomPage title="利用規約" isTitleHidden={true}>
      <MarkdownContainer markdown={markdown} />
    </CustomPage>
  )
}

export default TermsOfUse
