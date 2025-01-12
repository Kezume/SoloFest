import { useState } from "react";
import { IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import Button from "../elements/Button";
import Footer from "../fragments/Footer";
import SideNavFragment from "../fragments/SideNavFragment";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const dropDownActiveHandler = () => {
    setIsDropDownActive(!isDropDownActive);
  };
  return (
    <>
      <div className="flex">
        <SideNavFragment />
        <div className="secondContent w-full h-screen">
          <nav
            className=" w-full h-14 p-3  font-bold bg-white
          text-slate-600 flex items-center justify-between shadow-lg px-5"
          >
            <div>
              <h1>Profile Dashboard</h1>
            </div>

            <Button type="button" buttonStyle="user-profile relative flex items-center gap-2 bg-secondary p-2 rounded-md text-white" onClick={dropDownActiveHandler}>
              <h2>Kevien Ollyvie Jolanda</h2>
              <IoIosArrowUp className={`${isDropDownActive ? "rotate-180" : "rotate-90"} transition-all duration-300 ease-in`} />
              <div className="dropdown-menu w-full absolute -bottom-[9.5rem] left-0 overflow-hidden ">
                <div className={` w-full bg-white ${!isDropDownActive ? "-translate-y-[10rem]" : "-translate-y-0"} transition-all duration-300 ease-in bg-white shadow-lg rounded-md overflow-hidden`}>
                  <Button
                    type="button"
                    buttonStyle="w-full h-1/2  text-black flex items-center gap-2 p-3 text-slate-600 bg-white hover:bg-primary hover:text-white 
                  transition-all duration-300 ease-in-out rounded-md
                  "
                  >
                    <IoCall />
                    Hubungi Admin
                  </Button>
                  <Button
                    type="button"
                    buttonStyle="w-full h-1/2  text-black flex items-center gap-2 p-3 text-slate-600 bg-white hover:bg-primary hover:text-white
                  transition-all duration-300 ease-in-out rounded-md
                  "
                  >
                    <TbRosetteDiscountFilled />
                    Kode Voucher
                  </Button>

                  <Button
                    type="button"
                    buttonStyle="w-full h-1/2  text-black flex items-center gap-2 p-3 text-slate-600 bg-white hover:bg-primary hover:text-white
                  transition-all duration-300 ease-in-out rounded-md
                  "
                  >
                    <IoIosLogOut />
                    Keluar
                  </Button>
                </div>
              </div>
            </Button>
          </nav>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
