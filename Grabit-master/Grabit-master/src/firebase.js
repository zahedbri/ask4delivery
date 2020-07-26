/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyDomGogRhIdJKCMLkOdWSOgODioOHM4KMw',
  authDomain: 'grabit-a3def.firebaseapp.com',
  databaseURL: 'https://grabit-a3def.firebaseio.com',
  projectId: 'grabit-a3def',
  storageBucket: 'grabit-a3def.appspot.com',
  messagingSenderId: '619099806044',
  appId: '1:619099806044:web:b7944e6d09ec85410ac999'
}
// Initialize Firebase
firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.FacebookAuthProvider()
export const signInWithFacebook = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()

export const createUserProfileDocument = async user => {
  if (!user) return

  // get a refrence to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`)

  // Go and fetch the document from that location

  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, photoURL, email } = user
    try {
      await userRef.set({ displayName, photoURL, email })
    } catch (error) {
      console.error(error)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = uid => {
  if (!uid) return null

  try {
    return firestore.collection('users').doc(uid)
  } catch (error) {
    console.error(error.message)
  }
}

export async function uploadFile(location, file) {
  return storage
    .ref()
    .child(`user-profiles/${location}/${file.name}`)
    .put(file)
    .then(response => response.ref.getDownloadURL())
    .catch(error => console.log(error))
}

export default firebase
