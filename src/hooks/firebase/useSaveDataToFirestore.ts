import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useSaveDataToFirestore = () => {
  const toast = useToast()
  const saveDataToFirestore = useCallback(
    async (
      collectionName: string,
      data: any,
      errorMessage: string,
      successMessage: string,
      id?: string
    ) => {
      const db = getFirestore()
      try {
        if (id) {
          const docRef = doc(db, collectionName, id)
          await setDoc(docRef, data)
        } else {
          await addDoc(collection(db, collectionName), data)
        }
        toast({
          title: successMessage,
          status: 'success',
          position: 'top',
        })
      } catch (error) {
        console.error(error) // Log the error
        toast({
          title: errorMessage,
          status: 'error',
          position: 'top',
        })
      }
    },
    [toast]
  )

  return saveDataToFirestore
}
