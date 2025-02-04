import { Link, useLocation } from "react-router-dom";
import Title from "../../elements/Title";
import SearchBoxFragment from "../SearchBoxFragment";
import Button from "../../elements/Button";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const NavbarFragment = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isHumburgerActive, setIsHumburgerActive] = useState(false);
  const location = useLocation();
  const role = useAuth();

  const isActive = (path: string) => (location.pathname === path ? "text-primary font-bold" : "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchItem);
  };

  const humbugerMenuHanlder = () => {
    if (!isHumburgerActive) {
      setIsHumburgerActive(!isHumburgerActive);
    } else {
      setIsHumburgerActive(!isHumburgerActive);
    }
    console.log(isHumburgerActive);
  };

  const closeMenuHandler = () => {
    setIsHumburgerActive(false);
  };

  const isLogin = localStorage.getItem("jwtToken");

  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between sticky top-0 z-20 shadow-md ">
      <div className=" container mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src="images/logo.png" alt="logo" width={30} />
          <Title titleStyle="font-bold text-3xl flex gap-2 items-center z-20">SoloFest</Title>
        </div>

        {/* Mobile Menu Icons */}
        <div className="hidden mobile:block z-20">
          {isHumburgerActive ? <FaWindowClose className="text-3xl cursor-pointer" onClick={closeMenuHandler} /> : <CiMenuBurger className="text-3xl cursor-pointer" onClick={humbugerMenuHanlder} />}
        </div>

        {/* Backdrop Overlay */}
        {isHumburgerActive && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={closeMenuHandler} />}

        {/* Navigation Menu */}
        <ul
          className={`
          flex items-center justify-center gap-5
          mobile:fixed mobile:top-0 mobile:right-0 
          mobile:w-64 mobile:h-screen mobile:flex-col 
          mobile:items-start mobile:justify-start 
          mobile:pt-24 mobile:px-6 mobile:gap-8
          mobile:bg-white mobile:shadow-lg
          mobile:z-50
          ${isHumburgerActive ? "mobile:translate-x-0" : "mobile:translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          {/* Mobile Search */}
          <li className="hidden mobile:block w-full mb-4">
            <form onSubmit={handleSearch}>
              <SearchBoxFragment type="text" name="searchItem" placeholder="Cari event..." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
            </form>
          </li>

          <li className="mobile:w-full">
            <Link to={"/home"} className={`mobile:block mobile:py-2 ${isActive("/home")} hover:text-primary transition-colors`}>
              Beranda
            </Link>
          </li>

          <li className="mobile:w-full">
            <Link to={"/event"} className={`mobile:block mobile:py-2 ${isActive("/event")} hover:text-primary transition-colors`}>
              Event
            </Link>
          </li>

          <li className="mobile:w-full">
            <Link to={"/help"} className={`mobile:block mobile:py-2 ${isActive("/help")} hover:text-primary transition-colors`}>
              Bantuan
            </Link>
          </li>

          {!isLogin ? (
            <li className="mobile:w-full">
              <Link to={"/login"}>
                <Button type="submit">Masuk</Button>
              </Link>
            </li>
          ) : (
            <li className="relative mobile:w-full">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img src="images/default-avatar.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                <div className="absolute top-5 right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
                  {role.userRole === "member" && (
                    <Link to="/member/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  )}

                  {role.userRole === "event_organizer" && (
                    <Link to="/event_orgn/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem("jwtToken");
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarFragment;
