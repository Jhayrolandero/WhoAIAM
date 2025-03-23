import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@radix-ui/react-dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  RefreshCw,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import Image from "next/image";

const SettingsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer outline-none">
          {" "}
          <Settings className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 border text-xs p-2 rounded-sm border-gray-500 space-y-4"
      >
        <DropdownMenuLabel className="text-sm flex gap-x-2 items-center">
          <Image
            src="/pic.avif"
            alt="me"
            width={16}
            height={16}
            className=" size-6 rounded-full"
          />
          Ryan Reynolds
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className=" cursor-pointer flex hover:outline-none hover:bg-zinc-800 p-1 transition-all rounded-sm">
            <button
              onClick={async () => {
                await fetch("/api/chat", {
                  method: "DELETE",
                });
                location.reload();
              }}
              className="flex  items-center gap-x-2 cursor-pointer "
            >
              <RefreshCw className="size-4" />
              Reset Chat
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
