import { MarkdownContainer } from '@src/components/MarkdownContainer'
import { useEffect, useState } from 'react'
import CustomPage from '@src/components/CustomPage'

const SetUpAndHelp = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch('/doc/set-up-and-help.md')
      const text = await res.text()
      setMarkdown(text)
    }
    fetchMarkdown()
  }, [])
  return (
    <CustomPage title="セットアップとヘルプ" isTitleHidden={true}>
      <MarkdownContainer markdown={markdown} />
    </CustomPage>
  )
}

export default SetUpAndHelp
