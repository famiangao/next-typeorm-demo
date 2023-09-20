

// export function withSession(handler:NextApiHandler){
//     return withIronSessionApiRoute(handler,{
//         password:process.env.SECRET,
//         cookieName:"blog",
//         cookieOptions:{secure:false}
//     })
// }
import { withIronSessionApiRoute, withIronSessionSsr  } from "iron-session/next";
import {GetServerSideProps, GetServerSidePropsResult, NextApiHandler} from "next";
import * as process from "process";

const sessionOptions = {
    password:process.env.SECRET,
    cookieName:"blog",
    cookieOptions:{secure:false}
};

export function withSessionSSR(handler:GetServerSideProps){
    return withIronSessionSsr(handler, sessionOptions)
}

export function withSessionAPI(handler:NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions)
}