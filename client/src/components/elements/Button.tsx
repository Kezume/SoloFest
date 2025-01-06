interface ButtonProps {
  buttonStyle?: string;
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonStyle = "bg-[#7370FB] py-1 px-5 rounded-sm text-white font-bold", onClick, children, type, onSubmit, disabled }) => {
  return (
    <button type={type} className={buttonStyle} onSubmit={onSubmit} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
