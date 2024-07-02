import { CheckCheck } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed top-0 flex p-5 gap-3 w-full justify-between">
      <div className="flex gap-2 items-center">
        <CheckCheck className="w-7 h-7" />
        <h1 className="text-xl">Taskify</h1>
      </div>
      <div className="flex gap-3 items-center">
        <UserButton />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
