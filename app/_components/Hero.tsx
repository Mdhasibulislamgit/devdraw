import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-neutral-900 via-gray-900 to-neutral-900 text-white">
      <div className="mx-auto max-w-screen-xl px-8 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl animate-fade">
            Documents & Diagrams
          </h1>
          <p className="mt-4 text-2xl font-semibold sm:text-3xl animate-fade-in">
            for Developers
          </p>

          <div className="mt-10 flex justify-center">
            <LoginLink className="flex items-center rounded-lg border border-white bg-neutral-100 px-6 py-3 text-lg font-medium text-black hover:bg-neutral-300 hover:text-neutral-900 focus:outline-none focus:ring active:text-opacity-75 transition-transform transform hover:scale-105">
              Login Here to get Started
              <ArrowRight className="ml-2" size={24} />
            </LoginLink>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-bg-pulse" style={{ backgroundImage: "url('your-background-image-url.jpg')" }}></div>
    </section>
  );
};

export default Hero;