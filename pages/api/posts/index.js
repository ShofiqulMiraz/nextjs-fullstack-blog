import nc from "next-connect";
import {
  createNewPost,
  getAllPosts,
} from "../../../backend/controllers/postController";
import { Protect } from "../../../backend/controllers/userController";

const handler = nc().get(getAllPosts).use(Protect).post(createNewPost);

export default handler;
