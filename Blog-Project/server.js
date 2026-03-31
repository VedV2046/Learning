import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
// ---------- Middleware ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// ---------- In-memory data store ----------
let posts = [];
let nextId = 1;
// Seed a couple of example posts so the page doesn't look empty on first visit
posts.push(
  {
    id: nextId++,
    title: "Welcome to My Blog",
    content:
      "This is a sample blog post to get you started. You can edit or delete this post, or create your own! Blogging is a great way to share your thoughts, ideas, and experiences with the world. Whether you're writing about technology, travel, food, or life in general — your voice matters.\n\nFeel free to experiment with the editor and make this space your own.",
    author: "Admin",
    createdAt: new Date(),
  },
  {
    id: nextId++,
    title: "The Art of Writing",
    content:
      "Writing is one of the most powerful forms of communication. It allows us to express complex ideas, tell stories, and connect with people across time and space.\n\nGreat writing isn't about using big words or perfect grammar — it's about clarity, honesty, and finding your unique voice. Start writing today, even if it's just a paragraph. The more you practice, the better you'll become.",
    author: "Admin",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  }
);
// ---------- Helper ----------
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
// Make the helper available in all templates
app.locals.formatDate = formatDate;
// ---------- Routes ----------
// HOME — list all posts
app.get("/", (req, res) => {
  res.render("index", { posts: posts.slice().reverse(), currentPage: "home" });
});
// NEW — form to create a post
app.get("/posts/new", (req, res) => {
  res.render("new", { currentPage: "new" });
});
// CREATE — handle form submission
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) return res.redirect("/posts/new");
  posts.push({
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    author: (author && author.trim()) || "Anonymous",
    createdAt: new Date(),
  });
  res.redirect("/");
});
// SHOW — view a single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).render("404", { currentPage: "" });
  res.render("show", { post, currentPage: "" });
});
// EDIT — form to edit a post
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).render("404", { currentPage: "" });
  res.render("edit", { post, currentPage: "" });
});
// UPDATE — handle edit form submission
app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).render("404", { currentPage: "" });
  const { title, content, author } = req.body;
  post.title = title.trim();
  post.content = content.trim();
  post.author = (author && author.trim()) || "Anonymous";
  res.redirect(`/posts/${post.id}`);
});
// DELETE — remove a post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/");
});
// 404 catch-all
app.use((req, res) => {
  res.status(404).render("404", { currentPage: "" });
});
// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Blog server running at http://localhost:${PORT}`);
});