import nc from "next-connect";
import { Register } from "../../../backend/controllers/userController";

const handler = nc().post(Register);

export default handler;
