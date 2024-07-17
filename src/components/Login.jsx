import style from "../component css/Login.module.css";
import { isValidElement, useContext, useRef, useState } from "react";

import { Auth } from "../store/auth-details";
import { Link, useNavigate } from "react-router-dom";
import BackendWarning from "./BackendWarning";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { setUserAndToken } = useContext(Auth);

  const onLogin = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Backend url : ", import.meta.env.VITE_PUBLIC_BACKEND_URL);
    const response_auth = await fetch(
      `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response_auth.ok) {
      const data = await response_auth.json();
      if (data) {
        const { user, token } = data;
        setUserAndToken(user, token);
        navigate("/home");
      } else {
        console.log("No data returned from server");
      }
    } else {
      setIsValidPassword(false);
      console.error("Server responded with status", response_auth.status);
    }
  };
  setTimeout(() => {
    setIsValidPassword(true);
  }, 20000);
  return (
    <>
      <center className={style.bg}>
        <form action="" className={style.form} onSubmit={onLogin}>
          <BackendWarning />
          <legend>
            <h2>Login Here !</h2>
          </legend>
          {/* Why saying below isValidPassword is incorrect */}
          {!isValidPassword && (
            <>
              <div className="alert alert-danger" role="alert">
                Your password or/and email is/are incorrect...
              </div>
            </>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>
            Dont have an account ?{" "}
            <span>
              <Link to={"/sign-up"}>Sign Up</Link>{" "}
            </span>
          </p>
        </form>
      </center>
    </>
  );
}

export default Login;
