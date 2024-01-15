import { Button, useToast } from '@chakra-ui/react'
import { useSignInWithGoogle } from '@src/hooks/firebase/useSignInWithGoogle'
import Image from 'next/image'
import { Navigate } from '@src/components/Navigate'
import { useRouter } from '@src/hooks/hooks/useRouter'

export const Page = () => {
  const toast = useToast()
  const { push } = useRouter()
  const signInWithGoogle = useSignInWithGoogle()

  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithGoogle()
      if (userCredential?.user) {
        toast({
          title: 'サインアップしました。',
          status: 'success',
          position: 'top',
        })
        push((path) => path.$url())
      }
    } catch (e) {
      console.error('Firebase Authentication Error', e)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
    }
  }

  return (
    <div className="w-[100%] flex  flex-col md:flex-row items-center h-[calc(100vh-110px)] overflow-y-hidden">
      <div
        className="w-[100%] bg-cover absolute  h-[calc(100vh-110px)] overflow-y-hidden md:hidden block z-[-1]"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div>
      <div
        className="w-full md:w-2/5 h-2/5 md:h-full flex items-center justify-center bg-cover bg-center z-[-2]"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div>
      <div className="md:w-3/5 md:h-full rounded-lg shadow-xl flex h-1/3 w-4/5 flex-col items-center  justify-center bg-white">
        <h3 className="md:text-xl text-sm mb-3 ">アンケートを、もっと手軽に</h3>
        <Image
          src="/logo.svg"
          width="380"
          height="50"
          alt="アンケトル"
          className="mb-20 md:block hidden"
        />
        <Image
          src="/logo.svg"
          width="200"
          height="50"
          alt="アンケトル"
          className="md:mb-20 mb-8 md:hidden block"
        />
        <Button
          onClick={handleGoogleSignUp}
          className="flex items-center gap-2"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="20"
            height="20"
            className="md:block hidden"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="15"
            height="15"
            className="md:hidden block"
          />
          <p className="text-sm md:text-base">Googleでサインアップ</p>
        </Button>
        <Navigate href={(path) => path.signin.$url()}>
          <a className="mt-4 md:text-sm text-xs text-gray-500 underline">
            アカウントをお持ちの方はこちらから
          </a>
        </Navigate>
      </div>
      {/* <div
        className="md:hidden block w-full md:w-2/5 h-2/3 md:h-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div> */}
    </div>
  )
}

export default Page
