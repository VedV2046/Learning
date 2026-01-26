import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('index.ejs', {posts: posts});
});

app.get('/new', (req, res) => {
    res.render('compose.ejs', {
        heading: "New Post",
        submitLabel: "Create Post",
        post: null
    });
});

app.post("/submit", (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: new Date().toLocaleDateString(),
    };
    posts.push(newPost);
    res.render("index.ejs", {posts: posts});
});

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const postToEdit = posts.find(post => post.id === postId);

    if(postToEdit) {
        res.render("compose.ejs", {
            heading: "Edit Post",
            submitLabel: "Update Post",
            post: postToEdit
        });
    }
    else {
        res.redirect("/");
    }
});

app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(post => post.id === postId);

    if(postIndex > -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        posts[postIndex].author = req.body.author;
    }
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.redirect("/")
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});