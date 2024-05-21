import React, { createContext, useContext, useState } from 'react';


  const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setuserData] = useState({});

  return (
    <UserContext.Provider value={{ userData , setuserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);



