"use client";

import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Archive, Delete, MoreHorizontal, Loader2 } from "lucide-react";
import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

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

interface DashboardTableRef {
  handleSearch: (query: string) => void;
}

const DashboardTable = React.forwardRef<DashboardTableRef>((_, ref) => {
  const { fileList, setFileList } = useContext(FileListContext);
  const [fileList_, setFileList_] = useState<FILE[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FILE[]>([]);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (fileList) {
      setFileList_(fileList);
      setFilteredFiles(fileList);
    }
  }, [fileList]);

  const handleSearch = (query: string) => {
    const filtered = fileList_.filter((file) =>
      file.fileName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  React.useImperativeHandle(ref, () => ({
    handleSearch
  }));

  const archiveFile = useMutation(api.files.archiveFile);
  const deleteFile = useMutation(api.files.deleteFile);

  const handleArchive = async (id: Id<"files">) => {
    try {
      await archiveFile({ fileId: id });
      const updatedFiles = fileList_.filter((file) => file._id !== id);
      setFileList_(updatedFiles);
      setFilteredFiles(updatedFiles);
    } catch (error) {
      console.error("Error archiving file:", error);
    }
  };

  const handleDelete = async (id: Id<"files">) => {
    setIsDeleting(true);
    try {
      await deleteFile({ fileId: id });
      const updatedFiles = fileList_.filter((file) => file._id !== id);
      setFileList_(updatedFiles);
      setFilteredFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-8 px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto">
      <Table className="border border-gray-700 bg-neutral-900/50 rounded-lg overflow-hidden min-w-[600px]">
        <TableHeader>
          <TableRow className="border-neutral-700 hover:bg-transparent">
            <TableHead className="pl-8 md:pl-12 w-[300px] text-neutral-300 font-semibold">
              Name
            </TableHead>
            <TableHead className="text-neutral-300 font-semibold">
              Location
            </TableHead>
            <TableHead className="text-neutral-300 font-semibold">
              Author
            </TableHead>
            <TableHead className="pr-4 w-[120px] text-neutral-300 font-semibold">
              Created
            </TableHead>
            <TableHead className="pr-4 w-[50px] text-neutral-300 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles && filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <TableRow
                key={file._id}
                className={`group hover:bg-white/5 cursor-pointer border-neutral-700 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-neutral-900/50" : "bg-neutral-800/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/workspace/${file._id}`);
                }}
              >
                <TableCell className="font-medium pl-8 md:pl-12 text-white/90 group-hover:text-white">
                  {file.fileName}
                </TableCell>
                <TableCell className="text-neutral-400"></TableCell>
                <TableCell className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        user?.picture ??
                        "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
                      }
                      alt="logo"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer ring-2 ring-neutral-700"
                    />
                    <span className="text-sm text-neutral-400">You</span>
                  </div>
                </TableCell>
                <TableCell className="w-[150px] text-sm text-neutral-400">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </TableCell>
                <TableCell className="pr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                      <div className="p-1 hover:bg-neutral-600 w-fit rounded-sm cursor-pointer">
                        <MoreHorizontal size={16} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-800/95 backdrop-blur-sm gap-1 rounded-lg text-white border-neutral-700 w-48 ml-4 mt-2 shadow-xl animate-in fade-in-0 zoom-in-95">
                      <DropdownMenuItem
                        className="cursor-pointer focus:bg-neutral-700 focus:text-white hover:bg-neutral-700 transition-colors duration-200"
                        onClick={() => handleArchive(file._id)}
                      >
                        <Archive size={16} className="mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer focus:bg-red-500/90 focus:text-white hover:bg-red-500/90 hover:text-white transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(file._id);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Delete size={16} className="mr-2" />
                        )}
                        {isDeleting ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-neutral-400">
                No files found. Start by uploading a new file!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});

DashboardTable.displayName = "DashboardTable";

export default DashboardTable;