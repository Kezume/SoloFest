import { Link } from "react-router-dom";
import Title from "../../elements/Title";
import SearchBoxFragment from "../SearchBoxFragment";
import Button from "../../elements/Button";
import { useState } from "react";

const NavbarFragment = () => {
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchItem);
  };

  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between">
      <Title>SoloFest</Title>
      <ul className="navbItem flex items-center justify-center gap-5">
        <li>
          <Link to={"/"}>Beranda</Link>
        </li>

        <li>
          <Link to={"/"}>Event</Link>
        </li>

        <li>
          <Link to={"/"}>Tentang</Link>
        </li>

        <li>
          <Link to={"/"}>Bantuan</Link>
        </li>

        <li>
          <form onSubmit={handleSearch}>
            <SearchBoxFragment type="text" name="searchItem" placeholder="Cari event apa nih?" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
          </form>
        </li>

        <li>
          <Button type="submit">Masuk</Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarFragment;
