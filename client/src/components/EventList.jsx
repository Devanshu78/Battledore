import React, { useState, useEffect } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function EventList({ event }) {
  const Naviagte = useNavigate();
  const { removeEvent, numberOfEvents, updateEvent, myData } =
    useBackendService();

  const today = dayjs().format("DD-MM-YYYY");

  useEffect(() => {
    removeEvent;
  }, [numberOfEvents]);

  const [isEditable, setIsEditable] = useState(false);
  const [updateName, setUpdateName] = useState(event.eventTitle);
  const [updateDesc, setUpdateDesc] = useState(event.eventDesc);

  function editEventDetail() {
    updateEvent(event._id, {
      ...event,
      eventTitle: updateName,
      eventDesc: updateDesc,
    });
    setIsEditable(!isEditable);
  }

  function startGame() {
    Naviagte(`/game/${event._id}`);
  }

  return (
    <>
      <div className="px-0 md:px-5">
        <div className="mt-3 sm:mt-8 md:flex justify-between items-center gap-12">
          <div
            id="about_event"
            className="xs:flex lg:items-center gap-2 lg:gap-6 w-full h-auto"
          >
            <div>
              <img
                className="w-24 lg:w-36 h-auto rounded-2xl"
                src="../badminton.jpg"
                alt=""
              />
            </div>
            <div className="text-white text-sm md:text-base lg:text-lg 2xl:text-xl">
              <input
                type="text"
                name="eventTitle"
                className={`text-[#B1D848] bg-transparent font-bold outline-none w-full ${
                  isEditable
                    ? "border border-gray-300 rounded-lg px-2"
                    : "border-transparent"
                } `}
                value={updateName}
                onChange={(e) => {
                  setUpdateName(e.target.value);
                }}
                readOnly={!isEditable}
              />
              <div className="flex flex-col sm:flex-row sm:gap-2 sm:text-nowrap">
                <span>{event.eventStart} </span> <span>{event.eventEnd}</span>
              </div>
              <input
                type="text"
                name="eventDesc"
                className={` outline-none bg-transparent w-full h-auto break-keep whitespace-normal border border-gray-400 ${
                  isEditable
                    ? "border border-gray-300 rounded-lg px-2"
                    : "border-transparent"
                } no-scrollbal overscroll-none  resize-none `}
                value={updateDesc}
                onChange={(e) => setUpdateDesc(e.target.value)}
                readOnly={!isEditable}
              />
            </div>
          </div>
          {myData.isUmpire && (
            <div
              id="edit"
              className="flex gap-8 cursor-pointer mt-2 justify-end"
            >
              <div>
                {today === event.eventStart ? (
                  <button
                    onClick={startGame}
                    className="border rounded-xl py-2 px-5 bg-green-500 hover:bg-green-600 text-white font-inter font-bold"
                  >
                    Start
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              {myData.isOperator && (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      removeEvent(event._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                  {isEditable ? (
                    <button
                      onClick={() => {
                        editEventDetail();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditable((prev) => !prev);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
