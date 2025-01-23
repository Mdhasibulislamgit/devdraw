"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import dynamic from "next/dynamic";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/DashboardTable";
import { Id } from "@/convex/_generated/dataModel";

const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});

const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

interface TabType {
  name: "Document" | "Both" | "Canvas";
}

const Workspace = ({ params }: { params: { fileId: string } }) => {
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE>();
  const [documentData, setDocumentData] = useState<any>(null);
  
  useEffect(() => {
    params.fileId && getFileData();
  }, [params.fileId]);

  const getFileData = async () => {
    const file = await convex.query(api.files.getFilebyId, {
      _id: params.fileId as Id<"files">,
    });
    setFileData(file);
    if (file.document) {
      setDocumentData(JSON.parse(file.document));
    }
  };

  const handleDocumentChange = (data: any) => {
    setDocumentData(data);
  };

  const Tabs: TabType[] = [
    {
      name: "Document",
    },
    {
      name: "Both",
    },
    {
      name: "Canvas",
    },
  ];

  const [activeTab, setActiveTab] = useState<TabType["name"]>(Tabs[1].name);
  const [triggerSave, setTriggerSave] = useState(false);

  return (
    <div className="overflow-hidden w-full">
      <WorkSpaceHeader
        Tabs={Tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        onSave={() => setTriggerSave(!triggerSave)}
        file={fileData}
      />
      {activeTab === "Document" ? (
        <div
          style={{
            height: "calc(100vh - 3rem)",
          }}
        >
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData!}
            holderId="editor-single"
            onChange={handleDocumentChange}
          />
        </div>
      ) : activeTab === "Both" ? (
        <ResizablePanelGroup
          style={{
            height: "calc(100vh - 3rem)",
          }}
          direction="horizontal"
        >
          <ResizablePanel defaultSize={50} minSize={40} collapsible={false}>
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData!}
              holderId="editor-split"
              onChange={handleDocumentChange}
            />
          </ResizablePanel>
          <ResizableHandle className="bg-neutral-600" />
          <ResizablePanel defaultSize={50} minSize={45}>
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData!}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : activeTab === "Canvas" ? (
        <div
          style={{
            height: "calc(100vh - 3rem)",
          }}
        >
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData!}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Workspace;
