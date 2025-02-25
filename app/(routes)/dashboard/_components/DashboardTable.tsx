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
import { Archive, Delete, MoreHorizontal, Loader2, File } from "lucide-react";
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
    handleSearch,
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
    <div className="mt-4 sm:mt-8 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto">
      <Table className="border border-gray-700 bg-neutral-900/70 rounded-lg overflow-hidden shadow-md w-full min-w-[320px]">
        <TableHeader>
          <TableRow className="bg-neutral-800/90">
            <TableHead className="pl-3 sm:pl-6 md:pl-10 text-left text-xs sm:text-sm text-gray-300 font-semibold">
              File Name
            </TableHead>
            <TableHead className="hidden sm:table-cell text-left text-xs sm:text-sm text-gray-300 font-semibold">
              Author
            </TableHead>
            <TableHead className="hidden sm:table-cell text-left text-xs sm:text-sm text-gray-300 font-semibold">
              Created
            </TableHead>
            <TableHead className="text-right pr-4 sm:pr-16 text-xs sm:text-sm text-gray-300 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles && filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <TableRow
                key={file._id}
                className={`group cursor-pointer hover:bg-neutral-800/80 border-b border-gray-700 transition-colors ${
                  index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/workspace/${file._id}`);
                }}
              >
                <TableCell className="pl-3 sm:pl-6 md:pl-10 py-3 sm:py-4 text-gray-200 font-medium flex items-center">
                  <File size={18} className="mr-2 text-green-500 flex-shrink-0" />
                  <span className="truncate">{file.fileName}</span>
                </TableCell>
                <TableCell className="hidden sm:table-cell py-3 sm:py-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        user?.picture ??
                        "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
                      }
                      alt="user"
                      className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover border border-gray-600"
                    />
                    <span>You</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell py-3 sm:py-4 text-xs sm:text-sm text-gray-400">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </TableCell>
                <TableCell className="py-3 sm:py-4 pr-2 sm:pr-8 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-1.5 sm:p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors shadow-md focus:outline-none mr-2 sm:mr-8"
                        aria-label="Actions"
                      >
                        <MoreHorizontal size={16} className="text-gray-300 sm:size-[18px]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-800 text-gray-200 rounded-lg shadow-lg border border-gray-700 w-36 sm:w-40">
                      <DropdownMenuItem
                        className="flex items-center gap-2 py-2.5 sm:p-3 px-3 hover:bg-green-600 hover:text-white rounded-md transition-colors"
                        onClick={() => handleArchive(file._id)}
                      >
                        <Archive size={14} className="text-green-400 sm:size-4" />
                        <span className="text-sm">Archive</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`flex items-center gap-2 py-2.5 sm:p-3 px-3 rounded-md transition-colors ${
                          isDeleting
                            ? "cursor-not-allowed bg-red-500/70 text-white"
                            : "hover:bg-red-600 hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(file._id);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin text-gray-200" />
                        ) : (
                          <Delete size={14} className="text-red-400 sm:size-4" />
                        )}
                        <span className="text-sm">{isDeleting ? "Deleting..." : "Delete"}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-gray-400">
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
