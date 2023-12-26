import React, { useEffect } from "react";
import { auth } from "./utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
        console.log(user);
        // console.log(displayName);
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmount
    return () => unsubscribe();
  }, []);
  const isBrowsePage = location.pathname === "/browse";

  return (
    <div className="m-0 flex justify-between mr-10">
      <img
        className="h-22 w-44 m-8"
        src="https://resoluteaisoftware.in/static/media/logo.eebe05c78fec55d8a0b7.webp"
        alt="logo"
      />
      <div>
        <h1 className="my-10 font-bold text-3xl border-b-4 shadow-lg border-black p-1">
          Attendance Management System
        </h1>
      </div>

      {/* when my user is present then only show this signout  */}
      {user && isBrowsePage && (
        <div className="flex p-2">
          <button
            onClick={handleSignout}
            className="p-2 bg-red-500 m-2 h-12 mt-8 rounded-lg text-xl font-bold"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
