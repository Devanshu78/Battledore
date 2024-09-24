import React, { useEffect, useState } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function LiveScore() {
  const { getScoresData, myData, removeMatch, numberofMatches } =
    useBackendService();

  const [livescore, setLivescore] = useState("");

  const [list, setList] = useState([]);

  const getData = async () => {
    const res = await getScoresData();
    setList(res);
  };

  useEffect(() => {
    getData();
  }, [numberofMatches]);

  useEffect(() => {
    socket.on("score_updated", (data) => {
      setLivescore(data);
    });

    return () => {
      socket.off("score_updated");
    };
  }, []);

  return (
    <div className="w-[90%] md:w-[95%]">
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Live Score
      </h1>
      <hr />
      <div className=" h-[80%] overflow-auto pl-0 md:pl-5">
        {list?.map((event) => (
          <div key={event._id}>
            <div className="w-full rounded-3xl bg-[#7CB6CB] mt-5 p-3 font-inter flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-col lg:flex-row w-[90%] gap-2">
                <img
                  className="rounded-3xl w-48"
                  src={`../${event.eventPlace}.jpg`}
                  alt=""
                />
                <div className="flex flex-col px-1 sm:px-4 gap-2 text-white text-sm sm:text-base md:text-xl text-nowrap">
                  <h1 className="font-bold flex flex-col sm:flex-row sm:gap-2 sm:items-center">
                    {event.eventDetail.eventTitle}{" "}
                    <span className="text-sm font-normal">
                      {event.eventDetail.eventDesc}
                    </span>
                  </h1>
                  {/* <p className="font-bold">
                    {event.playerone}{" "}
                    <span className="text-sm font-normal">
                      ({event.firstTeamName})
                    </span>{" "}
                    vs {event.playertwo}{" "}
                    <span className="text-sm font-normal">
                      ({event.secondTeamName})
                    </span>
                  </p> */}
                  <p className="text-sm flex flex-col sm:flex-row sm:gap-2 sm:items-center">
                    <span>{event.eventDetail.eventStart} </span>
                    <span>{event.eventPlace.toUpperCase()} </span>
                    <span>Umpire : {event.referee.toUpperCase()}</span>
                  </p>
                  <p>
                    {event.isPlayed || livescore == ""
                      ? event.scores.slice(-1)[0].firstTeamScore
                      : livescore.teamonescore}{" "}
                    <span className="text-sm font-normal">
                      ({event.firstTeamName})
                    </span>{" "}
                    |{" "}
                    {event.isPlayed || livescore == ""
                      ? event.scores.slice(-1)[0].secondTeamScore
                      : livescore.teamtwoscore}{" "}
                    <span className="text-sm font-normal">
                      ({event.secondTeamName})
                    </span>
                  </p>
                  {event.isPlayed ? (
                    <p className="border border-green-500 px-5 py-1 text-center bg-green-500 rounded-xl">
                      {event.winner}
                    </p>
                  ) : (
                    <div>
                      <div>
                        {livescore.status === "notStart" || livescore === "" ? (
                          <p className="border border-red-500 px-5 py-1 text-center bg-red-500 rounded-xl">
                            Not Started Yet
                          </p>
                        ) : null}
                      </div>
                      <div>
                        {livescore.status === "start" &&
                        event.scores.length > 0 ? (
                          <p className="border border-blue-500 px-5 py-1 text-center bg-blue-500 rounded-xl">
                            Match is Live Now
                          </p>
                        ) : null}
                      </div>
                      <div>
                        {livescore.status === "end" && (
                          <p className="border border-green-500 px-5 py-1 text-center bg-green-500 rounded-xl">
                            {livescore.won}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className=" text-end">
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
                        className="w-5 sm:w-7 h-5 sm:h-7"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveScore;
