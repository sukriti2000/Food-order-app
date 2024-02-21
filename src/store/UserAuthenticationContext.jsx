import { createContext, useState } from "react";

export const UserAuthenticationContext = createContext({
  authenticationStage: '',
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {}
});

export function UserAuthenticationContextProvider({ children }) {
  const [userAuthenticationStage, setUserAuthenticationStage] = useState('login');

  function loginUser() {
    setUserAuthenticationStage('login');
  }

  function registerUser() {
    setUserAuthenticationStage('register');
  }

  function logoutUser() {
    setUserAuthenticationStage('logout');
  }

  const userAuthenticationCtx = {
    authenticationStage: userAuthenticationStage,
    loginUser,
    registerUser,
    logoutUser
  };

  return (
    <UserAuthenticationContext.Provider value={userAuthenticationCtx}>
      {children}
    </UserAuthenticationContext.Provider>
  );
}
