import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import dayjs from "dayjs";

function Events() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberofDays, setNumberofDays] = useState("");
  const [isVisble, setIsVisble] = useState(false);

  const { setEvent } = useBackendService();

  const [eventss, setEvents] = useState({
    eventTitle: "",
    eventStart: "",
    eventEnd: "",
    eventDesc: "",
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setIsVisble(!isVisble);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvents((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // calculate end date
  function addDaysToDate(date, days, format = "DD-MM-YYYY") {
    const result = dayjs(date).add(days, "day");
    return result.format(format);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = selectedDate.format("YYYY-MM-DD");
    const daysToAdd = numberofDays;
    const formattedDate = addDaysToDate(currentDate, daysToAdd);

    eventss.eventStart = selectedDate.format("DD-MM-YYYY");
    eventss.eventEnd = formattedDate;

    // trying to send backend
    setEvent(eventss);

    setIsVisble(!isVisble);
    setEvents({
      eventTitle: "",
      eventStart: "",
      eventEnd: "",
      eventDesc: "",
    });
    setNumberofDays("");
  };
  return (
    <>
      <div className="mt-20 flex justify-between">
        <h1 className="text-3xl text-white font-bold font-mono">EVENTS</h1>

        <button onClick={toggleCalendar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            id="calendar"
            fill="#e8eaed"
            className="w-8 h-8"
          >
            <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
          </svg>
        </button>
      </div>
      <div>
        {showCalendar && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={handleDateChange}
              disablePast
              className="rounded-3xl bg-white text-black absolute right-0"
            />
          </LocalizationProvider>
        )}
      </div>
      {selectedDate && isVisble && (
        <form
          id="eventbox"
          onSubmit={handleSubmit}
          className="rounded-3xl shadow-xl p-5 bg-white w-[95%] md:w-[80%] lg:w-[500px] absolute left-1/2 -translate-x-1/2 top-1/4 flex flex-col gap-5"
        >
          <h1 className="text-xl font-semibold">Event details</h1>
          <input
            type="text"
            name="eventTitle"
            value={eventss.eventTitle}
            onChange={handleChange}
            id=""
            placeholder="Name"
            className="outline-none border-b border-black px-4 py-2 mr-4 "
          />
          <div>
            <label for="days">Duration : </label>
            <select
              name="numberofDays"
              value={numberofDays}
              onChange={(e) => setNumberofDays(e.target.value)}
              id="days"
              className="border-none w-10 outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <input
            type="text"
            name="eventDesc"
            value={eventss.eventDesc}
            onChange={handleChange}
            id=""
            placeholder="Additional info"
            className="outline-none border-b border-black px-4 py-2 mr-4 "
          />
          <div className="flex justify-between px-0 md:px-4 items-center">
            <button
              className=" border-[1px] border-black px-4 py-1 rounded-2xl"
              type="submit"
            >
              Save changes
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1"
              className="cursor-pointer"
              onClick={() => setIsVisble(!isVisble)}
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </div>
        </form>
      )}
      <div className="mt-10 px-2 md:px-5">
        <ul className="flex justify-between text-base md:text-xl text-white">
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                `${isActive ? "opacity-70" : "opacity-100"} cursor-pointer`
              }
            >
              Recent
            </NavLink>
          </li>
          <li>
            <NavLink
              to="weekely"
              className={({ isActive }) =>
                `${isActive ? "opacity-70" : "opacity-100"} cursor-pointer`
              }
            >
              This week
            </NavLink>
          </li>
          <li>
            <NavLink
              to="upcoming"
              className={({ isActive }) =>
                `${isActive ? "opacity-70" : "opacity-100"} cursor-pointer`
              }
            >
              Upcoming
            </NavLink>
          </li>
        </ul>
      </div>
      <p className=" mt-3 border-b-2 w-full"></p>

      <div className="overflow-y-auto pr-6 h-3/4">
        <Outlet />
      </div>
    </>
  );
}

export default Events;
