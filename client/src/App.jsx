import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useBackendService } from "./ContextAPI/connectToBackend";

function App() {
  const { token, getYourData, myData } = useBackendService();

  useEffect(() => {
    getYourData();
  }, []);

  useEffect(() => {}, [myData]);

  return (
    <>
      {token ? (
        <div className="flex relative h-screen w-[125%] xs:w-[120%] sm:w-[115%] md:w-[100%] -left-[90px] md:-left-[80px] gap-2 md:gap-10">
          <Navbar />
          <main className="relative w-full h-screen px-4">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="text-center relative top-10 text-4xl text-white font-inter font-bold">
          <h1>401 Unauthorized to Access</h1>
        </div>
      )}
    </>
  );
}

export default App;
