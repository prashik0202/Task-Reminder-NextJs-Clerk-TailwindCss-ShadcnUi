import CollectionCard from "@/components/CollectionCard";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { CircleAlert, Plus } from "lucide-react";
import React, { Suspense } from "react";

const DashBoradPage = async () => {
  return (
    <div className=" container min-h-screen py-20">
      <Suspense fallback={<WelcomeMessageCallBack />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<CollectionCallBack />}>
        <CollectionList />
      </Suspense>
    </div>
  );
};

export default DashBoradPage;

// Welcome Message FallBack
function WelcomeMessageCallBack() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-[250px]" />
    </div>
  );
}

// Collection Fallback component
function CollectionCallBack() {
  return (
    <div className="mt-2 flex flex-col ">
      <div>
        <Skeleton className="w-20 h-10 my-3" />
      </div>
      <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 my-3 ">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

// Welcome Message Display
async function WelcomeMessage() {
  const user = await currentUser();
  return (
    <div className="">
      <h1 className="text-xl">
        Welcome, <span className="text-sky-600">{user?.fullName}👋</span>
      </h1>
    </div>
  );
}

//Collection List
async function CollectionList() {
  // check user is present or not
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <>
        <Alert className="border-none mt-5">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>There are currently no collections</AlertTitle>
          <AlertDescription>
            You can create collection by clicking below button
          </AlertDescription>
        </Alert>
        <CreateCollectionButton />
      </>
    );
  }

  return (
    <>
      <CreateCollectionButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
