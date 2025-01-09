import React from "react";
import NavbarFragment from "../fragments/NavbarFragment";
import Footer from "../fragments/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="w-full container mx-auto px-5">
        <NavbarFragment />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
