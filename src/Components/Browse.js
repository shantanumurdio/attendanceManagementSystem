import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Crud from "./Crud";

const Browse = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentCheckInTime, setCurrentCheckInTime] = useState("");
  const [currentCheckOutTime, setCurrentCheckOutTime] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckInDone, setIsCheckInDone] = useState(false);
  const [isCheckOutDone, setIsCheckOutDone] = useState(false);

  useEffect(() => {
    setCurrentDate(
      new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()
    );
    setIsLoggedIn(true);
  }, []);

  const handleCheckIn = () => {
    setCurrentCheckInTime(new Date().toLocaleTimeString());
    setIsCheckInDone(true);
    setIsCheckOutDone(false);
  };

  const handleCheckOut = () => {
    setCurrentCheckOutTime(new Date().toLocaleTimeString());
    setIsCheckOutDone(true);
    setIsCheckInDone(true);
  };


  return (

    <div>
      <Header />
      <div>
        <h1 className="font-bold text-center mt-10 text-2xl">{currentDate}</h1>
      </div>
      <div className="flex justify-around mt-16">
        <button
          className={`${
            isLoggedIn
              ? isCheckInDone
                ? "bg-gray-500"
                : "bg-green-600"
              : "bg-gray-500"
          } font-bold w-72 h-20 text-3xl rounded-lg`}
          onClick={handleCheckIn}
          disabled={isCheckInDone || !isLoggedIn}
        >
          Check In
        </button>
        <button
          className={`${
            isLoggedIn
              ? isCheckOutDone
                ? "bg-gray-500"
                : "bg-green-600"
              : "bg-gray-500"
          } font-bold w-72 h-20 text-3xl rounded-lg`}
          onClick={handleCheckOut}
          disabled={isCheckOutDone || !isLoggedIn || !isCheckInDone}
        >
          Check Out
        </button>
      </div>
      {currentCheckInTime && (
        <div className="text-center mt-4 flex justify-center">
          <h1 className="font-bold mt-20 text-3xl bg-slate-300 p-2 w-2/6 rounded-lg shadow-xl">
            Checked In at: {currentCheckInTime}
          </h1>
        </div>
      )}
      {currentCheckOutTime && (
        <div className="text-center flex justify-center">
          <p className="font-bold mt-20 text-3xl bg-slate-300 p-2  w-2/6 rounded-lg shadow-xl">
            Checked Out at: {currentCheckOutTime}
          </p>
        </div>
      )}
      <div>
      </div>
      <Crud/>
    </div>
  );
};

export default Browse;
