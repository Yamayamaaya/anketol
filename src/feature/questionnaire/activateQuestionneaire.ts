import {
  getFirestore,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore'

// 渡されたIDのアンケートをactive = trueにし、同一ユーザーの他のアンケートをactive = falseにする
export const activateQuestionnaire = async (id: string) => {
  const db = getFirestore()

  // 指定されたIDのアンケートをactive = trueにする
  const questionnaireRef = doc(db, 'questionnaires', id)
  await updateDoc(questionnaireRef, { active: true })

  // 同一ユーザーの他のアンケートをactive = falseにする
  const questionnairesRef = collection(db, 'questionnaires')

  const docSnap = await getDoc(questionnaireRef)

  const userId = docSnap.data()?.['userId']
  const q = query(questionnairesRef, where('userId', '==', userId))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    if (doc.id !== id) {
      updateDoc(doc.ref, { active: false })
    }
  })
}
