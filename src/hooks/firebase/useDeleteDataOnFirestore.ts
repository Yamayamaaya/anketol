import { useCallback } from 'react'
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'

/**
 * Firestoreから特定のドキュメントを削除するカスタムフック
 * @param collectionPath コレクションのパス
 * @returns 削除関数
 */
export const useDeleteDataOnFirestore = () => {
  const deleteData = useCallback(
    async (collectionPath: string, docId: string) => {
      const db = getFirestore()
      const docRef = doc(db, collectionPath, docId)
      try {
        await deleteDoc(docRef)
        console.log('Document successfully deleted!')
      } catch (error) {
        console.error('Error removing document: ', error)
      }
    },
    []
  )

  return deleteData
}
