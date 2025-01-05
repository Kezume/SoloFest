interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ type, name, id, placeholder, onChange, value }) => {
  return <input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} value={value} />;
};

export default Input;
