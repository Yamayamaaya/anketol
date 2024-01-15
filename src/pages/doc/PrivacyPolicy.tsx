import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import CustomPage from '@src/components/CustomPage'

const PrivacyPolicy = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/privacy-policy.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <CustomPage title="プライバシーポリシー">
      <MarkdownContainer markdown={markdown} />
    </CustomPage>
  )
}

export default PrivacyPolicy
