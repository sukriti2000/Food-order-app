import AuthInput from "./UI/AuthInput";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { Link, useNavigate } from "react-router-dom";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Register() {
  // const authCtx = useContext(UserAuthenticationContext);
  const [RegisterInfo, setRegisterInfo] = useState("");
  const navigate = useNavigate();

  const { data, error, sendRequest } = useHttp(
    "http://localhost:3000/auth/register",
    requestConfig
  );

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log("customer data", customerData);

    sendRequest(
      JSON.stringify({
        name: customerData.name,
        email: customerData.registerEmail,
        password: customerData.registerPassword,
      })
    );
  }

  useEffect(() => {
    // This effect runs after the component has been rendered
    if (data) {
      // If data is available, user logged in successfully
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
      setRegisterInfo("User Registered Successfully");
      navigate("/");
    }
    if (error) {
      setRegisterInfo(error);
    }
  }, [data, error]);

  // registration functions end here

  return (
    <div className="wrapper">
      <div className="title">Register</div>
      <form onSubmit={handleSubmit}>
        <AuthInput label="name" type="text" id="name" />
        <AuthInput label="email" type="email" id="registerEmail" />
        <AuthInput label="password" type="password" id="registerPassword" />

        <div className="field">
          <input type="submit" value="Register" />
        </div>
        {(error || data) && RegisterInfo}
        <div className="signup-link">
          <Link to="/auth/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
