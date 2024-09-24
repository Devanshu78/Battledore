import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBackendService } from "../ContextAPI/connectToBackend";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function ScorePage() {
  const { getMatchData, matchData, updateScores } = useBackendService();
  const gameId = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    getMatchData(gameId);
  }, []);
  useEffect(() => {}, [matchData]);

  const [teamOneScore, setTeamOneScore] = useState("1");
  const [teamTwoScore, setTeamTwoScore] = useState("1");

  const sendScore = (f_score, s_score, isActive, winner) => {
    socket.emit("update_score", {
      teamonescore: f_score,
      teamtwoscore: s_score,
      status: isActive,
      won: winner,
      Id: gameId.id,
    });
  };

  useEffect(() => {
    sendScore(teamOneScore, teamTwoScore, "notStart");
  }, []);

  const handleButtonClick = (team) => {
    if (team === "teamOne") {
      const newTeamOneScore = (parseInt(teamOneScore) + 1).toString();
      setTeamOneScore(newTeamOneScore);
      sendScore(newTeamOneScore, teamTwoScore, "start");
    } else if (team === "teamTwo") {
      const newTeamTwoScore = (parseInt(teamTwoScore) + 1).toString();
      setTeamTwoScore(newTeamTwoScore);
      sendScore(teamOneScore, newTeamTwoScore, "start");
    } else if ((team = "undo")) {
      let newTeamOneScore;
      let newTeamTwoScore;
      if (parseInt(teamOneScore) > 1 && parseInt(teamTwoScore) > 1) {
        newTeamOneScore = (parseInt(teamOneScore) - 1).toString();
        newTeamTwoScore = (parseInt(teamTwoScore) - 1).toString();
        setTeamOneScore(newTeamOneScore);
        setTeamTwoScore(newTeamTwoScore);
        sendScore(newTeamOneScore, newTeamTwoScore, "start");
      } else if (parseInt(teamOneScore) > 1) {
        newTeamOneScore = (parseInt(teamOneScore) - 1).toString();
        setTeamOneScore(newTeamOneScore);
        sendScore(newTeamOneScore, teamTwoScore, "start");
      } else if (parseInt(teamTwoScore) > 1) {
        newTeamTwoScore = (parseInt(teamTwoScore) - 1).toString();
        setTeamTwoScore(newTeamTwoScore);
        sendScore(teamOneScore, newTeamTwoScore, "start");
      }
    }
  };

  const endMatchSession = async () => {
    let winner = "";
    if (teamOneScore > teamTwoScore) {
      winner = `${matchData.firstTeamName} wins`;
    } else if (teamOneScore < teamTwoScore) {
      winner = `${matchData.secondTeamName} wins`;
    } else {
      winner = "DRAW";
    }

    const temp = {
      winner,
    };

    const res = await updateScores(temp, gameId.id);
    if (res.ok) {
      Navigate("/livescore");
      sendScore(teamOneScore, teamTwoScore, "end", winner);
    }
  };

  return (
    <>
      <div className="h-screen w-[80%] m-auto font-inter">
        {/* Top Button Section */}
        <div className="flex justify-center items-center">
          <div className="text-3xl text-white font-bold rounded-3xl py-3 px-2 bg-[rgb(124,182,203)] m-4 flex justify-center items-center shadow-lg">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#fff"
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
            </button>
            <img className="w-12" src="./../shuttlecock.png" alt="" />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#fff"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
          </div>
          <button
            className="text-3xl text-white font-bold rounded-3xl px-5 py-3 bg-[#7cb6cb] m-4 w-48 flex justify-center items-center shadow-lg"
            onClick={() => handleButtonClick("undo")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="100px"
              fill="#fff"
            >
              <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
            </svg>
          </button>
          <button
            className="text-3xl text-white font-bold rounded-3xl px-5 py-3 bg-[#7cb6cb] m-4 w-48 flex justify-center items-center shadow-lg"
            onClick={() => {
              endMatchSession();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="100px"
              fill="#fff"
            >
              <path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" />
            </svg>
          </button>
        </div>

        {/* Main Section */}
        <div className="w-[85%] lg:w-[60%] m-auto h-auto bg-white rounded-3xl">
          {/* Score */}
          <div className="px-10 text-[2.5rem] lg:text-[3rem] text-[#7cb6cb] flex justify-between">
            <span>{`${teamOneScore}`}</span>
            <span>{`${teamTwoScore}`}</span>
          </div>
          {/* Court */}
          <div className=" w-[95%] md:w-[105%] lg:w-[135%] xl:w-[120%] 2xl:w-[130%] h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[30rem] 2xl:h-[40rem] relative  left-4 md:-left-[0.75rem] lg:-left-[5rem] xl:-left-[2rem] 2xl:-left-[10rem] bg-[url('./../badminton_court.jpg')] bg-cover bg-no-repeat bg-center flex shadow-lg">
            <button
              className="absolute top-[40%] -left-5 lg:-left-10 xl:-left-20 p-4 lg:p-6 xl:p-10 rounded-2xl text-xl xl:text-3xl text-white bg-[#7cb6cb] shadow-lg"
              onClick={() => handleButtonClick("teamOne")}
            >
              Score
            </button>
            <div className="w-full text-xl lg:text-xl xl:text-3xl text-white flex flex-col justify-evenly items-center">
              <div>
                <h1 className="text-xl xl:text-3xl">
                  {matchData?.playerone?.toUpperCase()}
                </h1>
                <p className="text-base xl:text-3xl">
                  ({matchData?.firstTeamName})
                </p>
              </div>
              {matchData?.playerthree && (
                <div>
                  <h1 className="text-xl xl:text-3xl">
                    {matchData?.playerthree?.toUpperCase()}
                  </h1>
                  <p className=" text-base xl:text-3xl">
                    ({matchData?.firstTeamName})
                  </p>
                </div>
              )}
            </div>
            <div className="w-full text-white flex flex-col justify-evenly items-center">
              <div>
                <h1 className="text-xl xl:text-3xl">
                  {matchData?.playertwo?.toUpperCase()}
                </h1>
                <p className=" text-base xl:text-3xl">
                  ({matchData?.secondTeamName})
                </p>
              </div>
              {matchData?.playerfour && (
                <div>
                  <h1 className="text-xl xl:text-3xl">
                    {matchData?.playerfour?.toUpperCase()}
                  </h1>
                  <p className=" text-base xl:text-3xl">
                    ({matchData?.secondTeamName})
                  </p>
                </div>
              )}
            </div>
            <button
              className="absolute top-[40%] -right-5 lg:-right-10 xl:-right-20 p-4 lg:p-6 xl:p-10 rounded-2xl text-xl xl:text-3xl text-white bg-[#7cb6cb] shadow-lg"
              onClick={() => handleButtonClick("teamTwo")}
            >
              Score
            </button>
          </div>
          {/* Score Board  */}
          {matchData?.numberofplayer == "doubles" ? (
            <div id="doubles" className="px-2">
              <div>
                <div className="flex justify-between">
                  {`${matchData.playerone}`}
                  <div className="flex">
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                  </div>
                </div>
                <div className="border-[1px] border-[#5ea0b8] opacity-70"></div>
                <div className="flex justify-between">
                  {`${matchData?.playerthree}`}
                  <div className="flex">
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                  </div>
                </div>
              </div>

              <div className="border w-[110%] relative -left-5 border-[#5ea0b8]"></div>
              <div className="pb-5">
                <div className="flex justify-between">
                  {`${matchData?.playertwo}`}
                  <div className="flex">
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                  </div>
                </div>
                <div className="border-[1px] border-[#5ea0b8] opacity-60"></div>
                <div className="flex justify-between border border-b-[#5ea0b8]">
                  {`${matchData?.playerfour}`}
                  <div className="flex">
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border border-r-[#5ea0b8] opacity-70"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="singles" className="px-2">
              <div>
                <div className="flex justify-between">
                  {`${matchData?.playerone}`}
                  <div className="flex">
                    {/* {matchData?.scores?.map((score) => (
                      <div
                        key={score._id}
                        className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70 text-center"
                      >
                        {score.firstTeamScore}
                      </div>
                    ))} */}
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70 text-center"></div>
                  </div>
                </div>
                <div className="border w-[110%] relative -left-5 border-[#5ea0b8]"></div>
                <div className="flex justify-between border border-b-[#5ea0b8] pb-5">
                  {`${matchData?.playertwo}`}
                  <div className="flex">
                    <div className="w-5 border border-l-[#5ea0b8] border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                    <div className="w-5 border  border-r-[#5ea0b8] opacity-70"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ScorePage;
