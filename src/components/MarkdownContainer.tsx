import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from '@src/styles/doc.module.css'

type Props = {
  markdown: string
}

export const MarkdownContainer = ({ markdown }: Props) => {
  return (
    <div className={`${styles['markdownContainer']} m-6`}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
