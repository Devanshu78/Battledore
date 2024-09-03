import React, { useEffect } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";

function Players() {
  const { playerList, gettAllUser, numberOfUsers } = useBackendService();

  useEffect(() => {
    gettAllUser();
  }, [numberOfUsers]);

  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Players
      </h1>
      <hr />
      <div>
        <p className="px-10 py-2 text-xl text-white font-medium font-inter">
          Total Players : {playerList.length}
        </p>
        {playerList.map((player) => (
          <div
            key={player._id}
            className=" mt-8 flex justify-between items-center gap-12 text-3xl font-inter"
          >
            <div id="about_event" className="flex gap-6 w-full h-auto">
              <img className="w-28 rounded-2xl" src="../badminton.jpg" alt="" />
              <div className="text-white text-lg w-full h-auto">
                <p className="font-light">
                  Name :{" "}
                  <span className="text-[#B1D848] font-bold uppercase text-xl">
                    {player.username}
                  </span>
                </p>
                <p className="font-light">
                  Email : <span className="font-bold">{player.email}</span>
                </p>
                <p className="font-light">
                  Role : <span className="font-bold">{player.jobrole}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Players;
