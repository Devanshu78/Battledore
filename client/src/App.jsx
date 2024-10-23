import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useService } from "./ContextAPI/axios";
import Watermark from "./components/Watermark";

function App() {
  const { token, getYourData, myData } = useService();

  useEffect(() => {
    getYourData();
  }, []);

  useEffect(() => {}, [myData]);

  return (
    <div className="">
      {token ? (
        <div>
          <div className="flex">
            <div className="relative -left-[90px] md:-left-[80px]">
              <Navbar />
            </div>
            <main className="w-full flex-1 ml-[-4rem] md:ml-[-3rem] md:mr-[2rem]">
              <Outlet />
            </main>
          </div>
          <footer className="text-center">
            <div className="opacity-50 text-5xl md:text-7xl xl:text-9xl select-none">
              <Watermark />
            </div>
            <div className="text-white font-inter text-[0.75rem] md:text-[1rem] tracking-widest">
              Maintained and developed by Eshway.
            </div>
          </footer>
        </div>
      ) : (
        <div className="text-center relative top-10 text-4xl text-white font-inter font-bold">
          <h1>401 Unauthorized to Access</h1>
        </div>
      )}
    </div>
  );
}

export default App;
