import React from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const Navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full min-h-screen bg-[url('./badminton.jpg')] bg-bottom bg-cover bg-no-repeat">
        <div className="absolute top-[4rem] left-[6rem]">
          <button onClick={() => Navigate("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl text-white font-bold pt-28 pl-96 mb-5 font-inter">
          Working on it for now 😄
        </h1>
      </div>
    </>
  );
}

export default ForgotPassword;
