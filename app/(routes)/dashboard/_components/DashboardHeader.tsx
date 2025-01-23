import { Search } from "lucide-react";
import React, { useState } from "react";
import MyAvatar from "@/app/_components/MyAvatar";

interface DashboardHeaderProps {
  onSearch: (query: string) => void;
}

const DashboardHeader = ({
  onSearch,
}: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-full bg-neutral-900 py-6 px-10">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-neutral-800 rounded-full flex items-center border border-blue-500/70 hover:border-blue-500 focus-within:border-blue-500 transition duration-300 ease-in-out space-x-3 py-2 px-5 shadow-md w-full max-w-lg">
            <Search size={18} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search documents"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-neutral-800 text-white text-sm w-full outline-none border-none focus:ring-0"
            />
          </div>
        </div>
        {/* Avatar Section */}
        <div className="ml-4">
          <MyAvatar />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
