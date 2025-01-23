import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserIcon } from "lucide-react";

const MyAvatar = () => {
  const { user, isLoading } = useKindeBrowserClient();
  const userDetails = useQuery(api.user.getUser, {
    email: user?.email ?? ""
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Avatar>
        <AvatarFallback className="bg-neutral-800">
          <UserIcon className="w-5 h-5 text-neutral-400 animate-pulse" />
        </AvatarFallback>
      </Avatar>
    );
  }

  // Get the profile image URL with priority:
  // 1. Database image (from manual upload)
  // 2. Auth provider image (from Google/Facebook)
  // 3. Fallback to default avatar
  const profileImage = userDetails?.[0]?.image || user?.picture || "";

  return (
    <Avatar>
      <AvatarImage
        src={profileImage}
        alt={user?.given_name || "User"}
      />
      <AvatarFallback className="bg-neutral-800">
        <UserIcon className="w-5 h-5 text-neutral-400" />
      </AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
