import nc from "next-connect";
import { deleteScam } from "../../../../backend/controllers/postController";
import {
  Protect,
  Restrict,
} from "../../../../backend/controllers/userController";

const handler = nc().use(Protect).use(Restrict).delete(deleteScam);

export default handler;
