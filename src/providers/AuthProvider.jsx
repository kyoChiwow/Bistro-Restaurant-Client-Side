import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // Observer settings here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current User", currentUser);
      if(currentUser) {
        // Get token and store client-side
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
        .then((res) => {
          if(res.data.token) {
            localStorage.setItem('access-token', res.data.token)
          }
        })
      }
      else {
        // remove token (if token is stored in the client-side)
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  // Observer settings here

  // SignUp user settings here
  const signUpEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // SignUp user settings here

  // Google Sign in settings here
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }
  // Google Sign in settings here

  //   Login user settings here
  const signInEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Login user settings here

  //   Update user settings here
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
  //   Update user settings here

  //   Logout user settings here
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //   Logout user settings here

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signUpEmail,
    signInEmail,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
