import React, { useEffect, useState } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend";

function LiveScore() {
  const { getScoresData, myData, removeMatch, numberofMatches } =
    useBackendService();

  const [list, setList] = useState([]);

  const getData = async () => {
    const res = await getScoresData();
    setList(res);
  };

  useEffect(() => {
    getData();
  }, [numberofMatches]);

  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Live Score
      </h1>
      <hr />
      <div className=" h-[80%] overflow-auto pl-0 md:pl-5">
        {list?.map((event) => (
          <div>
            <div
              key={event._id}
              className="w-full md:w-[95%] rounded-3xl bg-[#7CB6CB] mt-5 p-3 font-inter flex justify-between items-center"
            >
              <div className="flex flex-col lg:flex-row w-[90%] gap-2">
                <img
                  className="rounded-3xl w-48"
                  src={`../${event.eventPlace}.jpg`}
                  alt=""
                />
                <div className="flex flex-col px-4 gap-2 text-white text-base md:text-xl">
                  <h1 className="font-bold">{event.eventDetail.eventTitle}</h1>
                  <h3 className="text-sm">{event.eventDetail.eventDesc}</h3>
                  <p className="font-bold">
                    {event.playerone} vs {event.playertwo}
                  </p>
                  <p className="text-sm">
                    {event.eventDetail.eventStart} |{" "}
                    {event.eventPlace.toUpperCase()} | Umpire :{" "}
                    {event.referee.toUpperCase()}
                  </p>
                  {event.isPlayed ? (
                    <p className="border border-green-400 px-5 py-1 text-center bg-green-500 rounded-xl">
                      {event.winner}
                    </p>
                  ) : (
                    <p className="border border-red-400 px-5 py-1 text-center bg-red-500 rounded-xl">
                      Not Played Yet
                    </p>
                  )}
                </div>
              </div>
              {myData.isOperator && (
                <div>
                  <button
                    onClick={() => {
                      removeMatch(event._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                      className="bg-[#5ea0b8] w-10 h-10 p-2 rounded-full"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LiveScore;
