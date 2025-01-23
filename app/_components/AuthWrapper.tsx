"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const existingUser = useQuery(api.user.getUser, {
    email: user?.email ?? "",
  });

  useEffect(() => {
    // Only proceed if we have user data and no existing user
    if (!isLoading && user && !existingUser?.length) {
      createUser({
        name: user.given_name + " " + (user.family_name || ""),
        email: user.email ?? "",
        image: user.picture ?? "",
      });
    }
  }, [user, isLoading, existingUser, createUser]);

  return <>{children}</>;
}