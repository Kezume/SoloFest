import Input from "../../elements/Input";
import Label from "../../elements/Label";

interface InputFormFragmentProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const InputFormFragment: React.FC<InputFormFragmentProps> = ({ type, name, placeholder, value, onChange, children }) => {
  return (
    <>
      <Input type={type} name={name} id={name} inputStyle="w-full h-full px-2 pt-5 peer focus:outline-none" placeholder={placeholder} value={value} onChange={onChange} />
      <Label
        htmlFor={name}
        labelStyle="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 
      peer-focus:text-xs peer-focus:top-4 peer-focus:-translate-y-full
      peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:-translate-y-full"
      >
        {children}
      </Label>
    </>
  );
};

export default InputFormFragment;
