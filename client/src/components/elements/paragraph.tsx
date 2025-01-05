import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className = "text-slate-400" }) => {
  return <p className={className}>{children}</p>;
};

export default Paragraph;
