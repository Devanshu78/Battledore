import React from "react";

function LiveScore() {
  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Live Score
      </h1>
      <hr />
      <div className="w-96 rounded-3xl bg-[#7CB6CB] mt-10 p-3 font-inter flex flex-col gap-4">
        <img className="rounded-3xl" src="../court-1.jpg" alt="" />
        <div className="flex flex-col px-4">
          <p className="font-medium opacity-70 text-3xl text-[#B1D848]">
            {" "}
            Sliver Court
          </p>
          <div className="flex justify-between items-center font-inter ">
            <div>
              <p className="text-xl text-center font-bold text-white">23</p>
              <p className="text-lg font-medium text-white">Kartik</p>
            </div>
            <p className="border-b-blue-600 text-white">Live Match</p>
            <div>
              <p className="text-xl text-center font-bold text-white">12</p>
              <p className="text-lg font-medium text-white">Devanshu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveScore;
