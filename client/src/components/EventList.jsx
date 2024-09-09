import React, { useState, useEffect } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";

function EventList({ event, option }) {
  const { removeEvent, numberOfEvents, updateEvent } = useBackendService();

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

  return (
    <>
      <div className="md:px-5">
        <div className="mt-8 md:flex justify-between items-center gap-12">
          <div
            id="about_event"
            className="block lg:flex gap-2 lg:gap-6 w-full h-auto"
          >
            <div>
              <img
                className="w-8/12 md:w-24 lg:w-36 h-[90%] rounded-2xl"
                src="../badminton.jpg"
                alt=""
              />
            </div>
            <div className="text-white text-lg">
              <input
                type="text"
                name="eventTitle"
                className={`text-[#B1D848] bg-[#5ea0b8] font-bold outline-none ${
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
              <p>
                {event.eventStart} to {event.eventEnd}
              </p>
              <input
                type="text"
                name="eventDesc"
                className={` outline-none bg-[#5ea0b8] w-[95%] h-auto break-keep whitespace-normal border border-gray-400 ${
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
          {option ? (
            <div
              id="edit"
              className="flex gap-8 cursor-pointer mt-2 justify-end"
            >
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
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
