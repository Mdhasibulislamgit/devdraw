import { cn } from "@/lib/utils";
import { Search, Send, Share } from "lucide-react";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DashboardHeader = ({ user, onSearch }: { user: any; onSearch: (query: string) => void }) => {
  const menu = [
    {
      id: 1,
      name: "All",
    },
    
  ];

  const [selected, setSelected] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  return (
    <div className="w-full">
      <div className="pl-16 py-6 pr-10 mt-4 flex items-center gap-2">
        <div className="flex flex-1 space-x-2 font-semibold text-sm w-fit">
          {menu.map((item, index) => (
            <div
              onClick={() => setSelected(item.id)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1 text-neutral-400 hover:text-white transition duration-300 ease-in-out",
                selected === item.id &&
                  "bg-gradient-to-r from-blue-500 to-purple-500 border border-neutral-600 text-white shadow-lg"
              )}
              key={index}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* search user and share */}
        <div className="flex items-center space-x-4">
          <div className="bg-neutral-800 rounded-lg flex items-center border border-white/30 space-x-2 py-1 shadow-md">
            <Search size={16} className="ml-2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-neutral-800 text-white p-0 text-sm outline-none border-none focus:ring-0"
            />
          </div>

          <div>
            <div className="bg-blue-700 hover:bg-blue-800 cursor-pointer text-white text-sm rounded-sm flex items-center px-4 py-1 transition duration-300 ease-in-out shadow-md">
              <Send size={16} className="mr-1" />
              Invite
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;