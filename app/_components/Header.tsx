import Image from "next/image";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";

const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="z-50 fixed w-full bg-gray-900/80 backdrop-blur-xl shadow-lg dark:border-b dark:border-gray-800">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="DevDraw Logo"
            width={100}
            height={100}
            className="transition-transform hover:scale-110"
          />
          <span className="text-4xl font-extrabold text-white tracking-tight">
            DevDraw
          </span>
        </div>

        {/* Navigation and Auth */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 mr-6">
            <a href="/" className="text-gray-300 hover:text-white transition">
              Features
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700"
                >
                  <User className="mr-2 h-4 w-4" />
                  <LoginLink postLoginRedirectURL="/dashboard">
                    Dashboard
                  </LoginLink>
                </Button>
                <LogoutLink>
                  <Button
                    variant="destructive"
                    className="bg-red-500 text-gray-100 hover:bg-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </LogoutLink>
              </div>
            ) : (
              <div className="flex space-x-4">
                <LoginLink
                  postLoginRedirectURL="/dashboard"
                  className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
                >
                  Login
                </LoginLink>
                <RegisterLink
                  postLoginRedirectURL="/dashboard"
                  className="inline-flex items-center justify-center rounded-md bg-gray-700 px-6 py-2 text-white transition hover:bg-gray-800"
                >
                  Register
                </RegisterLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;