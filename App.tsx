import React from 'react';
import { UserProvider } from './context/Usecontext';
import StackNavigation from './StackNavigation';


const App= () =>{
  return (
    <UserProvider>
   <StackNavigation />
    </UserProvider>
  );
}

export default App;