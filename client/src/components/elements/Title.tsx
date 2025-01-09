import React from "react";

interface H1Props {
  children: React.ReactNode;
  titleStyle?: string;
}
const Title: React.FC<H1Props> = ({ children, titleStyle = "font-bold text-3xl" }) => {
  return <h1 className={titleStyle}>{children}</h1>;
};

export default Title;
