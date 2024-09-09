import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";

export const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  const server = String(import.meta.env.VITE_BATTLEDORE_SERVER_URL);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );
  const [eventList, setEventList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [myData, setMyData] = useState({});
  const [numberOfEvents, setNumberofEvents] = useState("");
  const [numberOfUsers, setNumberofUsers] = useState("");

  const signup = async (userData) => {
    try {
      const response = await fetch(`${server}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (user) => {
    try {
      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUserName(localStorage.setItem("username", data?.details?.username));
      setToken(data.token);
      localStorage.setItem("token", data.token);
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const forgotPassword = async (to) => {
    try {
      const response = await fetch(`${server}/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(to),
      });
      const data = await response.json();
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
      return data?.otp;
    } catch (err) {
      console.log(err.message);
    }
  };

  const newCreatedPassword = async (detail) => {
    try {
      const response = await fetch(`${server}/newcreatedpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });
      const data = await response.json();
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  };

  const gettAllUser = async () => {
    try {
      const response = await fetch(`${server}/players`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPlayerList(data.users);
      setNumberofUsers(data.users.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getYourData = async () => {
    try {
      const response = await fetch(`${server}/getmydata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMyData(data);
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateMyData = async (myData) => {
    try {
      const response = await fetch(`${server}/updatemydata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(myData),
      });
      const data = await response.json();
      setMyData(data.data);
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("username");
    return localStorage.removeItem("token");
  };

  const setEvent = async (event) => {
    try {
      const response = await fetch(`${server}/events/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      setNumberofEvents(numberOfEvents + 1);
      const data = await response.json();
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEvent = async () => {
    try {
      const response = await fetch(`${server}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEventList(data.events);
      setNumberofEvents(data.events.length);
    } catch (error) {
      console.log("Unable to fetch all events", error.message);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      const response = await fetch(`${server}/events/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumberofEvents(numberOfEvents - 1);
      const data = await response.json();
      response.ok ? toast.success(data?.message) : toast.error(data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateEvent = async (eventId, data) => {
    try {
      const updatedData = { ...data };
      delete updatedData._id;
      delete updatedData.__v;
      delete updatedData.createdAt;
      delete updatedData.updatedAt;
      const response = await fetch(`${server}/events/update/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const dt = await response.json();
      response.ok ? toast.success(dt?.message) : toast.error(dt?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <BackendContext.Provider
      value={{
        setEvent,
        signup,
        login,
        gettAllUser,
        playerList,
        numberOfUsers,
        logOut,
        token,
        userName,
        eventList,
        getEvent,
        updateEvent,
        numberOfEvents,
        setNumberofEvents,
        removeEvent,
        getYourData,
        myData,
        updateMyData,
        forgotPassword,
        newCreatedPassword,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};

export const useBackendService = () => {
  return useContext(BackendContext);
};
