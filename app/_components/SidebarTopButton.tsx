"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Plus, Settings } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export interface Team {
  _id: Id<"teams">;
  teamName: string;
  createdBy: string;
}

const SidebarTopButton = ({ user, setActiveTeamInfo }: any) => {
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const deleteTeamMutation = useMutation(api.teams.deleteTeam);

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/team/create",
      icon: <Plus size={16} className="mr-2" />,
    },
    {
      id: 2,
      name: "Settings",
      path: "/settings",
      icon: <Settings size={16} className="mr-2" />,
    },
  ];

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email!,
    });
    setTeamList(result as Team[]);
    setActiveTeam(result[0]);
    return result;
  };

  useEffect(() => {
    if (user) {
      getTeamList();
    }
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    }
  }, [activeTeam]);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild className="outline-none">
        <div
          className={cn(
            "flex items-center w-full gap-2 cursor-pointer rounded-md px-3 py-2 mt-4 ml-2 transition-colors duration-200",
            isOpen ? "bg-neutral-500" : "bg-neutral-600",
            { "ring-2 ring-neutral-600": isOpen }
          )}
        >
          <img
            src={
              user?.picture ??
              "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
            }
            alt="user picture"
            className="rounded-full h-8 w-8 object-cover"
          />
          <p className="text-sm font-medium">
            {user?.given_name}
          </p>
          <ChevronDown size={20} className="text-neutral-300" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-800 rounded-lg text-white border border-neutral-700 w-60 ml-4 mt-2 shadow-lg">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 p-3 border-b border-neutral-700">
          <img
            src={
              user?.picture ??
              "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
            }
            alt="user picture"
            className="rounded-full h-10 w-10 object-cover"
          />
          <div>
            <p className="text-sm font-medium">
              {user?.given_name + " " + user?.family_name}
            </p>
            <p className="text-xs text-neutral-400">{user?.email}</p>
          </div>
        </div>

        <div className="py-2">
          {/* Team List */}
          {teamList.map((team) => (
            <div key={team._id} className="flex items-center justify-between px-3">
              <DropdownMenuItem
                onClick={() => setActiveTeam(team)}
                className={cn(
                  "flex-1 cursor-pointer py-2 rounded-md text-sm transition-colors duration-200",
                  activeTeam?.teamName === team.teamName
                    ? "bg-neutral-700 text-white"
                    : "hover:bg-neutral-700"
                )}
              >
                {team.teamName}
              </DropdownMenuItem>
              <button
                aria-label={`Delete team ${team.teamName}`}
                title={`Delete team ${team.teamName}`}
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    await deleteTeamMutation({ teamId: team._id });
                    toast.success("Team deleted successfully");
                    // If the deleted team was active, set active team to first in list
                    if (activeTeam?._id === team._id) {
                      const newTeamList = teamList.filter(t => t._id !== team._id);
                      setActiveTeam(newTeamList[0]);
                    }
                    getTeamList();
                  } catch (error) {
                    toast.error("Error deleting team");
                    console.error(error);
                  }
                }}
                className="p-1.5 hover:bg-red-500/20 rounded-md group"
              >
                <Trash2 size={16} className="text-neutral-400 group-hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-neutral-700" />

        {/* Menu Items */}
        <div className="py-2">
          {menu.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => router.push(item.path)}
              className="cursor-pointer px-3 py-2 rounded-md text-sm hover:bg-neutral-700 transition-colors duration-200"
            >
              {item.icon}
              {item.name}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-neutral-700" />

        {/* Logout */}
        <LogoutLink>
          <DropdownMenuItem className="cursor-pointer px-3 py-2 rounded-md text-sm hover:bg-neutral-700 transition-colors duration-200">
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarTopButton;
