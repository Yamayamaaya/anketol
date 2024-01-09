import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const LandingPage = () => {
  const router = useRouter()

  const goToSignUp = () => {
    router.push('/signup')
  }

  return (
    <div className="bg-[#ff9a00] w-full h-full flex flex-col items-center justify-start ">
      <Image
        src="/lp_fv.png"
        alt="LPの画像"
        layout="responsive"
        width={1200} // 画像の元の幅
        height={800} // 画像の元の高さ
      />
      <div className="w-4/5 mx-[10vw] h-full flex flex-col items-center justify-start">
        <div className="w-full flex items-center justify-between flex-col md:flex-row gap-8">
          <div className="flex items-center justify-center bg-white rounded-3xl p-2 max-w-[405px] ">
            <div className="text-4xl font-bold p-2 pr-4 text-black">01</div>
            <div>
              <p className="text-lg font-bold text-black md:text-2xl">
                完全無料
              </p>
              <p className="text-sm pr-4">
                登録から利用まで、一切料金はかかりません
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white rounded-3xl p-2 max-w-[405px]">
            <div className="text-4xl font-bold p-2 pr-4 text-black">02</div>
            <div>
              <p className="text-lg font-bold text-black md:text-2xl">
                簡単登録
              </p>
              <p className="text-sm pr-4">
                Googleアカウント連携で簡単に登録できます
              </p>
            </div>
          </div>
        </div>
        <button
          className="max-w-[405px] h-12 bg-[#FFA200] rounded-3xl text-2xl font-bold shadow-md  hover:shadow-xl border-2 border-white text-white px-12 py-6 flex items-center justify-center  transition ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-[#FFAA00] duration-300 my-6"
          onClick={goToSignUp}
        >
          今すぐ始める ＞
        </button>
        <div className="w-full rounded-3xl h-full flex items-center bg-white flex-col pt-3 pb-6">
          <p className="text-2xl font-bold my-3 text-black md:text-4xl">
            - 使い方 -
          </p>
          <div className="w-full flex flex-col items-start justify-between px-[5%] gap-4 md:gap-8">
            <div className="flex items-start justify-center bg-white rounded-3xl p-2  flex-col md:flex-row  md:items-center">
              <div className="text-2xl font-bold md:py-2 pr-4 text-black md:text-4xl">
                <span className="text-xl font-semibold pr-1 text-black md:text-3xl">
                  STEP
                </span>
                1
              </div>
              <div>
                <p className="text-xl font-bold text-black md:text-2xl">
                  ユーザー登録
                </p>
                <p className="text-sm">
                  お持ちGoogleアカウントを連携して、アンケトルにサインアップします。
                </p>
              </div>
            </div>
            <div className="flex items-start justify-center bg-white rounded-3xl p-2  flex-col md:flex-row  md:items-center">
              <div className="text-2xl font-bold md:py-2 pr-4 text-black md:text-4xl">
                <span className="text-xl font-semibold pr-1 text-black md:text-3xl">
                  STEP
                </span>
                2
              </div>
              <div>
                <p className="text-xl font-bold text-black md:text-2xl">
                  アンケート投稿
                </p>
                <p className="text-sm">
                  googleフォームの回答用URLを投稿します。
                </p>
              </div>
            </div>
            <div className="flex items-start justify-center bg-white rounded-3xl p-2  flex-col md:flex-row  md:items-center">
              <div className="text-2xl font-bold md:py-2 pr-4 text-black md:text-4xl">
                <span className="text-xl font-semibold pr-1 text-black md:text-3xl">
                  STEP
                </span>
                3
              </div>
              <div>
                <p className="text-xl font-bold text-black md:text-2xl">
                  アンケートに回答する
                </p>
                <p className="text-sm">
                  他ユーザーが投稿したアンケートに回答します。
                </p>
              </div>
            </div>
            <div className="flex items-start justify-center bg-white rounded-3xl p-2  flex-col md:flex-row  md:items-center">
              <div className="text-2xl font-bold md:py-2 pr-4 text-black md:text-4xl">
                <span className="text-xl font-semibold pr-1 text-black md:text-3xl">
                  STEP
                </span>
                4
              </div>
              <div>
                <p className="text-xl font-bold text-black md:text-2xl">
                  アンケートに回答してもらう
                </p>
                <p className="text-sm">
                  他ユーザーのアンケートに回答した数に応じて、ほかユーザーからの回答を得られます。
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="max-w-[405px] h-12 bg-[#FFA200] rounded-3xl text-2xl font-bold shadow-md  hover:shadow-xl border-2 border-white text-white px-12 py-6 flex items-center justify-center  transition ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-[#FFAA00] duration-300 my-6"
          onClick={goToSignUp}
        >
          今すぐ始める ＞
        </button>
      </div>
    </div>
  )
}

export default LandingPage
