import React from "react";
import Input from "../../elements/Input";
import { FaSearch } from "react-icons/fa";

interface SearchBoxFragmentProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBoxFragment: React.FC<SearchBoxFragmentProps> = ({ type, name, placeholder, value, onChange }) => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-1 bg-white rounded-sm text-slate-700 border-b-2">
      <FaSearch className="text-[#7370FB]" />
      <Input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBoxFragment;
