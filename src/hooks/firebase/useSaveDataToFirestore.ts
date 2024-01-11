import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { useCallback } from 'react'

export const useSaveDataToFirestore = () => {
  const saveDataToFirestore = useCallback(
    async (collectionName: string, data: any, id?: string) => {
      const db = getFirestore()
      if (id) {
        const docRef = doc(db, collectionName, id)
        await setDoc(docRef, data)
      } else {
        await addDoc(collection(db, collectionName), data)
      }
    },
    []
  )

  return saveDataToFirestore
}
