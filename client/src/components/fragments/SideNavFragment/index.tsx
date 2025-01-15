import { Link } from "react-router-dom";
import Title from "../../elements/Title";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const memberMenuItem = [
  {
    title: "Profile Dashboard",
    icon: <MdDashboard />,
    link: "/member/dashboard",
  },

  {
    title: "Transaction",
    icon: <GrTransaction />,
    link: "/member/history-payment",
  },
];

const SideNavFragment = () => {
  const role = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg lg:hidden hover:bg-primary/90">
        <HiMenuAlt2 size={24} />
      </button>

      <nav className={`sidebar fixed top-0 left-0 w-[280px] min-h-screen bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="sidebar-header bg-primary text-white py-4 px-6 flex items-center justify-between border-b border-primary/10">
          <Link to={"/"}>
            <Title titleStyle="text-2xl font-bold hover:opacity-80 transition-opacity">SoloFest</Title>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-white hover:opacity-80">
            <HiMenuAlt2 size={24} />
          </button>
        </div>
        <div className="sidebar-content p-6">
          <h3 className="text-slate-800 font-bold text-xl mb-6">Dashboard Menu</h3>
          <ul className="flex flex-col gap-3">
            {role.userRole === "member" &&
              memberMenuItem.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-primary" onClick={() => window.innerWidth < 1024 && setIsOpen(false)}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideNavFragment;
