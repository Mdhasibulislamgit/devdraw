import React, { useState } from "react";
import {
  ArchiveIcon,
  FlagIcon,
  Github,
  LayoutDashboard,
  LucideLock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SideNavBottomMenu = ({ onFileCreate, length }: any) => {
  const menuList = [
   
    {
      id: 1,
      name: "Github",
      icon: Github,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Private Files",
      icon: LucideLock,
      link: "/dashboard",
    },
    {
      id: 3,
      name: "Archive",
      icon: ArchiveIcon,
      link: "/dashboard",
    },
  ];

  const [fileName, setFileName] = useState("Untitled File");
  const router = useRouter();

  return (
    <div className="bg-neutral-900 text-neutral-300 p-4 rounded-lg shadow-lg space-y-4">
      {/* Menu List */}
      <div className="space-y-2">
        {menuList.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(item.link)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-800 transition-colors duration-200"
          >
            <item.icon size={18} className="text-neutral-400" />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 w-full mt-4 justify-start text-neutral-300 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-neutral-800 outline-none border-none text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-neutral-50 text-xl font-bold">
              Create New File
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              Start fresh with a new file. Give it a name and get started!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300 font-medium">
                File Name
              </Label>
              <Input
                id="name"
                defaultValue={fileName}
                className="w-full bg-neutral-700 border-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 text-neutral-100 placeholder-neutral-400"
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => onFileCreate(fileName)}
                disabled={!fileName}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200 rounded-lg px-6 py-2"
              >
                Create File
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Total Files */}
      <div className="text-xs mt-4">
        <span className="font-bold">{length}</span> files created
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <Progress
          value={length}
          max={100}
          className="bg-neutral-700 h-2 rounded-full"
        
        />
      </div>
    </div>
  );
};

export default SideNavBottomMenu;
