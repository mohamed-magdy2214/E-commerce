const { useState, createContext } = require("react");

export let UserContext = createContext();

export default function UserContextProvider(props) {

    const [userToken, setUserToken] = useState(null)

    return <UserContext.Provider value={{userToken , setUserToken}}>
        {props.children}
    </UserContext.Provider>
}