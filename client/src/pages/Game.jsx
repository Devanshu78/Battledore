import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useBackendService } from "../ContextAPI/connectToBackend";

function Game() {
  const { eventId } = useParams();
  const Navigate = useNavigate();
  const { startMatch } = useBackendService();

  const [gameState, setGameState] = useState({
    eventId,
    eventPlace: "",
    numberOfPlayers: "",
    firstTeamName: "",
    secondTeamName: "",
    playerOne: "",
    playerTwo: "",
    playerThree: "",
    playerFour: "",
    server: "",
    receiver: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameState((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  };

  const verifyFormData = () => {
    if (gameState.server === gameState.receiver) {
      toast.error("server and receiver can't be same");
      return false;
    } else if (
      gameState.playerOne === gameState.playerTwo &&
      gameState.playerThree === gameState.playerFour &&
      gameState.playerOne === gameState.playerThree &&
      gameState.playerTwo === gameState.playerFour
    ) {
      toast.error("Player can't be same");
      return false;
    } else if (gameState.firstTeamName === gameState.secondTeamName) {
      toast.error("Team Name can't be same");
      return false;
    } else if (
      gameState.server != gameState.firstTeamName &&
      gameState.server != gameState.secondTeamName
    ) {
      toast.error("server and Team Name must be same");
      return false;
    } else if (
      gameState.receiver != gameState.firstTeamName &&
      gameState.receiver != gameState.secondTeamName
    ) {
      toast.error("receiver and Team Name must be same");
      return false;
    }
    return true;
  };

  const handleStartGame = async () => {
    const valid = verifyFormData();
    if (valid) {
      const reqDetail = {
        eventPlace: gameState.eventPlace,
        numberOfPlayers: gameState.numberOfPlayers,
        firstTeamName: gameState.server,
        secondTeamName: gameState.receiver,
        playerOne: gameState.playerOne,
        playerTwo: gameState.playerTwo,
        playerThree: gameState.playerThree,
        playerFour: gameState.playerFour,
        eventDetails: gameState.eventId,
      };
      const res = await startMatch(reqDetail);
      const data = await res.json();
      res.ok ? toast.success(data.message) : toast.error(data.message);
      if (res.ok) {
        Navigate(`/scorepage/${data.gameId}`);
      }
    }
  };

  return (
    <>
      <div>
        <h3 className="mt-1 text-3xl md:text-4xl text-white mb-3 flex gap-2">
          Game,
          <span className="text-[#B1D848] uppercase font-bold">ONN</span>
        </h3>
        <p className="border-b-2 w-1/2"></p>
        <div className="w-[90%] lg:w-[95%] xl:w-[50%] bg-[#7CB6CB] min-w-[250px] min-h-[300px] rounded-[10px] md:rounded-[50px] lg:rounded-[96px] px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-8 mt-3 lg:mt-10 ">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-white">Start</h1>
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 overflow-y-auto">
            <input
              type="text"
              placeholder="Select Court"
              name="eventPlace"
              value={gameState.eventPlace}
              onChange={handleChange}
              className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
            />
            <input
              type="text"
              placeholder="Single or Doubles"
              name="numberOfPlayers"
              value={gameState.numberOfPlayers}
              onChange={handleChange}
              className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
            />

            <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-5">
              <div className="w-full flex flex-col gap-2 ">
                <input
                  type="text"
                  placeholder="First Team Name"
                  name="firstTeamName"
                  value={gameState.firstTeamName}
                  onChange={handleChange}
                  className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                />
                <input
                  type="text"
                  placeholder="Player 1"
                  name="playerOne"
                  value={gameState.playerOne}
                  onChange={handleChange}
                  className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                />
                {gameState.numberOfPlayers === "doubles" && (
                  <input
                    type="text"
                    placeholder="Player 2"
                    name="playerThree"
                    value={gameState.playerThree}
                    onChange={handleChange}
                    className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                  />
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Second Team Name"
                  name="secondTeamName"
                  value={gameState.secondTeamName}
                  onChange={handleChange}
                  className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                />
                <input
                  type="text"
                  placeholder="Player 1"
                  name="playerTwo"
                  value={gameState.playerTwo}
                  onChange={handleChange}
                  className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                />
                {gameState.numberOfPlayers === "doubles" && (
                  <input
                    type="text"
                    placeholder="Player 2"
                    name="playerFour"
                    value={gameState.playerFour}
                    onChange={handleChange}
                    className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 outline-none rounded-3xl w-full h-8 sm:h-10"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <span className="font-base text-sm md:text-base lg:text-xl text-nowrap">
                Server:
              </span>
              <input
                type="text"
                placeholder="Select Servering Team"
                name="server"
                value={gameState.server}
                onChange={handleChange}
                className="outline-none px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-3xl w-full h-8 sm:h-10"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <span className="font-base text-sm md:text-base lg:text-xl text-nowrap">
                receiver:
              </span>
              <input
                type="text"
                placeholder="Select receiver Team"
                name="receiver"
                value={gameState.receiver}
                onChange={handleChange}
                className="outline-none px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-3xl w-full h-8 sm:h-10"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleStartGame}
                className="border border-green-500 bg-green-500 text-xl rounded-xl py-2 px-5 text-white scale-95 hover:scale-100"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
