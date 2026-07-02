import {db} from "../data/data.js"
import { 
    collection,
    getDocs,
    getDoc, 
    addDoc, 
    deleteDoc,
    updateDoc, 
    doc,
    query,
    where } from "firebase/firestore"

const usersCollections = collection(db, "users")

export async function getUser(email) {
    const consulta = query(
        usersCollections,
        where("email", "==", email)
    );

    const querySnapshot = await getDocs(consulta);

    if (querySnapshot.empty) {
        console.log("Usuario no encontrado desde el modelo");
        return null;
    }

    const usuario = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
    };

    return usuario;
}