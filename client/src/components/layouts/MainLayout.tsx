import React from "react";
import NavbarFragment from "../fragments/NavbarFragment";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container m-auto">
      <NavbarFragment />
      {children}
    </div>
  );
};

export default MainLayout;
