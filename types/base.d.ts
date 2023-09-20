import {NextApiRequest} from "next";
import {IronSession} from "iron-session";
import * as IronSession from "iron-session";
import {User} from "../src/entity/User";

declare module "iron-session" {
    interface IronSessionData {
        currentUser?: User;
    }
}
interface NextApiRequestSession extends NextApiRequest{
    session:IronSession
}
export type {NextApiRequestSession};