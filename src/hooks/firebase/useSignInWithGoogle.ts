import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useCallback } from 'react'
import { useSaveDataToFirestore } from './useSaveDataToFirestore'

export const useSignInWithGoogle = () => {
  const saveDataToFirestore = useSaveDataToFirestore()
  const signInWithGoogle = useCallback(async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    if (userCredential?.user) {
      const { uid, email, displayName, photoURL } = userCredential.user
      const userData = { uid, email, displayName, photoURL }
      await saveDataToFirestore('users', userData, userCredential.user.uid)
    }
    return userCredential
  }, [saveDataToFirestore])

  return signInWithGoogle
}
