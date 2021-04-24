import Post from "../models/postModel";
import { APIFeature } from "../utils/apiFeature";
import dbConnect from "../utils/dbConnect";
import Joi from "joi";

// Get All Post from database
export async function getAllPosts(req, res) {
  await dbConnect();
  const features = new APIFeature(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  try {
    const Post = await features.query;
    res.send(Post);
  } catch (error) {
    res.status(404).send("something went wrong, try again");
  }
}

// Create New Post

// create create post validation
const CreatePostValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
});

export async function createNewPost(req, res) {
  await dbConnect();
  try {
    // validation before Post save
    const { error } = CreatePostValidation.validate(req.body);
    if (error) {
      return res.status(404).send(error.details[0].message);
    }
    //   create new post request from req.body
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
    });

    // save in database
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(403).send("something went wrong, try again");
  }
}

// get single post based on slug
export async function getSinglePost(req, res) {
  await dbConnect();
  try {
    const singlePost = await Post.find({ slug: req.query.slug });
    if (singlePost.length === 0) {
      return res.status(400).send("Post not found!");
    }
    res.send(singlePost);
  } catch (error) {
    res.status(404).send("Post not found!");
  }
}

export async function deleteScam(req, res) {
  await dbConnect();
  try {
    const ToDeletePost = await Post.findByIdAndDelete(req.query.id);
    if (!ToDeletePost) {
      return res.status(400).send("Post not found!");
    }
    res.send("Post Successfully Deleted");
  } catch (error) {
    // console.log(error);
    res.status(404).send("Post not found!");
  }
}
