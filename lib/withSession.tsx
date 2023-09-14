import {withIronSession} from "next-iron-session";
import {NextApiHandler} from "next";
import * as process from "process";

export function withSession(handler:NextApiHandler){
    return withIronSession(handler,{
        password:process.env.SECRET,
        cookieName:"blog",
        cookieOptions:{secure:false}
    })
}