import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mt-2 w-full">
      <div className="bg-[#E9F0F7] rounded-xl flex items-center px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 transition-all">
        <input
          type="text"
          placeholder="Search categories..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent flex-1 outline-none text-[15px] text-gray-800 placeholder-gray-500"
        />
        <Search className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
