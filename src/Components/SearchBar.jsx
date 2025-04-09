import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mt-2 bg-[#C7D7E3] rounded-lg flex items-center px-3 py-1 w-full">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent flex-1 outline-none text-base text-black font-['Times_New_Roman'] placeholder-black"
      />
      <Search className="w-5 h-5 text-black" />
    </div>
  );
};

export default SearchBar;
