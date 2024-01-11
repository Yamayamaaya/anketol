import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { useCallback } from 'react'
import { useSaveDataToFirestore } from './useSaveDataToFirestore'

export const useSignInWithGoogle = () => {
  const saveDataToFirestore = useSaveDataToFirestore()
  const signInWithGoogle = useCallback(async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
      const userCredential = await signInWithPopup(auth, provider)
      if (userCredential?.user) {
        await saveDataToFirestore(
          'users',
          userCredential.user,
          'Failed to save user',
          'User saved successfully',
          userCredential.user.uid
        )
      }
      return userCredential
    } catch (e) {
      console.error(e)
      return null
    }
  }, [saveDataToFirestore])

  return signInWithGoogle
}
