import React from 'react'

const AuthContext = React.createContext({
    loggedInUser: { isLoggedIn: false, userData: {} }
});

export default AuthContext