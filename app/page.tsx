import React from "react";
import Employee from "./components/Employee";
import POSTS from "./components/posts";
import { Suspense } from "react";
import Load from "./components/Load";
const page = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) throw new Error("Failed to fetch Employee info");

  const user = await response.json();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col border-b-3">
        <Employee />
      </div>
      <div className=" flex-1 flex flex-col border-b-3">
        <h2 className="text-5xl m-7 text-center">Recent Posts</h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          This preview includes an intentional 2-second loading delay.
        </p>
        <Suspense
          fallback={
            <p className="m-auto text-gray-700 text-3xl">
              Loading recent posts…
            </p>
          }
        >
          <POSTS />
        </Suspense>
      </div>
      <div className="flex-1 flex flex-col border-b-3">
        <Suspense
          fallback={
            <p className="m-auto text-gray-700 text-5xl">
              Loading recent posts…
            </p>
          }
        >
          <Load />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
