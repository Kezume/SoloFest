import { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import Button from "../elements/Button";
import Footer from "../fragments/Footer";
import SideNavFragment from "../fragments/SideNavFragment";
import { jwtDecode } from "jwt-decode";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface jwtPayload {
  email: string;
  name: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [namaUser, setNamaUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const dropDownActiveHandler = () => {
    setIsDropDownActive(!isDropDownActive);
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = jwtDecode<jwtPayload>(token);
        // Use name from token, fallback to email if name is not available
        setNamaUser(decodedToken.name || decodedToken.email || "User");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setNamaUser("User");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="flex">
        <SideNavFragment />
        <div className="secondContent w-full min-h-screen lg:ml-[280px]">
          <nav
            className=" w-full h-14 p-3  font-bold bg-white
          text-slate-600 flex items-center justify-between shadow-lg px-5"
          >
            <div></div>

            <div className="user-profile relative flex items-center gap-2 bg-secondary p-2 rounded-md text-white cursor-pointer">
              <div className="flex items-center gap-2" onClick={dropDownActiveHandler}>
                <h2>{isLoading ? "Loading..." : namaUser}</h2>
                <IoIosArrowUp className={`${isDropDownActive ? "rotate-180" : "rotate-90"} transition-all duration-300 ease-in`} />
              </div>

              <div className={`dropdown-menu absolute right-0 top-full mt-2 w-48 z-50 ${!isDropDownActive ? "hidden" : ""}`}>
                <div className="w-full bg-white shadow-lg rounded-md overflow-hidden">
                  <Button
                    type="button"
                    buttonStyle="w-full text-black flex items-center gap-2 p-3 text-slate-600 bg-white hover:bg-primary hover:text-white 
                    transition-all duration-300 ease-in-out rounded-md"
                  >
                    <IoCall />
                    Hubungi Admin
                  </Button>

                  <Button
                    type="button"
                    buttonStyle="w-full text-black flex items-center gap-2 p-3 text-slate-600 bg-white hover:bg-primary hover:text-white
                    transition-all duration-300 ease-in-out rounded-md"
                  >
                    <IoIosLogOut />
                    Keluar
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
