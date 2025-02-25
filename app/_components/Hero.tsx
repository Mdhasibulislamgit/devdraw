import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-neutral-900 via-gray-900 to-neutral-900 text-white overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex flex-col items-center justify-center min-h-[60vh] lg:min-h-screen">
        <div className="max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-blue-300 via-blue-500 to-purple-700 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent animate-fade-in">
            Documents & Diagrams
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold animate-fade-in delay-100">
            for Developers
          </p>
          
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-bg-pulse"
        style={{ backgroundImage: "url('your-background-image-url.jpg')" }}
      ></div>
    </section>
  );
};

export default Hero;
