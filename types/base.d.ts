import {NextApiRequest} from "next";
import {Session} from "next-iron-session";

interface NextApiRequestSession extends NextApiRequest{
    session:Session
}
export type {NextApiRequestSession};