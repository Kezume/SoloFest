import Input from "../elements/Input";
import Label from "../elements/Label";

interface InputFormFragmentProps {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  children: React.ReactNode;
  options?: Array<{ value: string; label: string }>;
  isDisabled?: boolean;
}

const InputFormFragment: React.FC<InputFormFragmentProps> = ({ type, name, placeholder, value, onChange, children, options, isDisabled }) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <div className="relative h-full w-full">
            <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-full h-full pt-7 px-2 peer focus:outline-none resize-none" />
            <Label htmlFor={name} labelStyle="absolute left-2 top-2 text-xs text-gray-500">
              {children}
            </Label>
          </div>
        );
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-full pt-5 peer focus:outline-none appearance-none" // Added appearance-none
          >
            <option value="" disabled>
              Pilih {children}
            </option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            inputStyle="w-full h-full pt-5 peer focus:outline-none"
            isDisabled={isDisabled}
          />
        );
    }
  };

  const getInputHeight = () => {
    if (type === "textarea") {
      return "min-h-[120px]";
    }
    return "h-[4rem]";
  };

  return (
    <div className={`inputBox w-full ${getInputHeight()} border-2 relative rounded-md overflow-hidden ${type === "textarea" ? "p-0" : "px-2"}`}>
      {type === "textarea" ? (
        renderInput()
      ) : (
        <>
          {renderInput()}
          <Label
            htmlFor={name}
            labelStyle="absolute left-2 top-4 text-gray-500 transition-all duration-200 
            peer-focus:text-xs peer-focus:-translate-y-2
            peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-2"
          >
            {children}
          </Label>
        </>
      )}
    </div>
  );
};

export default InputFormFragment;
