import React, { useState } from "react";
import { toast } from "react-toastify";
import { useService } from "../ContextAPI/axios";
import dayjs from "dayjs";

function MatchForm({ event }) {
  const { addMatch } = useService();

  const [matchTypeOption, setMatchTypeOption] = useState(false);
  const [matchBox, setMatchBox] = useState(true);

  const [matchDetail, setMatchDetail] = useState({
    eventDetails: event?._id,
    typeOfMatch: "",
    firstTeamName: "",
    secondTeamName: "",
    playerOne: "",
    playerTwo: "",
    playerThree: "",
    playerFour: "",
    matchDate: "",
  });

  function matchType(opt) {
    matchDetail.typeOfMatch = `${opt}`;
    setMatchTypeOption(!matchTypeOption);
  }

  function toSentenceCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleMatchData = (e) => {
    setMatchDetail({
      ...matchDetail,
      [e.target.name]: toSentenceCase(e.target.value),
    });
  };

  const verifyDate = () => {
    const date = dayjs(matchDetail?.matchDate);
    const startDate = dayjs(event?.eventStart, "DD-MM-YYYY");
    const endDate = dayjs(event?.eventEnd, "DD-MM-YYYY");

    const isWithinRange = date.isBetween(startDate, endDate, null, "[]");
    if (!isWithinRange) {
      toast.error("Date must be within event range");
      return false;
    }
    return date.format("DD-MM-YYYY");
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();
    const newDetails = {
      ...matchDetail,
      matchDate: verifyDate(),
    };
    const data = await addMatch(event?._id, newDetails);
    if (data.status == 201) {
      setMatchDetail({
        typeOfMatch: "",
        firstTeamName: "",
        secondTeamName: "",
        playerOne: "",
        playerTwo: "",
        playerThree: "",
        playerFour: "",
        matchDate: "",
      });
      setMatchBox(!matchBox);
    }
  };

  return (
    <>
      {matchBox && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl h-[580px] lg:h-auto overflow-y-auto">
          <h1 className="text-lg md:text-xl lg:text-2xl sm:text-center p-2 font-inter font-bold text-[#B1D848]">
            Create New Match
          </h1>
          <form
            onSubmit={handleSumbmit}
            action="post"
            className="flex flex-col gap-4 font-inert"
          >
            <div className="relative">
              <label htmlFor="typeOfMatch" className="mx-2">
                Type of match :
              </label>
              <input
                type="text"
                name="typeOfMatch"
                value={matchDetail.typeOfMatch}
                onChange={handleMatchData}
                onClick={() => setMatchTypeOption((prev) => !prev)}
                id=""
                className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
              />
              {matchTypeOption ? (
                <div className="p-2 cursor-pointer absolute shadow-2xl bg-white right-16 top-7">
                  {[
                    "Men's singles",
                    "Men's doubles",
                    "Women's singles",
                    "Women's doubles",
                  ].map((opt) => (
                    <p
                      key={opt}
                      className="font-medium text-sm md:text-lg text-nowrap text-center border-b-[1px] border-slate-800 px-5 pb-2"
                      onClick={() => matchType(opt)}
                    >
                      {opt}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="firstTeamName" className="mx-2">
                First Team Name :
              </label>
              <input
                type="text"
                name="firstTeamName"
                value={matchDetail.firstTeamName}
                onChange={handleMatchData}
                id=""
                className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
              />
            </div>
            <div>
              <label htmlFor="playerOne" className="mx-2">
                Player number one :
              </label>
              <input
                type="text"
                name="playerOne"
                value={matchDetail.playerOne}
                onChange={handleMatchData}
                id=""
                className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
              />
            </div>
            <div>
              {matchDetail.typeOfMatch === "Women's doubles" ||
              matchDetail.typeOfMatch === "Men's doubles" ? (
                <div>
                  <label htmlFor="playerThree" className="mx-2">
                    Player number three :
                  </label>
                  <input
                    type="text"
                    name="playerThree"
                    value={matchDetail.playerThree}
                    onChange={handleMatchData}
                    id=""
                    className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
                  />
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="secondTeamName" className="mx-2">
                Second Team Name :
              </label>
              <input
                type="text"
                name="secondTeamName"
                value={matchDetail.secondTeamName}
                onChange={handleMatchData}
                id=""
                className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
              />
            </div>
            <div>
              <label htmlFor="playerTwo" className="mx-2">
                Player number two :
              </label>
              <input
                type="text"
                name="playerTwo"
                value={matchDetail.playerTwo}
                onChange={handleMatchData}
                id=""
                className="border-b-[1px] font-medium  border-slate-500 outline-none px-4 py-1 "
              />
            </div>
            <div>
              {matchDetail.typeOfMatch === "Women's doubles" ||
              matchDetail.typeOfMatch === "Men's doubles" ? (
                <div>
                  <label htmlFor="playerFour" className="mx-2">
                    Player number four :
                  </label>
                  <input
                    type="text"
                    name="playerFour"
                    value={matchDetail.playerFour}
                    onChange={handleMatchData}
                    id=""
                    className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
                  />
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="typeofmatch" className="mx-2">
                Match Date :
              </label>
              <input
                type="date"
                name="matchDate"
                placeholder="DD-MM-YYYY"
                value={matchDetail.matchDate}
                onChange={handleMatchData}
                id=""
                className="border-b-[1px] font-medium border-slate-500 outline-none px-4 py-1 "
              />
            </div>
            <div className="flex justify-between px-0 md:px-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1"
                className="cursor-pointer"
                onClick={() => setMatchBox(!matchBox)}
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
              <button
                className=" border-[1px] border-black px-4 py-1 rounded-2xl"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default MatchForm;
