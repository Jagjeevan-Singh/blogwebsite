import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

// Simulating an in-memory database for posts (optional for testing purposes)
let posts = [
  { id: 1, title: "Sample Post", content: "This is a sample post." },
  // Add more sample posts as needed
];

// Serve static files from the "public" and "styles" directories
app.use(express.static("public"));
app.use(express.static("styles"));

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Route to render the main page
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// Route to render the "New Post" page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the "Edit Post" page
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post,
    });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Route to render the "Signup" page
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// Handle signup form submission
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  
  console.log("User signed up:", { username, email, password });
  
  res.redirect("/");
});

// Create a new post
app.post("/api/posts", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.redirect("/");
});

// Update a post
app.post("/api/posts/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id == req.params.id);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.redirect("/");
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.redirect("/");
});

// Endpoint to handle issues submitted by users
app.post("/api/issues", (req, res) => {
  const issue = req.body.issue;
  console.log("Issue submitted:", issue);

  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});