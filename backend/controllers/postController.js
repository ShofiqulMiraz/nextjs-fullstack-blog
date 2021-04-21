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

// create scam request validation
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
    const newPost = new Scam({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
    });
    await newPost.save();
    res.status(201).send(newscam);
  } catch (error) {
    res.status(403).send("something went wrong, try again");
  }
}
