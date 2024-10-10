import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBackendService } from "../ContextAPI/connectToBackend";
import ScoreTable from "../components/ScoreTable.jsx";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function ScorePage() {
  const { getMatchData, matchData, updateScores } = useBackendService();
  const gameId = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    getMatchData(gameId.id);
  }, []);

  const [teamOneScore, setTeamOneScore] = useState("0");
  const [teamTwoScore, setTeamTwoScore] = useState("0");
  const [numberOfShuttlecock, setNumberOfShuttlecock] = useState("1");
  const [matchStarted, setMatchStarted] = useState(false);
  useEffect(() => {
    if (matchData?.scores?.length > 0 && matchData.isPlayed == false) {
      matchData.scores.map((data) => {
        setTeamOneScore(data.firstTeamScore);
        setTeamTwoScore(data.secondTeamScore);
        setNumberOfShuttlecock(data.numberOfShuttlecock);
      });
      setMatchStarted(true);
    }
  }, [matchData]);

  const sendScore = (f_score, s_score, isActive, winner) => {
    socket.emit("update_score", {
      _id: new Date().getMilliseconds(),
      firstTeamScore: f_score,
      secondTeamScore: s_score,
      status: isActive,
      won: winner,
      Id: gameId.id,
      numberOfShuttlecock,
      firstTeamName: matchData.firstTeamName,
      secondTeamName: matchData.secondTeamName,
    });
  };

  function toSentenceCase(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

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
      if (parseInt(teamOneScore) > 0 && parseInt(teamTwoScore) > 0) {
        newTeamOneScore = (parseInt(teamOneScore) - 1).toString();
        newTeamTwoScore = (parseInt(teamTwoScore) - 1).toString();
        setTeamOneScore(newTeamOneScore);
        setTeamTwoScore(newTeamTwoScore);
        sendScore(newTeamOneScore, newTeamTwoScore, "start");
      } else if (parseInt(teamOneScore) > 0) {
        newTeamOneScore = (parseInt(teamOneScore) - 1).toString();
        setTeamOneScore(newTeamOneScore);
        sendScore(newTeamOneScore, teamTwoScore, "start");
      } else if (parseInt(teamTwoScore) > 0) {
        newTeamTwoScore = (parseInt(teamTwoScore) - 1).toString();
        setTeamTwoScore(newTeamTwoScore);
        sendScore(teamOneScore, newTeamTwoScore, "start");
      }
    }
  };

  const endMatchSession = async () => {
    let winner = "";
    if (teamOneScore > teamTwoScore) {
      winner = `${toSentenceCase(matchData.firstTeamName)} wins`;
    } else if (teamOneScore < teamTwoScore) {
      winner = `${toSentenceCase(matchData.secondTeamName)} wins`;
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
        <div className="sm:flex justify-center items-center">
          <div className="text-3xl text-white font-bold rounded-3xl py-3 px-2 bg-[rgb(124,182,203)] m-4 flex justify-center items-center shadow-lg">
            <button
              onClick={() =>
                setNumberOfShuttlecock((prev) =>
                  Number(prev) > 1 ? Number(prev) - 1 : prev
                )
              }
              disabled={!matchStarted}
            >
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
            <h1 className="text-[3rem]">{numberOfShuttlecock}</h1>
            <img className="w-12" src="./../shuttlecock.png" alt="" />
            <button
              onClick={() =>
                setNumberOfShuttlecock((prev) =>
                  Number(prev) < 10 ? Number(prev) + 1 : prev
                )
              }
              disabled={!matchStarted}
            >
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
          <div>
            {matchStarted ? (
              <button
                className="text-3xl text-white font-bold rounded-3xl px-5 py-3 bg-red-400 m-4 w-48 flex justify-center items-center shadow-lg"
                onClick={() => {
                  setMatchStarted(false);
                  endMatchSession();
                }}
              >
                End
              </button>
            ) : (
              <button
                className="text-3xl text-white font-bold rounded-3xl px-5 py-3 bg-green-400 m-4 w-48 flex justify-center items-center shadow-lg"
                onClick={() => {
                  setMatchStarted(true);
                  sendScore(teamOneScore, teamTwoScore, "start");
                }}
              >
                Start
              </button>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="w-[85%] lg:w-[60%] m-auto h-auto bg-white pb-3 rounded-3xl">
          {/* Score */}
          <div className="px-10 text-[5rem] text-[#7cb6cb] flex justify-center gap-5 md:gap-10">
            <span>{`${teamOneScore}`}</span>
            <span> - </span>
            <span>{`${teamTwoScore}`}</span>
          </div>
          {/* Court */}
          <div className="h-[10rem] sm:h-[14rem] md:h-[20rem] lg:h-[23rem] xl:h-[25rem] 2xl:h-[30rem] bg-[url('./../badminton_court.jpg')] bg-cover bg-no-repeat bg-center flex shadow-lg">
            <button
              className="absolute top-[43%] md:top-[40%] xl:top-[60%] left-[1rem] xl:left-[10rem] p-6 xl:p-10 rounded-full text-xl md:text-[3rem] text-white bg-[#7cb6cb] shadow-lg"
              onClick={() => handleButtonClick("teamOne")}
              disabled={!matchStarted}
            >
              Score
            </button>
            <div className="w-full text-xl lg:text-xl xl:text-3xl text-white flex flex-col justify-evenly items-center">
              <div className="text-center flex flex-col gap-0 xl:gap-4 max-w-48">
                <h1 className="text-xl xl:text-3xl">
                  {toSentenceCase(matchData?.playerOne)}
                </h1>
                <p className="text-xl md:text-3xl xl:text-[3rem]">
                  ({toSentenceCase(matchData?.firstTeamName)})
                </p>
              </div>
              {matchData?.playerThree && (
                <div className="text-center flex flex-col gap-0 xl:gap-4 max-w-48">
                  <h1 className="text-xl xl:text-3xl">
                    {toSentenceCase(matchData?.playerThree)}
                  </h1>
                  <p className="text-xl md:text-3xl xl:text-[3rem]">
                    ({toSentenceCase(matchData?.firstTeamName)})
                  </p>
                </div>
              )}
            </div>
            <div className="w-full text-white flex flex-col justify-evenly items-center">
              <div className="text-center flex flex-col gap-0 xl:gap-4 max-w-48">
                <h1 className="text-xl xl:text-3xl">
                  {toSentenceCase(matchData?.playerTwo)}
                </h1>
                <p className="text-xl md:text-3xl xl:text-[3rem]">
                  ({toSentenceCase(matchData?.secondTeamName)})
                </p>
              </div>
              {matchData?.playerFour && (
                <div className="text-center flex flex-col gap-0 xl:gap-4 max-w-48">
                  <h1 className="text-xl xl:text-3xl">
                    {toSentenceCase(matchData?.playerFour)}
                  </h1>
                  <p className="text-xl md:text-3xl xl:text-[3rem]">
                    ({toSentenceCase(matchData?.secondTeamName)})
                  </p>
                </div>
              )}
            </div>
            <button
              className="absolute top-[43%] md:top-[40%] xl:top-[60%] right-[1rem] xl:right-[10rem] p-6 xl:p-10 rounded-full text-xl  md:text-[3rem] text-white bg-[#7cb6cb] shadow-lg"
              onClick={() => handleButtonClick("teamTwo")}
              disabled={!matchStarted}
            >
              Score
            </button>
          </div>
        </div>
        <div className="bg-white w-full md:w-[80%] m-auto h-48">
          <ScoreTable />
        </div>
      </div>
    </>
  );
}

export default ScorePage;
