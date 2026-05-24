import DeleteButton from "./DeleteButton";
export default async function FeedPage() {
  // 1. Fetch data directly inside the component
  // 'no-store' tells Next.js NOT to cache this, so the feed is always fresh
  const response = await fetch("http://localhost:3001/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <main className="min-h-screen grid place-items-center">
        <p className="text-red-500 font-medium">Failed to load the feed.</p>
      </main>
    );
  }

  // 2. Parse the JSON sent back by your Node server
  const posts = await response.json();

  // 3. Render the UI
  return (
    <main className="max-w-xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Recent Posts</h1>

      {/* If there are no posts, show a friendly message */}
      {posts.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg border">
          <p className="text-gray-500">No posts yet. Go create one!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Loop through the array of posts and render a card for each one */}
          {posts.map((post) => (
            <article
              key={post.id || post._id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm"
            >
              {/* If your backend sends an image URL, render it */}
              {post.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-128 object-cover"
                />
              )}
              <div className="flex items-center justify-between gap-4 p-4 border-t">
                <p className="text-lg font-medium text-gray-900 truncate">
                  {post.title}
                </p>
                <DeleteButton postId={post.id || post._id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
