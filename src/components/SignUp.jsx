import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
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
    const name = event.target.name.value;
    const photoUrl = event.target.photoUrl.value;
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
        // email verify
        sendEmailVerification(auth.currentUser).then(() => {
          setSuccess(true);
          alert("We sent your a verification email");
        });
        // update user profile
        const profile = {
          displaName: name,
          photoURL: photoUrl,
        };
        updateProfile(auth.currentUser, profile).then(() => {
          console.log("user profile updated");
        });
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
            <form className="space-y-3" onSubmit={handleSignUp}>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Name"
              />
              <input
                type="text"
                className="input"
                name="photoUrl"
                placeholder="Photo URL"
              />
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
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
              <label className="label w-full">
                <input name="terms" type="checkbox" className="checkbox" />
                Accept Terms and conditions
              </label>
              <button className="btn btn-neutral">Sign Up</button>
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
