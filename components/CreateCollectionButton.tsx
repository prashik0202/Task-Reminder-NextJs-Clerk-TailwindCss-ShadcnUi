"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import CreateCollectionSheet from "./CreateCollectionSheet";

const CreateCollectionButton = () => {
  // Sheet State
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <div>
      <Button
        className="mt-4 items-center gap-3 flex"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-5 w-5" /> Create new collection
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
};

export default CreateCollectionButton;
