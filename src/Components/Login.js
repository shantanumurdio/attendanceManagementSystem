import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Components/utils/validate";
import {
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const dispatch = useDispatch();

  const fname = useRef(null);
  const lname = useRef(null);
  const email = useRef(null);
  const passwordLogin = useRef(null);
  // const password = useRef(null);

  const handleButtonClick = () => {
    const fnameValue = fname.current ? fname.current.value : null;
    const lnameValue = lname.current ? lname.current.value : null;
    const emailValue = email.current ? email.current.value : null;
    const passwordLoginValue = passwordLogin.current
      ? passwordLogin.current.value
      : null;
    // const passwordValue = password.current ? password.current.value : null;

    const message = checkValidData(
      fnameValue,
      lnameValue,
      emailValue,
      passwordLoginValue
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, emailValue, passwordLoginValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fname.current.value + " " + lname.current.value,
          })
            .then(() => {
              // auth.currentUser I am doing because when I logged in It will not update my name and photoURL
              // It will update when I refresh the page , thats why I use dipatch hook over her so it can update form here
              // and (I cannot put user in the place of auth.currentUser), because the user is not updated yet so thats
              // the reason I use (auth.currentUser) so it will get the current value and update the redux store
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );

            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "--" + errorMessage);
          // ..
        });
    } else {
      // Signed in
      signInWithEmailAndPassword(auth, emailValue, passwordLoginValue)
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          className=""
          src="https://resoluteaisoftware.in/static/media/metaverse.9e73b8fe8e80b50380f4.webp"
          alt="bg_logo"
        />
      </div>

      <div className="relative">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              class="mx-auto h-10 w-auto"
              src="https://yt3.googleusercontent.com/ytc/APkrFKZJc5HvMTRoY5TErf0uYRdS7by_8SyyscpEyVqq=s900-c-k-c0x00ffffff-no-rj"
              alt="Your Company"
            />
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              {isSignInForm
                ? "Sign in to your account"
                : "Sign Up to your account"}
            </h2>
          </div>

          <div class="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => e.preventDefault()}
              class="space-y-6"
              action="#"
              method="POST"
            >
              {!isSignInForm && (
                <div>
                  <label
                    for="fname"
                    class="block text-sm font-medium leading-6 text-white"
                  >
                    First Name
                  </label>
                  <div class="mt-0">
                    <input
                      ref={fname}
                      id="fname"
                      name="fname"
                      type="text"
                      autocomplete="fname"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                  </div>
                </div>
              )}
              {!isSignInForm && (
                <div>
                  <label
                    for="lname"
                    class="block text-sm font-medium leading-6 text-white"
                  >
                    Last Name
                  </label>
                  <div class="mt-0">
                    <input
                      ref={lname}
                      id="lname"
                      name="lname"
                      type="text"
                      autocomplete="lname"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                  </div>
                </div>
              )}
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div class="mt-0">
                  <input
                    ref={email}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {!isSignInForm && (
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  <div class="mt-0">
                    <input
                      ref={passwordLogin}
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="password"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                  </div>
                </div>
              )}

              {isSignInForm && (
                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-semibold text-indigo-600 hover:text-zinc-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input
                      ref={passwordLogin}
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                  </div>
                </div>
              )}

              <div>
                <p className="text-red-500 m-3 font-bold text-lg  ">
                  {errorMessage}
                </p>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleButtonClick}
                >
                  {isSignInForm ? "Sign in" : "Sign Up"}
                </button>
              </div>
            </form>

            <p
              class="mt-2 text-center text-sm text-white"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Not a member?" : "Already Registered"}
              <a
                href="#"
                class="font-semibold leading-6 text-indigo-600 hover:text-zinc-300"
              >
                {isSignInForm ? "Sign Up Now" : "Sign in Now"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
