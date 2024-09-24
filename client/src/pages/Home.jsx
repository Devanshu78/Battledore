import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function Home() {
  const { myData, getEvents, getScoresData } = useBackendService();

  const [livescore, setLiveScore] = useState("");
  const [events, setEvent] = useState([]);
  const [score, setScore] = useState([]);

  const getData = async () => {
    const eve = await getEvents();
    setEvent(eve);
    const res = await getScoresData();
    setScore(res);
  };

  dayjs.extend(customParseFormat);
  const startDate = dayjs().subtract(30, "day");
  const endDate = dayjs().add(30, "day");
  const recentEvents = events.filter((event) => {
    const eventStartDate = dayjs(event.eventStart, "DD-MM-YYYY");
    const eventEndDate = dayjs(event.eventEnd, "DD-MM-YYYY");

    return (
      eventStartDate.isBetween(startDate, endDate, null, "[]") ||
      eventEndDate.isBetween(startDate, endDate, null, "[]")
    );
  });

  const secondLastScore = livescore.length - 2;
  const lastThreeEvent = recentEvents.length - 3;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket.on("score_updated", (data) => {
      setLiveScore(data);
    });

    return () => {
      socket.off("score_updated");
    };
  }, []);

  console.log(score);
  console.log(livescore);

  return (
    <div>
      <h3 className="mt-10 text-xl sm:text-4xl text-white mb-3 flex gap-2 font-inter">
        Hello,
        <span className="text-[#B1D848] uppercase font-bold">
          {myData.username}
        </span>
      </h3>
      <p className="border-b-2 w-1/2"></p>
      <div className="flex flex-col gap-3  mt-5 md:mt-10">
        {/* Event Section */}
        <div className=" border-4 border-[#7CB6CB] w-[98%] xs:w-[85%] sm:w-[80%] min-h-[200px] sm:min-h-[350px] rounded-[30px] md:rounded-[60px] lg:rounded-[75px] px-3 md:p-5 lg:p-10 py-2 flex justify-between flex-col xl:flex-row gap-1 xs:gap-0">
          <div className="w-auto xl:w-[80%]">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-white text-wrap">
              Events
            </h1>
            <div className="text-white px-1 sm:px-5 mt-2">
              {recentEvents.slice(lastThreeEvent).map((event) => (
                <div
                  key={event._id}
                  className=" text-[0.7rem] xs:text-sm sm:text-base lg:text-lg xl:text-xl"
                >
                  <h1 className="text-[#B1D848] font-bold">{`${event.eventTitle}`}</h1>
                  <div className="flex gap-2">
                    <p>{`${event.eventStart}`}</p>
                    <p>{`${event.eventEnd}`}</p>
                  </div>
                  <p>{`${event.eventDesc}`}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-auto w-full xl:w-[40%] xs:px-5 xs:py-3 xl:py-0 flex items-center rounded-3xl bg-[#7CB6CB]">
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${
                  isActive ? "opacity-70" : "opacity-100"
                } items-center cursor-pointer border py-3 w-full font-medium rounded-3xl text-base  md:text-xl scale-95 hover:scale-100 bg-white text-center`
              }
            >
              See All
            </NavLink>
          </div>
        </div>

        {/* Live Score Section */}
        <div className="border-4 border-[#7CB6CB] w-[98%] xs:w-[85%] sm:w-[80%] min-h-[200px] sm:min-h-[350px] rounded-[30px] md:rounded-[60px] lg:rounded-[75px] px-3 py-2 md:p-5 lg:p-10 flex justify-between flex-col xl:flex-row gap-1 xs:gap-0">
          <div className="w-auto xl:w-[80%] rounded-3xl xl:rounded-[50px] bg-[#7CB6CB] p-2">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-white px-4">
              Live Score
            </h1>
            <div className="text-white px-5 mt-2">
              {score.slice(secondLastScore).map((liv) => (
                <div
                  key={liv._id}
                  className="text-[0.7rem] xs:text-sm sm:text-lg lg:text-xl flex items-center gap-5 "
                >
                  <div>
                    <div className="flex gap-2">
                      <h1 className="text-[#B1D848] font-bold">{`${liv.firstTeamName}`}</h1>
                      <h1 className="text-[#B1D848] font-bold">{`${liv.secondTeamName}`}</h1>
                    </div>
                    <div className="flex gap-2">
                      <p>{`${liv.playerone}`}</p>
                      <p>
                        {liv.isPlayed || livescore == ""
                          ? liv.scores.slice(-1)[0].firstTeamScore
                          : livescore.teamonescore}
                      </p>
                    </div>
                    {liv.numberofplayer === "doubles" && (
                      <div className="flex gap-2">
                        <p>{`${liv.playerthree}`}</p>
                        <p>
                          {liv.isPlayed || livescore == ""
                            ? liv.scores.slice(-1)[0].firstTeamScore
                            : livescore.teamonescore}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <p>{`${liv.playertwo}`}</p>
                      <p>
                        {liv.isPlayed || livescore == ""
                          ? liv.scores.slice(-1)[0].secondTeamScore
                          : livescore.teamtwoscore}
                      </p>
                    </div>
                    {liv.numberofplayer === "doubles" && (
                      <div className="flex gap-2">
                        <p>{`${liv.playerfour}`}</p>
                        <p>
                          {liv.isPlayed
                            ? liv.scores.slice(-1)[0].secondTeamScore
                            : livescore.teamtwoescore}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    {liv.isPlayed ? (
                      <p className="border border-green-500 px-5 py-1 text-center bg-green-500 rounded-xl">
                        {liv.winner}
                      </p>
                    ) : (
                      <div>
                        <div>
                          {livescore.status === "notStart" ||
                          livescore === "" ? (
                            <p className="border border-red-500 px-5 py-1 text-center bg-red-500 rounded-xl">
                              Not Started Yet
                            </p>
                          ) : null}
                        </div>
                        <div>
                          {livescore.status === "start" &&
                          liv.scores.length > 0 ? (
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
              ))}
            </div>
          </div>
          <div className="h-auto w-full xl:w-[40%] xs:px-5 xs:py-3 xl:py-0 flex items-center">
            <NavLink
              to="/livescore"
              className={({ isActive }) =>
                `${
                  isActive ? "opacity-70" : "opacity-100"
                } items-center cursor-pointer border py-3 w-full font-medium rounded-3xl text-base  md:text-xl scale-95 hover:scale-100 bg-white text-center`
              }
            >
              See All
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
