import React from "react";

interface H1Props {
  children: React.ReactNode;
}
const Title: React.FC<H1Props> = ({ children }) => {
  return <h1 className="font-bold text-3xl">{children}</h1>;
};

export default Title;
