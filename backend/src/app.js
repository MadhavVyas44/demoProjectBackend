const express = require("express");
const multer = require("multer");
const cors = require("cors"); // 1. Import CORS
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");

const app = express();

// 2. Enable CORS to allow your Next.js frontend to talk to this backend
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your Next.js app
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// ==========================================
// GET ROUTE: Serve data to the /feed page
// ==========================================
app.get("/posts", async (req, res) => {
  try {
    // Fetch all posts from MongoDB, sorting them so the newest is at the top
    const posts = await postModel.find().sort({ createdAt: -1 });

    // Format the data to match exactly what your Next.js frontend expects!
    const formattedPosts = posts.map((post) => ({
      id: post._id,
      title: post.caption, // Frontend was expecting "title", backend calls it "caption"
      imageUrl: post.image, // Frontend was expecting "imageUrl", backend calls it "image"
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ==========================================
// POST ROUTE: Handle the form submission
// ==========================================
// Note: I changed the route name to '/api/posts' to match what you
// put in the Next.js `fetch` request earlier!
app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    let uploadedImageUrl = null;

    // Check if an image was actually uploaded
    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      uploadedImageUrl = result.url;
    }

    // Create the database entry
    const post = await postModel.create({
      image: uploadedImageUrl,
      // Your form uses name="title" for the caption input, so we check both
      caption: req.body.title || req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.delete("/feed/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletePost = await postModel.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(404).json({
        error: "post not found",
      });
    }
    res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (err) {
    console.error("error deleting the post", err);
    res.status(500).json({
      error: "failed to delete post",
    });
  }
});

module.exports = app;
