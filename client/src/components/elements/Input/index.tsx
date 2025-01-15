import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ inputStyle, className, ...props }) => {
  return <input className={className || inputStyle} {...props} />;
};

export default Input;
