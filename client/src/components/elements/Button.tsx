interface ButtonProps {
  buttonStyle?: string;
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ buttonStyle = "bg-[#7370FB] py-1 px-5 rounded-sm text-white font-bold", children, type, onSubmit }) => {
  return (
    <button type={type} className={buttonStyle} onSubmit={onSubmit}>
      {children}
    </button>
  );
};

export default Button;
