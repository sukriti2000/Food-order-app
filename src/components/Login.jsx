import AuthInput from "./UI/AuthInput";
import { useContext, useEffect } from "react";
import { UserAuthenticationContext } from "../store/userAuthenticationContext";
import useHttp from "../hooks/useHttp";
import { Link, useNavigate } from "react-router-dom";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Login() {
  const authCtx = useContext(UserAuthenticationContext);
  const navigate = useNavigate();
  function handleToRegister() {
    authCtx.registerUser();
  }
  const { data, error, sendRequest } = useHttp(
    "http://localhost:3000/auth/login",
    requestConfig
  );

  useEffect(() => {
    // This effect runs after the component has been rendered
    if (data) {
      // If data is available, user logged in successfully
      localStorage.setItem(
        "user",
        JSON.stringify({ email: data.user.email, token: data.token })
      );

      console.log("data", data);
      navigate("/");
    }
  }, [data]);

  function handleToLogin() {
    authCtx.loginUser();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    sendRequest(
      JSON.stringify({
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
      })
    );
  }

  let RegisterInfo;
  if (data) {
    RegisterInfo = "User logges in Successfully";
  } else if (error) {
    RegisterInfo = error;
  }

  return (
    <div className="wrapper">
      <div className="title">Login Form</div>
      <form onSubmit={handleSubmit}>
        <AuthInput label="email" type="email" id="email" />
        <AuthInput label="password" type="password" id="password" />

        <div className="field">
          <input type="submit" value="Login" />
        </div>
        {(error || data) && RegisterInfo}
        <div className="signup-link">
          Not a member? <Link to="/auth/register">SignUp</Link>
        </div>
      </form>
    </div>
  );
}
