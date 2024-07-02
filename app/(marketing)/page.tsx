import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { CheckCheck, MedalIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-10 gap-5 justify-center">
      {/* Medal */}
      <div className="flex gap-2 h-12 bg-card items-center p-3 rounded-full flex-nowrap w-60 justify-center">
        <MedalIcon className="text-yellow-600" />
        <span className="text-sm text-card-foreground">
          No. 1 Task Reminder
        </span>
      </div>
      <div className="text-center flex-col gap-1">
        <h1 className="text-5xl md:text-9xl bg-gradient-to-r from-red-400 to-indigo-500 bg-clip-text text-transparent">
          Taskify
        </h1>
        <p className="text-sm md:text-xl mt-4 text-muted-foreground">
          Taskify increasae your productivity as next level, <br />
          keep your work in track with collection feature.
        </p>
      </div>

      <Button size={"lg"} asChild>
        <Link href={"/dashboard"}>Get Started</Link>
      </Button>

      {/* <ModeToggle /> */}
    </main>
  );
}
