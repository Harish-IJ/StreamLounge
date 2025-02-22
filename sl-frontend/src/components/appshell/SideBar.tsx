import { Outlet } from "react-router-dom";
import NavCard from "./NavCard";

const SideBar = () => {
  return (
    <div className="m-4">
      <Outlet />
    </div>
  );
};

export default SideBar;
