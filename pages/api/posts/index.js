import nc from "next-connect";
import {
  createNewPost,
  getAllPosts,
} from "../../../backend/controllers/postController";

const handler = nc()
  //   .use(protect)
  .get(getAllPosts)
  .post(createNewPost)
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
