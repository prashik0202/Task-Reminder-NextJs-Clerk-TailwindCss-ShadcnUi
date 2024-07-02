"use server";

import prisma from "@/lib/prisma";
import { createCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User Not Found");
    // redirect("/sign-in");
  }

  return await prisma.collection.create({
    data: {
      userId: user.id,
      name: form.name,
    },
  });
}

export async function deleteColllection(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found!");
  }

  return await prisma.collection.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}
