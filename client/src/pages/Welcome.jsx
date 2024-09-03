import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const Navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full min-h-screen bg-[url('./badminton.jpg')] bg-bottom bg-cover bg-no-repeat">
        <h1 className="text-[14rem] text-start absolute top-16  -left-5 z-50 text-white font-bold opacity-80">
          {" "}
          <span className="text-[#B1D848] font-inter font-bold">BATTLE</span>
          DORE
        </h1>
        <div className="w-[44rem] left-24 relative top-[8rem] bg-[#5ea0b8] min-h-[300px] rounded-[80px] px-10 pt-[13rem] pb-10 ">
          <div className="flex flex-col justify-evenly gap-9 min-h-[300px] mt-5">
            <div className="font-inter flex flex-col gap-7">
              <h1 className="uppercase text-3xl font-bold text-white">
                Welcome !
              </h1>
              <p className="text-white font-medium text-xl">
                To your Ultimate Back end Solution for Seamless Badminton
                <br /> Match Management and Coordination
              </p>
            </div>
            <div className="flex justify-between flex-col items-center gap-5">
              <button
                onClick={() => Navigate("login")}
                className=" py-3 w-full bg-white font-medium font-inter rounded-3xl text-xl scale-95 hover:scale-100"
              >
                Log In
              </button>
              <button
                onClick={() => Navigate("signup")}
                className="border py-3 w-full font-medium font-inter rounded-3xl text-xl scale-95 hover:scale-100"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
