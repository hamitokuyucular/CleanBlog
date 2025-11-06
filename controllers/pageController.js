const Post = require("../models/Post")

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({_id: req.params.id});
  res.render("edit_post", {
    post
  });
};

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getPostPage = (req, res) => {
  res.render("post");
};

exports.getAddPage = (req, res) => {
  res.render("add_post");
};