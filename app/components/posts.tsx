import React from "react";
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const POSTS = async () => {
  // Simulate a delay to test the Suspense fallback
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1",
  );
  if (!response.ok)
    return <div className="p-4 text-red-500">Failed to fetch posts.</div>;
  const posts: Post[] = await response.json();
  const recentPosts = posts.slice(0, 3);
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center">
        {recentPosts.map((post) => {
          return (
            <p key={post.id} className="text-xl text-gray-600">
              {post.title}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default POSTS;
