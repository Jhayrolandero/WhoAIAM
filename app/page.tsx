import { BackgroundLines } from "@/components/ui/background-lines";
import React from "react";

const Home = () => {
  return (
    <BackgroundLines className="flex flex-col justify-center items-center h-full">
      <h4 className="text-7xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-gray-400 to-white">
        SHAD AI
      </h4>
      <p>Prompt like never before</p>
    </BackgroundLines>
  );
};

export default Home;
