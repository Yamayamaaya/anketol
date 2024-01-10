// 投稿成功＆トップページへのリンクのページ

import React from 'react'
import { useRouter } from 'next/router'

export const Page = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mt-8">投稿しました</h1>
      <button
        onClick={() => router.push('/')}
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        トップページへ
      </button>
    </div>
  )
}

export default Page
