import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBackendService } from "../ContextAPI/connectToBackend";

function ScorePage() {
  const { getMatchData, matchData } = useBackendService();
  const gameId = useParams();
  useEffect(() => {
    getMatchData(gameId);
  }, []);
  useEffect(() => {}, [matchData]);

  const [teamOneScore, setTeamOneScore] = useState("01");
  const [teamTwoScore, setTeamTwoScore] = useState("01");

  return (
    <>
      <div className="h-screen w-[90%] lg:w-[70%] m-auto font-inter">
        {/* Top Section Button */}
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
            onClick={() => {
              if (teamOneScore != 1 && teamTwoScore != 1) {
                setTeamOneScore((parseInt(teamOneScore) - 1).toString());
                setTeamTwoScore((parseInt(teamTwoScore) - 1).toString());
              }
            }}
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
          <button className="text-3xl text-white font-bold rounded-3xl px-5 py-3 bg-[#7cb6cb] m-4 w-48 flex justify-center items-center shadow-lg">
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
        <div className="w-[85%] lg:w-[60%] m-auto h-[79%] lg:h-[88%] bg-white rounded-3xl">
          {/* Score */}
          <div className="px-10 text-[2.5rem] lg:text-[3rem] text-[#7cb6cb] flex justify-between">
            <span>{`${teamOneScore}`}</span>
            <span>{`${teamTwoScore}`}</span>
          </div>
          {/* Court */}
          <div
            className="w-[120%] h-[30rem] lg:h-[40rem] relative -left-[4rem] lg:-left-[5rem] 
          bg-[url('./badminton_court.jpg')] bg-cover bg-no-repeat bg-center flex shadow-lg"
          >
            <button
              className="absolute top-[40%] -left-5 lg:-left-20 p-5 lg:p-10 rounded-2xl text-3xl text-white bg-[#7cb6cb] shadow-lg"
              onClick={() =>
                setTeamOneScore((parseInt(teamOneScore) + 1).toString())
              }
            >
              Score
            </button>
            <div className="w-full text-xl lg:text-3xl text-white flex flex-col justify-evenly items-center">
              <div>
                <h1>{matchData?.playerone}</h1>
                <p>({matchData?.firstTeamName})</p>
              </div>
              <div>
                <h1>{matchData?.playerthree}</h1>
                <p>({matchData?.firstTeamName})</p>
              </div>
            </div>
            <div className="w-full text-xl lg:text-3xl text-white flex flex-col justify-evenly items-center">
              <div>
                <h1>{matchData?.playertwo}</h1>
                <p>({matchData?.secondTeamName})</p>
              </div>
              <div>
                <h1>{matchData?.playerfour}</h1>
                <p>({matchData?.secondTeamName})</p>
              </div>
            </div>
            <button
              className="absolute top-[40%] -right-5 lg:-right-20 p-5 lg:p-10 rounded-2xl text-3xl text-white bg-[#7cb6cb] shadow-lg"
              onClick={() =>
                setTeamTwoScore((parseInt(teamTwoScore) + 1).toString())
              }
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
              <div>
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
                <div className="border w-[110%] relative -left-5 border-[#5ea0b8]"></div>
                <div className="flex justify-between border border-b-[#5ea0b8]">
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
