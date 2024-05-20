import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4odd7FZL7cUANn1ssXNi_FwDCDb0-3pQ",
    authDomain: "reelverse-fb96e.firebaseapp.com",
    projectId: "reelverse-fb96e",
    storageBucket: "reelverse-fb96e.appspot.com",
    messagingSenderId: "528869286060",
    appId: "1:528869286060:web:2d0c305e65fb180ecb3f09",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, `users/${user.uid}`);

    try {
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            const { email, uid } = user;

            await setDoc(userRef, { email, uid });
        }
    } catch (error) {
        console.error('Error in creating user document:', error);
    }
}

export const getUserFavoriteMoviesCollectionRef = () => {
    const user = auth.currentUser;
    const userId = user.uid;
    const userRef = doc(db, "users", userId);
    return collection(userRef, "favoriteMovies");

};

export const queryFavoriteMoviesById = async (favoriteMoviesCollectionRef, movieId) => {
    const q = query(favoriteMoviesCollectionRef, where("movieId", "==", movieId));
    return await getDocs(q);
};

export default app;
