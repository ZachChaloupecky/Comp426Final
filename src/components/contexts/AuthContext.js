import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../../fire'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    const value ={
        currentUser,
        signup,
        login,
        logout
    }
    function logout() {
        return auth.signOut()
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false);
            // ADD ACCOUNT INFO TO DB
        })
        return unsubscribe;
    },[])

    

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}