import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from '@firebase/firestore'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@src/constant/env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
}

export const initializeFirebaseApp = () => {
  return !getApps().length ? initializeApp(firebaseConfig) : getApp()
}

export const signInWithGoogle = async () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  try {
    const userCredential = await signInWithPopup(auth, provider)
    if (userCredential?.user) {
      await saveUserToFirestore(userCredential.user)
    }
    return userCredential
  } catch (e) {
    console.error(e)
    return null
  }
}

export const saveUserToFirestore = async (user: User) => {
  const db = getFirestore()
  const userDoc = doc(db, 'users', user.uid)
  await setDoc(userDoc, {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdTime: new Date(),
    updatedTime: new Date(),
  })
}
