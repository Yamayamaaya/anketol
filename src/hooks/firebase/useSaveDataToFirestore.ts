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
    async (
      collectionName: string,
      data: any,
      id?: string,
      subCollectionName?: string,
      subCollectionData?: any[]
    ): Promise<string> => {
      // 返り値の型をPromise<string>に変更
      const db = getFirestore()
      let docRef
      // 現在のタイムスタンプを取得
      const timestamp = new Date()
      const timestampData = {
        createdTime: timestamp,
        updatedTime: timestamp,
      }
      if (id) {
        docRef = doc(db, collectionName, id)
        // updatedTimeのみ更新
        await setDoc(
          docRef,
          { ...data, updatedTime: timestamp },
          { merge: true }
        )
      } else {
        docRef = await addDoc(collection(db, collectionName), {
          ...timestampData,
          ...data,
        })
      }

      if (subCollectionName && subCollectionData) {
        const subCollectionRef = collection(docRef, subCollectionName)
        for (const item of subCollectionData) {
          // サブコレクションの各ドキュメントにもタイムスタンプを設定
          await addDoc(subCollectionRef, { ...timestampData, ...item })
        }
      }

      return docRef.id // 保存したドキュメントのidを返す
    },
    []
  )

  return saveDataToFirestore
}
