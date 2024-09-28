import React, { useEffect, useState } from "react";
import ScoreTable from "../components/ScoreTable";
import { useBackendService } from "../ContextAPI/connectToBackend";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function MatchDeatils() {
  const { getMatchData, matchData } = useBackendService();
  const gameId = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    getMatchData(gameId.id);
  }, []);

  const [liveScore, setLiveScore] = useState("");

  useEffect(() => {
    socket.on("score_updated", (data) => {
      setLiveScore(data);
    });

    return () => {
      socket.off("score_updated");
    };
  }, []);

  function toSentenceCase(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <>
      <div className="h-screen w-full lg:w-[85%] pt-10 font-inter">
        <div className="relative left-10">
          <button onClick={() => Navigate("/liveScore")}>
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
        {matchData ? (
          <div>
            <div className="flex flex-col-reverse xl:flex-row justify-between">
              <div
                id="left"
                className="w-full text-white px-2 2xl:px-20 py-3 text-base sm:text-lg font-inter"
              >
                <h1>
                  Title :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${matchData.eventDetails.eventTitle}`}</span>
                </h1>
                <h1>
                  Description :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${matchData.eventDetails.eventDesc}`}</span>
                </h1>
                <h1>
                  Start Date :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${matchData.eventDetails.eventStart}`}</span>
                </h1>
                <h1>
                  End Date :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${matchData.eventDetails.eventEnd}`}</span>
                </h1>
                <h1>
                  Court :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.eventPlace
                  )}`}</span>
                </h1>
                <h1>
                  Number of Players :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.numberOfPlayers
                  )}`}</span>
                </h1>
                <h1>
                  First Team Name :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.firstTeamName
                  )}`}</span>
                </h1>
                <h1>
                  Second Team Name :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.secondTeamName
                  )}`}</span>
                </h1>
                <h1>
                  First Team Player's name :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.playerOne
                  )}`}</span>
                  <span className="font-bold text-xl sm:text-2xl">
                    {matchData.playerThree
                      ? " & " + toSentenceCase(matchData.playerThree)
                      : null}
                  </span>
                </h1>
                <h1>
                  Second Team Player's name :{" "}
                  <span className="font-bold text-xl sm:text-2xl">{`${toSentenceCase(
                    matchData.playerTwo
                  )}`}</span>
                  <span className="font-bold text-xl sm:text-2xl">
                    {matchData.playerFour
                      ? " & " + toSentenceCase(matchData.playerFour)
                      : null}
                  </span>
                </h1>
                <div className="flex gap-2 text-[3rem] justify-center font-bold py-2">
                  <h1>
                    {matchData.isPlayed || liveScore == ""
                      ? matchData.scores.length > 0
                        ? matchData.scores.slice(-1)[0].firstTeamScore
                        : null
                      : liveScore.firstTeamScore}
                  </h1>
                  <p>-</p>
                  <h1>
                    {matchData.isPlayed || liveScore == ""
                      ? matchData.scores.length > 0
                        ? matchData.scores.slice(-1)[0].secondTeamScore
                        : null
                      : liveScore.secondTeamScore}
                  </h1>
                </div>
                <div>
                  {matchData.isPlayed ? (
                    <p className="border border-green-500 px-5 py-1 text-center text-xl sm:text-3xl bg-green-500 rounded-xl">
                      {toSentenceCase(matchData.winner)}
                    </p>
                  ) : (
                    <div>
                      {matchData.scores.length > 0 ? (
                        <div>
                          <div>
                            {liveScore.status === "start" ||
                            liveScore === "" ? (
                              <p className="border border-blue-500 px-5 py-1 text-center bg-blue-500 rounded-xl">
                                Match is Live Now
                              </p>
                            ) : null}
                          </div>
                          <div>
                            {liveScore.status === "end" && (
                              <p className="border border-green-500 px-5 py-1 text-center bg-green-500 rounded-xl">
                                {liveScore.won}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="border border-red-500 px-5 py-1 text-center bg-red-500 rounded-xl">
                          Not Started Yet
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div id="right" className="w-[70%] 2xl:w-full">
                <img
                  className="rounded-xl"
                  src={`../${matchData?.eventPlace}.jpg`}
                  alt={`${matchData?.eventPlace} court`}
                />
              </div>
            </div>
            <div className="mt-4 w-full xl:w-[75%] m-auto h-96">
              <ScoreTable />
            </div>
          </div>
        ) : (
          <div className="text-3xl text-center text-white font-inter">
            Loding....
          </div>
        )}
      </div>
    </>
  );
}

export default MatchDeatils;
