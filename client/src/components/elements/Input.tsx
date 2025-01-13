interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputStyle?: string;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, id, placeholder, onChange, value, inputStyle, isDisabled }) => {
  return <input type={type} name={name} id={id} placeholder={placeholder} className={inputStyle} onChange={onChange} value={value} disabled={isDisabled} />;
};

export default Input;
