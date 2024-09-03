import React, { useEffect, useState } from "react";
import { useBackendService } from "../ContextAPI/connectToBackend.jsx";

function Setting() {
  const { myData, getYourData, updateMyData } = useBackendService();
  const [isEditable, setIsEditable] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");

  function editMyDetail() {
    updateMyData({
      ...myData,
      username: updateName,
      email: updateEmail,
      jobrole: updateRole,
    });
    setIsEditable(!isEditable);
  }
  useEffect(() => {
    getYourData();
  }, []);

  useEffect(() => {
    if (myData) {
      setUpdateName(myData.username);
      setUpdateEmail(myData.email);
      setUpdateRole(myData.jobrole);
    }
  }, [myData]);

  return (
    <>
      <h1 className="text-3xl text-white font-bold mt-20 mb-5 font-inter">
        Setting
      </h1>
      <hr />
      <div>
        <div className=" mt-8 flex justify-between items-center gap-12 text-3xl font-inter">
          <div id="about_event" className="flex gap-6 w-full h-auto">
            <img className="w-36 rounded-2xl" src="../badminton.jpg" alt="" />
            <div className="text-white text-lg w-full h-auto flex flex-col gap-4">
              <p className="font-light">
                Name :{" "}
                <input
                  type="text"
                  name="username"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  readOnly={!isEditable}
                  className={`font-bold uppercase text-xl text-[#B1D848] bg-transparent outline-none ${
                    isEditable
                      ? "border border-gray-300 rounded-lg px-2"
                      : "border-transparent"
                  } `}
                />
              </p>
              <p className="font-light">
                Email :{" "}
                <input
                  type="text"
                  name="email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                  readOnly={!isEditable}
                  className={`font-bold bg-transparent outline-none ${
                    isEditable
                      ? "border border-gray-300 rounded-lg px-2"
                      : "border-transparent"
                  } `}
                />
              </p>
              <p className="font-light">
                Role :{" "}
                <input
                  type="text"
                  name="jobrole"
                  value={updateRole}
                  onChange={(e) => setUpdateRole(e.target.value)}
                  readOnly={!isEditable}
                  className={`font-bold bg-transparent outline-none  ${
                    isEditable
                      ? "border border-gray-300 rounded-lg px-2"
                      : "border-transparent"
                  } `}
                />
              </p>
            </div>
            {isEditable ? (
              <button
                onClick={() => {
                  editMyDetail();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                  className="outline-none"
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
        </div>
      </div>
    </>
  );
}

export default Setting;
