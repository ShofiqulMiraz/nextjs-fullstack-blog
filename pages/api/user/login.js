import nc from "next-connect";
import { Login } from "../../../backend/controllers/userController";

const handler = nc().post(Login);

export default handler;
