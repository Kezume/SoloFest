interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputStyle?: string;
}

const Input: React.FC<InputProps> = ({ type, name, id, placeholder, onChange, value, inputStyle }) => {
  return <input type={type} name={name} id={id} placeholder={placeholder} className={inputStyle} onChange={onChange} value={value} />;
};

export default Input;
