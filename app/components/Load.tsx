"use client";
import React, { useState } from "react";
import { ApiError } from "@/app/lib/ApiError";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Load = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [scenario, setScenario] = useState("success");

  async function fetchData() {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      let response: Response;

      switch (scenario) {
        case "http-error": // Simulated HTTP 503 response
          response = new Response(null, { status: 503 });
          break;

        case "empty": // Simulated successful response with no posts
          response = new Response(JSON.stringify([]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
          break;

        case "slow": // Simulated delay, followed by a real API request
          await new Promise((resolve) => setTimeout(resolve, 2000));
          response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?userId=1",
          );
          break;

        default: // Real API request
          response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?userId=1",
          );
          break;
      }
      if (!response.ok) {
        throw new ApiError("Could not fetch posts", response.status);
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          `Could not load posts (HTTP ${err.status}). Please try again.`,
        );
      } else {
        setError("Something went wrong. Check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 w-full">
      <div className="flex items-center gap-4">
        <p className="text-gray-600">Press the button to load posts manually</p>
        <label>
          Deme Scenario:
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="border rounded p-2 ml-2"
            disabled={loading}
          >
            <option value="success">Success</option>
            <option value="slow">Slow</option>
            <option value="http-error">HTTP error (simulated)</option>
            <option value="empty">Empty (simulated)</option>
          </select>{" "}
        </label>
        <button
          className="border px-4 py-2 rounded font-medium hover:bg-black hover:text-white transition cursor-pointer"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Loading..." : error ? "Try again" : "Load posts"}
        </button>
      </div>

      {loading && (
        <p className="text-blue-600 animate-pulse text-lg">Loading posts…</p>
      )}

      {error && !loading && (
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && posts !== null && posts.length === 0 && (
        <p className="text-gray-500 text-lg">No posts found</p>
      )}

      {!loading && !error && posts !== null && posts.length > 0 && (
        <div className="flex flex-col gap-3 w-full max-w-xl max-h-72 overflow-y-auto p-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-3 bg-white shadow-xs"
            >
              <h3 className="font-semibold text-gray-800 capitalize mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Load;
