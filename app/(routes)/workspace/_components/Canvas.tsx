"use client";
import React, { useEffect, useRef, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE, FileListContext } from "@/app/_context/FileListContext";
import { useContext } from "react";

const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) => {
  const [whiteBoard, setWhiteBoard] = useState<any>();
  const { refreshFiles } = useContext(FileListContext);
  const updateWhiteBoard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (whiteBoard && onSaveTrigger) {
      saveWhiteboard();
    }
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoard),
    })
      .then(() => {
        toast.success("Canvas saved");
        refreshFiles(); // Refresh file list after successful save
      })
      .catch((e) => {
        console.error("Canvas save error:", e);
        toast.error("Error saving canvas");
      });
  };

  return (
    <>
      <div className="h-full w-full">
        {fileData && fileData.whiteboard ? (
          <Excalidraw
            theme="dark"
            initialData={{
              elements: fileData && JSON.parse(fileData?.whiteboard),
            }}
            UIOptions={{
              canvasActions: {
                export: false,
                loadScene: false,
                saveAsImage: false,
              },
            }}
            onChange={(excaliDrawElements, appState, files) => {
              setWhiteBoard(excaliDrawElements);
            }}
          >
            <MainMenu>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.Help />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
            <WelcomeScreen>
              <WelcomeScreen.Hints.MenuHint />
              <WelcomeScreen.Hints.ToolbarHint />
              <WelcomeScreen.Hints.HelpHint />
            </WelcomeScreen>
          </Excalidraw>
        ) : (
          <Excalidraw
            theme="dark"
            UIOptions={{
              canvasActions: {
                export: false,
                loadScene: false,
                saveAsImage: false,
              },
            }}
            onChange={(excaliDrawElements, appState, files) => {
              setWhiteBoard(excaliDrawElements);
            }}
          >
            <MainMenu>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.Help />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
            <WelcomeScreen>
              <WelcomeScreen.Hints.MenuHint />
              <WelcomeScreen.Hints.ToolbarHint />
              <WelcomeScreen.Hints.HelpHint />
            </WelcomeScreen>
          </Excalidraw>
        )}
      </div>
    </>
  );
};

export default Canvas;
