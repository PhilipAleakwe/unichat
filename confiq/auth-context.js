
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(undefined);
    const auth = getAuth();

    onAuthStateChanged(auth,(user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(undefined)
        }
    });

    return (
        <AuthContext.Provider value={ currentUser }>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

