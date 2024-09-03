import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useBackendService } from "./ContextAPI/connectToBackend";

function App() {
  const { token } = useBackendService();

  return (
    <>
      {token ? (
        <div className="flex">
          <Navbar />
          <main className="relative w-3/5 h-screen">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="text-center text-4xl text-white font-inter font-bold">
          <h1>404 Error</h1>
        </div>
      )}
    </>
  );
}

export default App;
