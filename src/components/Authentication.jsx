import AuthInput from "./UI/AuthInput";
import { useContext } from "react";
import { UserAuthenticationContext } from "../store/userAuthenticationContext";
import Login from "./Login";
import Register from "./Register";

export default function Authentication() {
  const authCtx = useContext(UserAuthenticationContext);

  function handleToLogout() {
    authCtx.logoutUser();
    console.log(authCtx.authenticationStage);
  }

  if (authCtx.authenticationStage === "login") {
    return <a onClick={handleToLogout}>Logout</a>;
  }

  if (authCtx.authenticationStage === "logout") {
    return <Login />;
  }

  if (authCtx.authenticationStage === "register") {
    return <Register />;
  }
}
