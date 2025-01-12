import { Link } from "react-router-dom";
import Title from "../../elements/Title";
import { MdDashboard, MdEvent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

const SideNavFragment = () => {
  return (
    <nav className="sidebar w-72 bg-white h-screen shadow-lg">
      <div className="sidebar-header bg-primary text-white p-3 flex items-center justify-start">
        <Link to={"/"}>
          <Title titleStyle="text-2xl font-bold">SoloFest</Title>
        </Link>
      </div>
      <ul className="sidebar-menu p-5 flex flex-col gap-5">
        <h3 className="text-slate-800 font-bold text-xl">Dashboard Menu</h3>
        <li className="sidebar-menu-item flex-col hover:bg-gray-100 hover:p-2 transition-all duration-300 ease-in-out">
          <Link to="/profile/dashboard" className="sidebar-menu-link flex items-center gap-2">
            <MdDashboard />
            Profile Dashboard
          </Link>
        </li>
        <li className="sidebar-menu-item hover:bg-gray-100 hover:p-2 transition-all duration-300 ease-in-out">
          <Link to="/profile/event" className="sidebar-menu-link flex items-center gap-2">
            <MdEvent />
            Event
          </Link>
        </li>
        <li className="sidebar-menu-item hover:bg-gray-100 hover:p-2 transition-all duration-300 ease-in-out">
          <Link to="/profile/profile" className="sidebar-menu-link flex items-center gap-2">
            <GrTransaction />
            Transaction
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavFragment;
