import { useState, useEffect } from 'react'
import type { User } from '@src/types/user'
import {
  getFirestore,
  doc,
  getDoc,
  where,
  query,
  collection,
  getDocs,
} from '@firebase/firestore'

export const useUserById = (id?: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    const fetchUser = async () => {
      try {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', id)
        const userDoc = await getDoc(userDocRef)
        if (!userDoc.exists) {
          setUser(null)
        } else {
          const user = {
            id: userDoc.id,
            ...userDoc.data(),
          } as User
          setUser(user)
        }
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  return { user, loading, error }
}

export const useUserByEmail = (email?: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!email) {
      setLoading(false)
      return
    }
    const fetchUser = async () => {
      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(
          query(collection(db, 'users'), where('email', '==', email))
        )
        if (querySnapshot.docs.length === 0 || !querySnapshot.docs[0]?.exists) {
          setUser(null)
          setLoading(false)
        } else {
          const user = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          } as User
          setUser(user)
        }
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [email])

  return { user, loading, error }
}
