"use client";

import Sidebar from "@/app/_components/Sidebar";
import { FileListContext, FileListProvider } from "@/app/_context/FileListContext";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react"; // Import Menu icon

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkTeam();
    }
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email!,
    });
    if (!result.length) {
      router.push("/team/create");
    }
  };

  // Get the team ID for the current user
  const [teamId, setTeamId] = useState<string>('');

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const getTeamId = async () => {
      if (user?.email) {
        const result = await convex.query(api.teams.getTeams, {
          email: user.email,
        });
        if (result?.length > 0) {
          setTeamId(result[0]._id);
        }
      }
    };
    getTeamId();
  }, [user, convex]);

  return (
    <div className="h-screen overscroll-x-none" suppressHydrationWarning>
      {teamId && (
        <FileListProvider teamId={teamId}>
          <div className="relative grid sm:grid-cols-5 "> {/* Added relative positioning */}
            {/* Sidebar */}
            <div className="sm:col-span-1">
              <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content Area */}
            <div className="sm:col-span-4 h-screen flex flex-col"> {/* Use flex column */}
              {/* Header for Mobile Hamburger */}
              <div className="sm:hidden p-4 border-b border-neutral-800"> {/* Mobile header bar */}
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded text-white hover:bg-neutral-700"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={24} />
                </button>
                {/* Can add other mobile header elements here if needed */}
              </div>

              {/* Actual Content */}
              <div className="flex-1 overflow-y-auto p-4"> {/* Add padding to content */}
                 {children}
              </div>
            </div>
          </div>
        </FileListProvider>
      )}
    </div>
  );
}
