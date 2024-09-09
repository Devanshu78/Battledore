import React from "react";

function Home() {
  const userName = localStorage.getItem("username");
  return (
    <div>
      <h3 className="mt-20 text-3xl md:text-4xl text-white mb-3 flex flex-col md:flex-row md:gap-2">
        Hello,
        <span className="text-[#B1D848] uppercase font-bold">{userName}</span>
      </h3>
      <p className="border-b-2 w-1/2"></p>
      <div className="w-[95%] bg-[#7CB6CB] min-w-[250px] min-h-[500px] rounded-[50px] md:rounded-[106px] px-8 md:px-16 py-5 mt-10 md:mt-24">
        <h1 className="text-xl md:text-3xl text-white">Court Schedule</h1>
        {/* <div className="min-h-48 mt-8">
          <div className="grid grid-cols-3 gap-10">
            <div className="rounded-3xl bg-[#5ea0b8] p-3 font-inter flex flex-col gap-4">
              <img className="rounded-3xl" src="../court-1.jpg" alt="" />
              <div className="flex flex-col px-4">
                <p className="font-medium text-3xl text-white"> Sliver</p>
                <p className="font-light text-xl opacity-70">$50/per match</p>
              </div>
            </div>
            <div className="rounded-3xl bg-[#5ea0b8] p-3 font-inter flex flex-col gap-4">
              <img className="rounded-3xl" src="../court-2.jpg" alt="" />
              <div className="flex flex-col px-4">
                <p className="font-medium text-white text-3xl"> Gold</p>
                <p className="font-light text-xl opacity-70">$80/per match</p>
              </div>
            </div>
            <div className="rounded-3xl bg-[#5ea0b8] p-3 font-inter flex flex-col gap-4">
              <img className="rounded-3xl" src="../court-4.jpg" alt="" />
              <div className="flex flex-col px-4">
                <p className="font-medium text-white text-3xl"> Premium</p>
                <p className="font-light text-xl opacity-70">$150/per match</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
