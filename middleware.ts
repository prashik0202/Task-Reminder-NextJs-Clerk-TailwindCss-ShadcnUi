import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
} from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  // let path = "/dashboard";
  // const privateRoute = new URL(path, req.url);
  // if (isPublicRoute(req) && auth()) return NextResponse.redirect(privateRoute);
  // let pathPublic = "/";
  // const publicRoute = new URL(pathPublic, req.url);
  // if (!auth()) return NextResponse.redirect(publicRoute);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
