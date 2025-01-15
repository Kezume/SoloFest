import React from "react";
import NavbarFragment from "../fragments/NavbarFragment";
import Footer from "../fragments/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="w-full">
        <NavbarFragment />
        <div className=" container mx-auto px-5">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
