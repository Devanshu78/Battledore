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
    numberofplayer: "",
    firstTeamName: "",
    secondTeamName: "",
    playerone: "",
    playertwo: "",
    playerthree: "",
    playerfour: "",
    stricker: "",
    reciver: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameState((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  };

  const verifyFormData = () => {
    if (gameState.stricker === gameState.reciver) {
      toast.error("Stricker and reciver can't be same");
      return false;
    } else if (
      gameState.playerone === gameState.playertwo &&
      gameState.playerthree === gameState.playerfour &&
      gameState.playerone === gameState.playerthree &&
      gameState.playertwo === gameState.playerfour
    ) {
      toast.error("Player can't be same");
      return false;
    } else if (gameState.firstTeamName === gameState.secondTeamName) {
      toast.error("Team Name can't be same");
      return false;
    } else if (
      gameState.stricker != gameState.firstTeamName &&
      gameState.stricker != gameState.secondTeamName
    ) {
      toast.error("Stricker and Team Name must be same");
      return false;
    } else if (
      gameState.reciver != gameState.firstTeamName &&
      gameState.reciver != gameState.secondTeamName
    ) {
      toast.error("Reciver and Team Name must be same");
      return false;
    }
    return true;
  };

  const handleStartGame = async () => {
    const valid = verifyFormData();
    if (valid) {
      const reqDetail = {
        eventPlace: gameState.eventPlace,
        numberofplayer: gameState.numberofplayer,
        firstTeamName: gameState.stricker,
        secondTeamName: gameState.reciver,
        playerone: gameState.playerone,
        playertwo: gameState.playertwo,
        playerthree: gameState.playerthree,
        playerfour: gameState.playerfour,
        eventDetail: gameState.eventId,
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
        <h3 className="mt-20 text-3xl md:text-4xl text-white mb-3 flex flex-col md:flex-row md:gap-2">
          Game,
          <span className="text-[#B1D848] uppercase font-bold">ONN</span>
        </h3>
        <p className="border-b-2 w-1/2"></p>
        <div className="w-[90%] lg:w-[45%] bg-[#7CB6CB] min-w-[250px] min-h-[500px] rounded-[50px] md:rounded-[50px] lg:rounded-[96px] px-8 lg:px-16 py-5 mt-5 lg:mt-10 flex flex-col gap-5">
          <h1 className="text-xl md:text-3xl text-white">Start</h1>
          <input
            type="text"
            placeholder="Select Court"
            name="eventPlace"
            value={gameState.eventPlace}
            onChange={handleChange}
            className="px-5 outline-none py-2 rounded-3xl"
          />
          <input
            type="text"
            placeholder="Single or Doubles"
            name="numberofplayer"
            value={gameState.numberofplayer}
            onChange={handleChange}
            className="px-5 outline-none py-2 rounded-3xl"
          />

          <div className="flex gap-7 lg:gap-2 flex-col lg:flex-row">
            <div className="w-full flex flex-col gap-2">
              <input
                type="text"
                placeholder="First Team Name"
                name="firstTeamName"
                value={gameState.firstTeamName}
                onChange={handleChange}
                className="px-5 outline-none py-2 rounded-3xl"
              />
              <input
                type="text"
                placeholder="Player 1"
                name="playerone"
                value={gameState.playerone}
                onChange={handleChange}
                className="px-5 outline-none py-2 rounded-3xl"
              />
              {gameState.numberofplayer === "doubles" ? (
                <input
                  type="text"
                  placeholder="Player 2"
                  name="playerthree"
                  value={gameState.playerthree}
                  onChange={handleChange}
                  className="px-5 outline-none py-2 rounded-3xl"
                />
              ) : null}
            </div>
            <div className="w-full flex flex-col gap-2">
              <input
                type="text"
                placeholder="Second Team Name"
                name="secondTeamName"
                value={gameState.secondTeamName}
                onChange={handleChange}
                className="px-5 outline-none py-2 rounded-3xl"
              />
              <input
                type="text"
                placeholder="Player 1"
                name="playertwo"
                value={gameState.playertwo}
                onChange={handleChange}
                className="px-5 outline-none py-2 rounded-3xl"
              />
              {gameState.numberofplayer === "doubles" ? (
                <input
                  type="text"
                  placeholder="Player 2"
                  name="playerfour"
                  value={gameState.playerfour}
                  onChange={handleChange}
                  className="px-5 outline-none py-2 rounded-3xl"
                />
              ) : null}
            </div>
          </div>

          <div className="flex items-start lg:items-center gap-2 flex-col lg:flex-row">
            <span className="font-base text-xl text-nowrap"> Stricker : </span>
            <input
              type="text"
              placeholder="Select Stricker Team"
              name="stricker"
              value={gameState.stricker}
              onChange={handleChange}
              className="outline-none px-5 py-2 rounded-3xl w-full"
            />
          </div>
          <div className="flex items-start lg:items-center gap-2 flex-col lg:flex-row">
            <span className="font-base text-xl text-nowrap"> Reciver : </span>
            <input
              type="text"
              placeholder="Select Reciver Team"
              name="reciver"
              value={gameState.reciver}
              onChange={handleChange}
              className="outline-none px-5 py-2 rounded-3xl w-full"
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
    </>
  );
}

export default Game;
