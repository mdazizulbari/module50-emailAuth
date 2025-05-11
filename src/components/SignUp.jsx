import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  const [errorMassage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    console.log(email, password, terms);
    setSuccess(false);
    setErrorMessage("");
    if (!terms) {
      setErrorMessage("Please accept our Terms and Conditions");
      return;
    }
    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        "Password must have one uppercase, one lowdercase, one number and must be more than 6 characters"
      );
      return;
    }
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="" onSubmit={handleSignUp}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <button
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="btn btn-xs absolute top-2 right-6"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <label className="label w-full mt-3">
                <input name="terms" type="checkbox" className="checkbox" />
                Accept Terms and conditions
              </label>
              <button className="btn btn-neutral mt-4">Sign Up</button>
            </form>
            <p>
              Already have an account? Please{" "}
              <Link to={"/login"} className="text-blue-500 underline">
                Login
              </Link>
            </p>
            {errorMassage && (
              <p className="text-red-500 underline">{errorMassage}</p>
            )}
            {success && (
              <p className="text-green-500">User is created successfully</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
