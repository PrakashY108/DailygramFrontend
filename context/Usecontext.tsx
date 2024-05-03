import React, { createContext, useContext, useState } from 'react';
// Define the shape of the context value
interface UserContextType {
    userid: number | null;
    email: string | null;
    setUserid: (id: number | null) => void;
    setEmail: (email: string | null) => void;
  }
  
  // Create the context with a default value
  const initialContext: UserContextType = {
    userid: null,
    email: null,
    setUserid: () => {},
    setEmail: () => {},
  };
  const UserContext = createContext<UserContextType>(initialContext);

export const UserProvider = ({ children }) => {
  const [userid, setUserid] = useState(null);
  const [email, setEmail] = useState(null);
  const[followers,setfollowers]=useState(0);

  return (
    <UserContext.Provider value={{ userid, email, setUserid, setEmail,followers,setfollowers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);



