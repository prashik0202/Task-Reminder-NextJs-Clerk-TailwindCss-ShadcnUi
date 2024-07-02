import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { setTaskDone } from "@/actions/task";

interface Props {
  task: Task;
}

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-300 dark:text-gray-400";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

const TaskCard = ({ task }: Props) => {
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <div className="flex flex-start gap-x-3 items-center">
      <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskDone(task.id);
            router.refresh();
          });
        }}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white p-2",
          task.done && "line-through"
        )}
      >
        <div className="flex flex-col gap-y-3">
          <h1>{task.content}</h1>
          {task.expiresAt && (
            <p
              className={cn(
                "text-xs text-neutral-500 dark:text-neutral-400",
                getExpirationColor(task.expiresAt)
              )}
            >
              {format(task.expiresAt, "dd/MM/yyyy")}
            </p>
          )}
        </div>
      </label>
    </div>
  );
};

export default TaskCard;
