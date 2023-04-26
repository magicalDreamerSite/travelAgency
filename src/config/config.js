// Read environment variables
import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;

export const POSTGREE_HOST = process.env.POSTGREE_HOST;
export const POSTGREE_PORT = process.env.POSTGREE_PORT;
export const POSTGREE_DB = process.env.POSTGREE_DB;
export const POSTGREE_USER = process.env.POSTGREE_USER;
export const POSTGREE_PASS = process.env.POSTGREE_PASS;

export default {SECRET_JWT : process.env.SECRET_JWT};