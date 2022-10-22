import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainpageHooks = () => {
  <>
    <Sidebar />
    <Outlet />
  </>;
};

export default MainpageHooks;
