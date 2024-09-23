import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function Home() {
  const { myData, getEvents, getScoresData } = useBackendService();

  const [livescore, setLiveScore] = useState([]);
  const [events, setEvent] = useState([]);

  const getData = async () => {
    const eve = await getEvents();
    setEvent(eve);
    const res = await getScoresData();
    setLiveScore(res);
  };

  const secondLast = livescore.length - 2;

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

  useEffect(() => {
    getData();
  }, []);

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
        <div className=" border-4 border-[#7CB6CB] w-[98%] xs:w-[85%] sm:w-[80%] min-h-[200px] sm:min-h-[350px] rounded-[30px] md:rounded-[60px] lg:rounded-[75px] px-3 md:p-5 lg:p-10 py-2 flex justify-between flex-col xl:flex-row gap-1 xs:gap-0">
          <div className="w-auto xl:w-[80%]">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-white text-wrap">
              Events
            </h1>
            <div className="text-white px-1 sm:px-5 mt-2">
              {recentEvents.slice(0, 3).map((event) => (
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
        <div className="border-4 border-[#7CB6CB] w-[98%] xs:w-[85%] sm:w-[80%] min-h-[200px] sm:min-h-[350px] rounded-[30px] md:rounded-[60px] lg:rounded-[75px] px-3 py-2 md:p-5 lg:p-10 flex justify-between flex-col xl:flex-row gap-1 xs:gap-0">
          <div className="w-auto xl:w-[80%] rounded-3xl xl:rounded-[50px] bg-[#7CB6CB] p-2">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-white px-4">
              Live Score
            </h1>
            <div className="text-white px-5 mt-2">
              {livescore.slice(secondLast).map((liv) => (
                <div
                  key={liv._id}
                  className="text-[0.7rem] xs:text-sm sm:text-lg lg:text-xl"
                >
                  <div className="flex gap-2">
                    <h1 className="text-[#B1D848] font-bold">{`${liv.firstTeamName}`}</h1>
                    <h1 className="text-[#B1D848] font-bold">{`${liv.secondTeamName}`}</h1>
                  </div>
                  <div className="flex gap-2">
                    <p>{`${liv.playerone}`}</p>
                    <p>{`${liv.firstTeamScore}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <p>{`${liv.playertwo}`}</p>
                    <p>{`${liv.secondTeamScore}`}</p>
                  </div>
                  {liv.numberofplayer === "doubles" ? (
                    <div>
                      <div className="flex gap-2">
                        <p>{`${liv.playerthree}`}</p>
                        <p>{`${liv.secondTeamScore}`}</p>
                      </div>
                      <div className="flex gap-2">
                        <p>{`${liv.playerfour}`}</p>
                        <p>{`${liv.secondTeamScore}`}</p>
                      </div>
                    </div>
                  ) : null}
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
