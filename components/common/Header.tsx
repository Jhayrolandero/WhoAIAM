"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SettingsDropdown from "./SettingsDropdown";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

const Header = () => {
  const pathname = usePathname();

  //   if (pathname === "/") return <></>;

  return (
    <header
      className="z-50 pointer-events-auto h-16 flex items-center sticky top-0 px-4 lg:px-10 justify-between
"
    >
      <Link href="/">
        <h4 className=" text-xl font-bold">SHAD AI</h4>
      </Link>
      {pathname === "/" ? (
        <Link href="/chat">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="cursor-pointer bg-black text-white dark:text-white flex items-center space-x-2"
          >
            Try now
          </HoverBorderGradient>
          {/* <button className="cursor-pointer transition-all hover:scale-105 "> */}
          {/* </button> */}
        </Link>
      ) : (
        <SettingsDropdown />
      )}
    </header>
  );
};

export default Header;
