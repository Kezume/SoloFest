import { Link } from "react-router-dom";
import Title from "../../elements/Title";
import SearchBoxFragment from "../SearchBoxFragment";
import Button from "../../elements/Button";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

const NavbarFragment = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isHumburgerActive, setIsHumburgerActive] = useState(false);

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

  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between  relative">
      <Title titleStyle="font-bold text-3xl flex gap-2 items-center z-20">SoloFest</Title>

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
          <Link to={"/"} className="mobile:block mobile:py-2 hover:text-primary transition-colors">
            Beranda
          </Link>
        </li>

        <li className="mobile:w-full">
          <Link to={"/"} className="mobile:block mobile:py-2 hover:text-primary transition-colors">
            Event
          </Link>
        </li>

        <li className="mobile:w-full">
          <Link to={"/"} className="mobile:block mobile:py-2 hover:text-primary transition-colors">
            Tentang
          </Link>
        </li>

        <li className="mobile:w-full">
          <Link to={"/"} className="mobile:block mobile:py-2 hover:text-primary transition-colors">
            Bantuan
          </Link>
        </li>

        <li className="mobile:hidden">
          <form onSubmit={handleSearch}>
            <SearchBoxFragment type="text" name="searchItem" placeholder="Cari event apa nih?" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
          </form>
        </li>

        <li className="mobile:w-full">
          <Link to={"/login"}>
            <Button type="submit">Masuk</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarFragment;
