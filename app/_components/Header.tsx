import Image from "next/image";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="z-50 fixed w-full bg-gray-900/80 backdrop-blur-xl shadow-lg dark:border-b dark:border-gray-800">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Image
            src="/logo.png"
            alt="DevDraw Logo"
            width={80}
            height={80}
            className="w-12 sm:w-16 lg:w-20 transition-transform hover:scale-110"
          />
          <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            DevDraw
          </span>
        </div>

        {/* Navigation and Auth */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700 sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
                  asChild
                >
                  <LoginLink postLoginRedirectURL="/dashboard">
                    <User className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Dashboard
                  </LoginLink>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 text-gray-100 hover:bg-red-600 sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
                  asChild
                >
                  <LogoutLink>
                    <LogOut className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Logout
                  </LogoutLink>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700 sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
                  asChild
                >
                  <LoginLink postLoginRedirectURL="/dashboard">Login</LoginLink>
                </Button>
                <Button
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-800 sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
                  asChild
                >
                  <RegisterLink postLoginRedirectURL="/dashboard">
                    Register
                  </RegisterLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
