import { useState, createContext } from "react";

export const authContext = createContext();



const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    



    return <authContext.Provider value={{
        isAuthenticated,
        token,
        user,
        setIsAuthenticated,
        setToken,
        setUser,
    }}>
        {children}
    </authContext.Provider>
    
}

export default AuthContextProvider