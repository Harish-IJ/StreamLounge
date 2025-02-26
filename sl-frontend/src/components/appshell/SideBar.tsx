import { Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="m-4">
      <Outlet />
    </div>
  );
};

export default SideBar;
