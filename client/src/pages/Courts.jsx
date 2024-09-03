import React from "react";

function Courts() {
  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Courts
      </h1>
      <hr />

      <div className="grid grid-cols-3 gap-10">
        <div className="rounded-3xl bg-[#7CB6CB] mt-10 p-3 font-inter flex flex-col gap-4">
          <img className="rounded-3xl" src="../court-1.jpg" alt="" />
          <div className="flex flex-col px-4">
            <p className="font-medium text-3xl text-white"> Sliver</p>
            <p className="font-light text-xl opacity-70">$50/per match</p>
          </div>
        </div>
        <div className="rounded-3xl bg-[#7CB6CB] mt-10 p-3 font-inter flex flex-col gap-4">
          <img className="rounded-3xl" src="../court-2.jpg" alt="" />
          <div className="flex flex-col px-4">
            <p className="font-medium text-white text-3xl"> Gold</p>
            <p className="font-light text-xl opacity-70">$80/per match</p>
          </div>
        </div>
        <div className="rounded-3xl bg-[#7CB6CB] mt-10 p-3 font-inter flex flex-col gap-4">
          <img className="rounded-3xl" src="../court-4.jpg" alt="" />
          <div className="flex flex-col px-4">
            <p className="font-medium text-white text-3xl"> Premium</p>
            <p className="font-light text-xl opacity-70">$150/per match</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courts;
