import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello, World!</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Us at</h1><p>Phone: 1215641894531</p>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Us</h1><p>My Name is Ved</p>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});