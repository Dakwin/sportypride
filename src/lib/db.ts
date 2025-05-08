import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchDocuments = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
