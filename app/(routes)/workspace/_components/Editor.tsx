"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJs, {
  OutputData,
  ToolConstructable,
  BlockToolConstructable,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CheckList from "@editorjs/checklist";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/DashboardTable";

interface EditorProps {
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
  holderId: string;
  onChange?: (data: OutputData) => void;
}

const Editor: React.FC<EditorProps> = ({
  onSaveTrigger,
  fileId,
  fileData,
  holderId,
  onChange,
}) => {
  const editorRef = useRef<EditorJs | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateDocument = useMutation(api.files.updateDocument);

  // Initialize the editor when fileData is available and the editor isn't initialized yet.
  useEffect(() => {
    if (fileData && !isInitialized) {
      initEditor();
      setIsInitialized(true);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [fileData, holderId, isInitialized]);

  // Save the document when onSaveTrigger is true.
  useEffect(() => {
    if (onSaveTrigger && editorRef.current) {
      onDocumentSave();
    }
  }, [onSaveTrigger]);

  /**
   * Initializes the Editor.js instance.
   */
  const initEditor = async () => {
    try {
      const editor = new EditorJs({
        holder: holderId,
        placeholder: "Start typing your masterpiece...",
        autofocus: true,
        inlineToolbar: true,
        defaultBlock: "paragraph",
        minHeight: 150,
        onReady: () => {
          editorRef.current = editor;
        },
        onChange: async () => {
          if (editorRef.current && onChange) {
            try {
              const data = await editorRef.current.save();
              onChange(data);
            } catch (error) {
              console.error("Error in onChange:", error);
            }
          }
        },
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+H",
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          list: {
            class: List as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          checklist: {
            class: CheckList as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          table: {
            class: Table as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool as unknown as BlockToolConstructable,
          },
          delimiter: {
            class: Delimiter as unknown as BlockToolConstructable,
          },
          warning: {
            class: Warning as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          underline: {
            class: Underline as unknown as ToolConstructable,
            shortcut: "CMD+U",
          },
          marker: {
            class: Marker as unknown as ToolConstructable,
            shortcut: "CMD+M",
          },
          inlineCode: {
            class: InlineCode as unknown as ToolConstructable,
            shortcut: "CMD+E",
          },
          quote: {
            class: Quote as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool as unknown as BlockToolConstructable,
            config: { endpoint: "/api/fetchUrl" },
          },
        },
        data: fileData.document ? JSON.parse(fileData.document) : undefined,
      });
    } catch (error) {
      console.error("Editor initialization failed:", error);
      toast.error("Failed to initialize editor");
    }
  };

  const onDocumentSave = async () => {
    if (!editorRef.current) return;

    try {
      const savedData = await editorRef.current.save();
      await updateDocument({
        _id: fileId as any, // Cast to any since we don't have a proper Convex schema
        document: JSON.stringify(savedData),
      });

      toast.success("Document Saved!", {
        style: { background: "#22c55e", color: "white" },
      });
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save document", {
        style: { background: "#ef4444", color: "white" },
      });
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-black px-1 py-1 flex items-center justify-center">
      <div className="w-full  flex flex-col">
        {/* Editor Container */}
        <div className="relative flex-1 bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-800/50 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />

          {/* Toolbar */}
          <div className="px-8 py-4 border-b border-gray-800/50 bg-gray-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              
            </div>
          </div>

          {/* Editor Content Area */}
          <div
            id={holderId}
            key={holderId}
            className="
              pl-12 py-1 
              text-gray-200
              h-[calc(100vh)]
              overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
              selection:bg-blue-500/30 selection:text-white
              break-words whitespace-normal overflow-wrap-break-word
            "
          />

          
        </div>
      </div>
    </div>
  );
};

export default Editor;
