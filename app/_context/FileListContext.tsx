"use client";

import { Id } from "@/convex/_generated/dataModel";
import { createContext, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export interface FILE {
  _id: Id<"files">;
  fileName: string;
  createdBy: string;
  _creationTime: string;
  archieved: boolean;
  teamId: string;
  document: string;
  whiteboard: string;
}

interface FileListContextType {
  fileList: FILE[];
  setFileList: React.Dispatch<React.SetStateAction<FILE[]>>;
  refreshFiles: () => void;
}

export const FileListContext = createContext<FileListContextType>({
  fileList: [],
  setFileList: () => {},
  refreshFiles: () => {},
});

export function FileListProvider({ children, teamId }: { children: React.ReactNode; teamId: string }) {
  const [fileList, setFileList] = useState<FILE[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Query files from Convex
  const files = useQuery(api.files.getFiles, { teamId });

  // Update file list when query results change
  useEffect(() => {
    if (files) {
      setFileList(files as FILE[]);
    }
  }, [files, refreshTrigger]);

  const refreshFiles = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <FileListContext.Provider value={{ fileList, setFileList, refreshFiles }}>
      {children}
    </FileListContext.Provider>
  );
}
