"use client";
import { Collection, Task } from "@prisma/client";
import React, { useMemo, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  Divide,
  Plus,
  Trash,
  Trash2,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Progress } from "./ui/progress";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area";
import { deleteColllection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// interface
interface Props {
  collection: Collection & {
    tasks: Task[];
  };
}
const CollectionCard = ({ collection }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const router = useRouter();

  const tasks = collection.tasks;

  const [isLoading, startTransition] = useTransition();

  //calculate the number of tasks done
  const TasksDone = React.useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const totalTasks = collection.tasks.length;

  const progress = totalTasks === 0 ? 0 : (TasksDone / totalTasks) * 100;

  const removeCollection = async (id: number) => {
    try {
      await deleteColllection(collection.id);
      toast({
        title: "Success!",
        description: "Collection deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error!",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full flex justify-between bg-foreground p-10 hover:bg-foreground rounded-none"
            )}
            size={"lg"}
          >
            {" "}
            <span className="text-card font-semibold text-xl">
              {collection.name}
            </span>
            {!isOpen && (
              <ChevronDown className="h-6 w-6 text-white dark:text-black" />
            )}
            {isOpen && (
              <ChevronUp className="h-6 w-6 text-white dark:text-black" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no tasks yet:</p>
              <span className="text-emerald-600">Create one</span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress
                className="rounded-none [&>*]:bg-emerald-500 h-2"
                value={progress}
              />
              <ScrollArea className="p-4 gap-3 flex flex-col h-[220px] bg-card">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </ScrollArea>
            </>
          )}
          <footer className="flex justify-between h-6 items-center text-xs p-5 text-muted-foreground">
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
              <div className="flex gap-x-4">
                <Button
                  variant={"ghost"}
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="h-4 w-4 text-emerald-600" />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    removeCollection(collection.id);
                  }}
                >
                  <Trash2Icon className="h-4 w-4 text-rose-600" />
                </Button>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default CollectionCard;
