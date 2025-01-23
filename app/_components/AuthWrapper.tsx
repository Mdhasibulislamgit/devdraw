"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface User {
  id?: string;
  name: string;
  email: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading: isAuthLoading } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  // Only query if we have an email
  const existingUser = useQuery(
    api.user.getUser,
    user?.email ? { email: user.email } : "skip"
  );

  useEffect(() => {
    const handleUserCreation = async () => {
      // Only proceed if:
      // 1. Auth is loaded
      // 2. We have user data
      // 3. We've checked for existing user (not undefined)
      // 4. No existing user found (null)
      // 5. Not already creating user
      if (!isAuthLoading && 
          user?.email && 
          existingUser === null && 
          !isCreatingUser) {
        try {
          setIsCreatingUser(true);
          
          await createUser({
            name: `${user.given_name || ""} ${user.family_name || ""}`.trim(),
            email: user.email,
            image: user.picture || "",
          });

          toast.success("Account created successfully!");
        } catch (error: any) {
          // Handle specific error cases
          if (error?.data?.code === "CONFLICT") {
            toast.error("Account already exists. Please try logging in.");
          } else {
            toast.error("Failed to create account. Please try again.");
          }
          console.error("Error creating user:", error);
        } finally {
          setIsCreatingUser(false);
        }
      }
    };

    handleUserCreation();
  }, [user, isAuthLoading, existingUser, createUser, isCreatingUser]);

  // Optional: Show loading state while creating user
  if (isCreatingUser) {
    return <div>Setting up your account...</div>;
  }

  return <>{children}</>;
}