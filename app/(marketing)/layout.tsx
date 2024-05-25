import { ModeToggle } from "@/components/ThemeToggle";
import { CheckCheck } from "lucide-react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col">
      <nav className="fixed top-0 flex p-5 gap-3 w-full justify-between">
        <div className="flex gap-2 items-center">
          <CheckCheck className="w-7 h-7" />
          <h1 className="text-xl">Taskify</h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default layout;
