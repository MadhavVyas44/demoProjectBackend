"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:3001/create-post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("failed to save post to the server");
      }
      router.push("/feed");
      router.refresh();
    } catch (err) {
      setError(err.message || "an unknown error occured");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-4 border-2 border-red-400">
      {/* NEW WRAPPER DIV: This groups the title and form together into one block */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
          )}

          {/* 
       
      */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="image" className="font-medium">
              Cover Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="border rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-medium">
              Caption
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white font-medium p-2 rounded disabled:opacity-50 mt-2"
          >
            {isLoading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </main>
  );
}
