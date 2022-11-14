import { DocumentData } from "firebase/firestore"
import {useState} from "react"
import {Movie} from '../typings'
import {useEffect} from 'react'
import {db} from '../firebase'
import {collection, onSnapshot} from 'firebase/firestore'

function useList(uid: string | undefined) {

    const  [list, setList] = useState<Movie[] | DocumentData>([])

    useEffect(() => {
        if(!uid) return

        return onSnapshot(
            collection(db, 'customers', uid, 'myList'),
            (snapshot) => {
              setList(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
              )
            }
          )
        }, [db, uid])

       
  return list

  
}

export default useList