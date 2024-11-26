import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase";

export const createTrige = async(nss, data) => {
    try {
        await setDoc(doc(db, "triage", nss), data)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const getTriage = async(nss) => {
  const docRef = doc(db, "triage", nss)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    return null
  }
}

export const updateTriage = async(nss,data) => {
  const docRef = doc(db, "triage", nss)
  await updateDoc(docRef, data)
}

export const getPaciente = async(nss) => {
  const docRef = doc(db, "pacientes", nss)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    return null
  }
}

export const createPaciente = async(nss, data) => {
  try {
    await setDoc(doc(db, "pacientes", nss), data)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updatePaciente = async(nss, data) => {
  const docRef = doc(db, "pacientes", nss)
  await updateDoc(docRef, data)
}

export const deleteTriage = async(nss) => {
  await deleteDoc(doc(db, "triage", nss))
}