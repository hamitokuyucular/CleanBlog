const express = require("express")
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require("ejs");
const Post = require("./models/Post");

const app = express();

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-db');

// TEMPLATE ENGİNE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

// ROUTES
app.get("/", async (req, res) => {
  const posts = await Post.find().sort("-dateCreated");
  res.render("index", {
    posts
  });
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render("post", {
    post
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/")
});

app.get("/posts/edit_post/:id", async (req, res) => {
  const post = await Post.findOne({_id: req.params.id});
  res.render("edit_post", {
    post
  });
});

app.put("/posts/:id", async (req, res) => {
  const post = await Post.findOne({_id: req.params.id});
  post.authorName = req.body.authorName;
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.content = req.body.content;
  post.save();

  res.redirect(`/posts/${req.params.id}`)
});

app.delete("/posts/:id", async (req,res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.redirect("/")
})

const port = 5000;

app.listen(port, () => {
  console.log(`Sunucu, ${port} portunda başlatıldı..`);
});