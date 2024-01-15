import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from '@src/styles/doc.module.css'

type Props = {
  markdown: string
}

export const MarkdownContainer = ({ markdown }: Props) => {
  return (
    <div className={`${styles['markdownContainer']} m-8 md:m-12`}>
      <ReactMarkdown
        components={{
          ul: ({ node, ...props }) => (
            <ul style={{ listStyleType: 'disc' }} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol style={{ listStyleType: 'decimal' }} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={{ listStyle: 'inherit' }} {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
