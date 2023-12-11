import { useState, useEffect } from 'react'
import type { User } from '@src/types/user'
import { getFirestore, doc, getDoc } from '@firebase/firestore'

export const useUserById = (id: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', id)
        const userDoc = await getDoc(userDocRef)
        if (!userDoc.exists) {
          setUser(null)
        } else {
          const user = userDoc.data() as User
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
