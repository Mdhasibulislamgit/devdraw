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
    <div className="sticky top-0 z-50 border-b border-blue-500 bg-neutral-900 flex flex-col md:flex-row items-center px-3 py-1.5 md:py-2 w-full min-h-[56px]">
      {/* Mobile: Logo, Filename, Actions */}
      <div className="flex items-center justify-between w-full md:w-auto mb-1.5 md:mb-0">
        <div className="flex items-center space-x-1.5">
          <Link href="/dashboard" className="flex items-center space-x-1.5">
            <img
              src="/logo.png"
              alt="logo"
              className="w-9 h-9 md:w-10 md:h-10 rounded-md border border-neutral-700"
            />
            <div>
              <h1 className="text-xs mr-2 font-semibold text-neutral-100 truncate max-w-[100px] md:max-w-[180px]">
                {file ? file.fileName : "Untitled"}
              </h1>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 ml-4 rounded-md hover:bg-neutral-800 outline-none hover:text-neutral-100 cursor-pointer transition-colors">
              <MoreHorizontal size={18} className="text-neutral-400 ml-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-800 border border-neutral-700 shadow-lg rounded-md w-44">
              <DropdownMenuItem className="cursor-pointer text-xs text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700 py-1.5">
                <Archive size={14} className="mr-1.5 text-neutral-400" />
                Move to Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-xs text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700 py-1.5">
                <Link className="flex items-center" href="/dashboard">
                  <LayoutDashboard
                    size={14}
                    className="mr-1.5 text-neutral-400"
                  />
                  Go To Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile: Save Button and Hamburger Menu */}
        <div className="flex items-center space-x-1.5 md:hidden">
          <div
            onClick={() => onSave()}
            className="rounded-md flex items-center bg-green-600 hover:bg-green-700 text-white cursor-pointer px-2.5 py-1 text-xs transition-colors"
          >
            <Save size={14} className="mr-0.5" />
            Save
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-neutral-800 outline-none hover:text-neutral-100 cursor-pointer transition-colors"
            >
              <Menu size={18} className="text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-800 border border-neutral-700 shadow-lg rounded-md w-44">
              <DropdownMenuItem className="cursor-pointer text-xs text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700 py-1.5">
                <Coffee size={14} className="mr-1.5 text-neutral-400" />
                Buy me a coffee
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/workspace/${file._id}`
                  );
                  toast.success("Link Copied");
                }}
                className="cursor-pointer text-xs text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700 py-1.5"
              >
                <Link2 size={14} className="mr-1.5 text-neutral-400" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-xs text-neutral-200 hover:bg-neutral-700 focus:bg-neutral-700 py-1.5">
                <Info size={14} className="mr-1.5 text-neutral-400" />
                Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile: Tabs */}
      <div className="w-full md:hidden">
        <div className="bg-neutral-800 rounded-lg p-1">
          <div className="flex items-center space-x-0.5">
            {Tabs.map((tab: any) => (
              <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={cn(
                  "cursor-pointer flex-1 text-xs text-center px-2.5 py-1.5 rounded-md transition-colors",
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

      {/* Desktop: Full Layout */}
      <div className="hidden md:flex w-full items-center justify-between px-3">
        {/* Middle Section - Tabs */}
        <div className="flex-grow max-w-2xl mx-auto">
          <div className="bg-neutral-800 rounded-lg p-1">
            <div className="flex items-center space-x-0.5">
              {Tabs.map((tab: any) => (
                <div
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={cn(
                    "cursor-pointer flex-1 text-xs text-center px-5 py-1.5 rounded-md transition-colors",
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

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          <div
            onClick={() => onSave()}
            className="rounded-md flex items-center bg-green-600 hover:bg-green-700 text-white cursor-pointer px-3 py-1.5 text-xs transition-colors"
          >
            <Save size={14} className="mr-0.5" />
            Save
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/workspace/${file._id}`
              );
              toast.success("Link Copied");
            }}
            className="rounded-md flex items-center bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-3 py-1.5 text-xs transition-colors"
          >
            <Link2 size={14} className="mr-0.5" />
            Share
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="rounded-md hover:bg-neutral-800 text-red-700 hover:text-neutral-100 cursor-pointer p-1.5 transition-colors">
                <Info size={18} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 bg-neutral-800 border border-neutral-700 shadow-lg rounded-md">
              <div className="grid gap-3 p-1.5">
                <div className="space-y-1.5">
                  <h1 className="text-xs font-semibold text-neutral-100">
                    Info
                  </h1>
                  <p className="text-xs text-red-600">
                    Don’t forget to save, or you may lose your assets. Also, if
                    the canvas design isn’t visible in both tabs, switch to the
                    full canvas tab and return to the both section.
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
