"use client";

import React, { useContext, useEffect, useState } from "react";
import SidebarTopButton, { Team } from "./SidebarTopButton";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import SideNavBottomMenu from "./SideNavBottomMenu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "../_context/FileListContext";
import { X } from "lucide-react";


interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createNewFile);

  const [activeTeam, setActiveTeam] = useState<Team | any>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const [totalArchivedFiles, setTotalArchivedFiles] = useState<Number>();

  const { fileList, setFileList } = useContext(FileListContext);

  const onFileCreate = (fileName: string) => {
    try {
      console.log(
        "payload" + JSON.stringify({ fileName, team: activeTeam.teamName })
      );
      createFile({
        fileName,
        teamId: activeTeam?._id,
        createdBy: user?.email!,
        archieved: false,
        document: "",
        whiteboard: "",
      }).then(
        (res) => {
          toast.success("File created successfully");
          getFiles();
          console.log(res);
        },
        (error) => {
          toast.error("Error creating file");
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);
  const convex = useConvex();

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });

    setFileList(result);
    setTotalFiles(result?.length);
    setTotalArchivedFiles(result?.filter((file: any) => file.archieved).length);
  };

  return (
    <div
      className={`text-white h-screen fixed sm:relative z-50 bg-neutral-900 ${
        isSidebarOpen ? "w-64 px-4" : "w-0 px-0" // Combine width and padding toggle
      } sm:w-64 sm:px-4 py-4 flex border-r border-neutral-800 flex-col transition-all duration-300 ease-in-out overflow-hidden sm:overflow-visible`} // Allow overflow on sm screens
    >
      {/* Close button for mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 sm:hidden p-1 rounded hover:bg-neutral-700"
        aria-label="Close sidebar"
      >
        < X size={20} />
      
      </button>

      {/* Content Wrapper: Ensure visibility on desktop, handle mobile visibility */}
      <div className={`flex-1 overflow-y-auto ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} sm:opacity-100 transition-opacity duration-300 delay-150`}>
        <SidebarTopButton
          user={user}
          // Pass isSidebarOpen if SidebarTopButton needs to adapt its internal layout
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
        <Button
          variant={"outline"}
          className="bg-gradient-to-r from-neutral-600 backdrop:blur-md to-neutral-700 border-neutral-800 w-full mt-10 text-left justify-start hover:bg-neutral-600 hover:border-neutral-700 hover:from-neutral-600 hover:to-neutral-700 hover:text-white"
        >
          <LayoutDashboard size={16} className="mr-2" />
          All files
        </Button>
      </div>

      {/* bottom layout */}
      <SideNavBottomMenu onFileCreate={onFileCreate} length={totalFiles} />
    </div>
  );
};

export default Sidebar;
