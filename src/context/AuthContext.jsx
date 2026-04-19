import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptRegister = async (email, password) => {
    // Look for authorized email
    const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    let isFirstAdmin = false;
    
    if (querySnapshot.empty) {
      // Check if db is completely empty
      const allUsers = await getDocs(collection(db, 'users'));
      if (allUsers.empty) {
         isFirstAdmin = true;
      } else {
         throw new Error("Email not recognized. Please ask an Admin to invite you first.");
      }
    }

    const docId = isFirstAdmin ? null : querySnapshot.docs[0].id;

    // Provision account in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
    const user = userCredential.user;

    // Generate root document if first time Admin
    if (isFirstAdmin) {
       await setDoc(doc(db, 'users', user.uid), {
         uid: user.uid,
         email: email.toLowerCase(),
         role: 'admin',
         quotas: { CL: 0, SL: 0, EL: 0 } // Admins typically approve, not apply, but safety measure
       });
    } else {
       // Bind the new UID to the pre-authorized firestore document
       await updateDoc(doc(db, 'users', docId), {
         uid: user.uid
       });
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email.toLowerCase(), password);
  };

  const performLogout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Hydrate userdata whenever signed in
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setUserData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    login,
    attemptRegister,
    performLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
