"use client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Archive,
  Coffee,
  Info,
  LayoutDashboard,
  Link2,
  MoreHorizontal,
  Save,
  Menu,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const WorkSpaceHeader = ({
  Tabs,
  setActiveTab,
  activeTab,
  onSave,
  file,
}: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800 bg-neutral-900 h-auto md:h-16 flex flex-col md:flex-row items-center px-4 md:px-8 py-2 w-full">
      {/* Mobile: First Line - Logo, Filename, 3-dot Menu, Save Button */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex space-x-3 items-center">
          <Link href="/dashboard" className="flex space-x-2 items-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-15 h-15 md:w-12 md:h-12 rounded-lg border border-neutral-700"
            />
            <div>
              <h1 className="text-xs font-semibold text-neutral-100">
                {file ? file.fileName : "Untitled"}
              </h1>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg hover:bg-neutral-800 outline-none hover:text-neutral-100 cursor-pointer p-2 transition-colors">
              <MoreHorizontal size={18} className="text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-800 border border-neutral-700 shadow-lg rounded-lg w-48">
              <DropdownMenuItem className="cursor-pointer text-sm text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700">
                <Archive size={16} className="mr-2 text-neutral-400" />
                Move to Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-sm text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700">
                <Link className="flex items-center" href="/dashboard">
                  <LayoutDashboard
                    size={16}
                    className="mr-2 text-neutral-400"
                  />
                  Go To Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile: Save Button */}
        <div
          onClick={() => onSave()}
          className="rounded-lg flex text-sm items-center bg-green-600 hover:bg-green-700 text-white cursor-pointer px-3 py-1.5 transition-colors md:hidden"
        >
          <Save size={16} className="mr-2" />
          Save
        </div>

        {/* Mobile: Hamburger Menu for Additional Actions */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg hover:bg-neutral-800 outline-none hover:text-neutral-100 cursor-pointer p-2 transition-colors"
            >
              <Menu size={18} className="text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-800 border border-neutral-700 shadow-lg rounded-lg w-48">
              <DropdownMenuItem className="cursor-pointer text-sm text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700">
                <Coffee size={16} className="mr-2 text-neutral-400" />
                Buy me a coffee
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/workspace/${file._id}`
                  );
                  toast.success("Link Copied");
                }}
                className="cursor-pointer text-sm text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700"
              >
                <Link2 size={16} className="mr-2 text-neutral-400" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-sm text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700">
                <Info size={16} className="mr-2 text-neutral-400" />
                Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile: Second Line - Tabs */}
      <div className="flex items-center mt-3 w-full md:hidden">
        <div className="bg-neutral-800 rounded-xl p-1.5 w-full">
          <div className="flex items-center justify-between space-x-1">
            {Tabs.map((tab: any) => (
              <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={cn(
                  "cursor-pointer flex-1 text-sm text-center px-4 py-2 rounded-lg transition-colors",
                  {
                    "bg-neutral-700 text-neutral-100 font-medium shadow-inner":
                      tab.name === activeTab,
                  },
                  {
                    "text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100":
                      tab.name !== activeTab,
                  }
                )}
              >
                <h1>{tab.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Divide into Three Sections */}
      <div className="hidden md:flex w-full justify-between items-center">
        {/* Left Section */}
        {/* <div className="flex items-center space-x-3">
          <a
            href="#"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg flex text-sm items-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 cursor-pointer px-4 py-2.5 transition-colors"
          >
            <Coffee size={16} className="mr-2" />
            Buy me a coffee
          </a>
        </div> */}

        {/* Middle Section - Tabs */}
        <div className="flex items-center mx-auto flex-grow justify-center max-w-2xl w-full">
          <div className="bg-neutral-800 rounded-xl p-1.5 w-full">
            <div className="flex items-center justify-between space-x-1">
              {Tabs.map((tab: any) => (
                <div
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={cn(
                    "cursor-pointer flex-1 text-sm text-center px-6 py-2.5 rounded-lg transition-colors",
                    {
                      "bg-neutral-700 text-neutral-100 font-medium shadow-inner":
                        tab.name === activeTab,
                    },
                    {
                      "text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100":
                        tab.name !== activeTab,
                    }
                  )}
                >
                  <h1>{tab.name}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex space-x-3 items-center">
          <div
            onClick={() => onSave()}
            className="rounded-lg flex text-sm items-center bg-green-600 hover:bg-green-700 text-white cursor-pointer px-4 py-2.5 transition-colors"
          >
            <Save size={16} className="mr-2" />
            Save
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/workspace/${file._id}`
              );
              toast.success("Link Copied");
            }}
            className="rounded-lg flex text-sm items-center bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2.5 transition-colors"
          >
            <Link2 size={16} className="mr-2" />
            Share
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="rounded-lg hover:bg-neutral-800 text-red-700 hover:text-neutral-100 cursor-pointer p-1 transition-colors">
                <Info size={25} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-neutral-800 border border-neutral-700 shadow-lg rounded-lg">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h1 className="text-sm font-semibold text-neutral-100">
                    Info
                  </h1>
                  <p className="text-md text-red-600">
                    Don't forget to save, or you may lose your assets. also sometime you may not see canvas design in both, then go to full canvas tab and come back into both section.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
