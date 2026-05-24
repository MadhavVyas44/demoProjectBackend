"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

const DeleteButton = ({ postId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "are you sure you want to delete this post?",
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      console.log("Attempting to delete post with ID:", postId);
      const response = await fetch(`http://localhost:3001/feed/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
      } else {
        alert("failed to delete the post.");
      }
    } catch (error) {
      console.error("Some error occured", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete Post"
      className="text-red-500 hover:bg-red-50 p-2 rounded disabled:opacity-50 transition-colors"
    >
      {isDeleting ? (
        <Loader2 className="w-5 h-5 animate-spin"></Loader2>
      ) : (
        <Trash2 className=" w-5 h-5" />
      )}
    </button>
  );
};

export default DeleteButton;
