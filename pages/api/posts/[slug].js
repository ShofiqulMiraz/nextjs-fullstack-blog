import nc from "next-connect";
import { getSinglePost } from "../../../backend/controllers/postController";

const handler = nc().get(getSinglePost);

export default handler;
