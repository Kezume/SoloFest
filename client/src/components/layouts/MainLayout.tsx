import React from "react";
import NavbarFragment from "../fragments/NavbarFragment";
import Footer from "../fragments/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="container px-20">
        <NavbarFragment />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
