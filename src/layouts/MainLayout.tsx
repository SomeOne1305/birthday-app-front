import Navbar from "@/components/navbar";
import ProgressBar from "@/components/progress-bar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen h-screen">
      <ProgressBar/>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default MainLayout;
