"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import checkList from "@editorjs/checklist";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import Underline from "@editorjs/underline";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import LinkTool from "@editorjs/link";
// Additional Plugins
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";


import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/DashboardTable";

const Editor = ({
  onSaveTrigger,
  fileId,
  fileData,
  holderId,
  onChange,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
  holderId: string;
  onChange?: (data: any) => void;
}) => {
  const ref = useRef<EditorJs>();
  const [document, setDocument] = useState("");

  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    console.log("triggered" + onSaveTrigger);
    onDocumentSave();
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJs({
      holder: holderId,
      placeholder: "Start typing here...",
      autofocus: true,
      inlineToolbar: true,
      defaultBlock: "paragraph",
      minHeight: 150,
      onChange: async () => {
        if (ref.current && onChange) {
          const data = await ref.current.save();
          onChange(data);
        }
      },
      tools: {
        header: {
          // @ts-ignore
          class: Header,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+H",
          config: {
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
          placeholder: "Add a heading...",
        },
        list: {
          // @ts-ignore
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          // @ts-ignore
          class: checkList,
          inlineToolbar: true,
        },
        table: {
          // @ts-ignore
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        // New plugins added here
        code: {
          // @ts-ignore
          class: CodeTool,
          config: {
            placeholder: "Enter your code...",
          },
        },
        delimiter: {
          // @ts-ignore
          class: Delimiter,
        },
        warning: {
          // @ts-ignore
          class: Warning,
          inlineToolbar: true,
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
       
        underline: {
          // @ts-ignore
          class: Underline,
          shortcut: "CMD+U",
        },
        marker: {
          // @ts-ignore
          class: Marker,
          shortcut: "CMD+M",
        },
        inlineCode: {
          // @ts-ignore
          class: InlineCode,
          shortcut: "CMD+E",
        },
        quote: {
          // @ts-ignore
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+Q",
          config: {
            quotePlaceholder: "Enter a quote...",
            captionPlaceholder: "Author",
          },
        },
        linkTool: {
          // @ts-ignore
          class: LinkTool,
          config: {
            endpoint: "/api/fetchUrl",
          },
        },
      },
      data: fileData.document ? JSON.parse(fileData.document) : document,
    });
    editor.isReady.then(() => {
      ref.current = editor;
    });
  };

  const onDocumentSave = async () => {
    if (ref.current) {
      const savedData = await ref.current.save();
      const resp = await updateDocument({
        _id: fileId,
        document: JSON.stringify(savedData),
      });

      toast.success("Document Saved!");
    }
  };

  return (
    <div className="bg-black min-h-screen p-3 flex justify-center items-center">
      {/* Paper Container */}
      <div className="bg-zinc-900 w-[8.5in] h-[11in] shadow-xl rounded-lg p-8 overflow-y-auto border border-gray-700 relative">
        {/* Add selection styles */}
        <div
          className="
    prose prose-invert ml-7 mr-1 prose-lg w-full h-full text-gray-300
    selection:bg-gray-600 selection:text-white
    break-words whitespace-normal overflow-wrap-break-word
  "
          id={holderId}
          key={holderId}
        ></div>
      </div>
    </div>
  );
};

export default Editor;
