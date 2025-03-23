"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col pointer-events-auto justify-center items-center h-full">
      <TextHoverEffect duration={0.5} text="SHAD AI" />
      <ShootingStars />
      <StarsBackground />
      {/* <BackgroundBeams className="pointer-events-auto" /> */}
    </div>
    //   <h4 className="text-7xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-gray-400 to-white">
    //     SHAD AI
    //   </h4>
    //   <p>Prompt like never before</p>
    // </BackgroundLines>
  );
};

export default Home;
