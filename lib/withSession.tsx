import { getIronSession } from "iron-session/edge";
import { withIronSessionApiRoute, withIronSessionSsr  } from "iron-session/next";
import {GetServerSideProps, NextApiHandler} from "next";
import { NextRequest, NextResponse } from "next/server";
import { sessionOptions } from "utils/sessionOptions";

export function withSessionSSR(handler:GetServerSideProps){
    return withIronSessionSsr(handler, sessionOptions)
}

export function withSessionAPI(handler:NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions)
}

export async function withSessionGet(req: NextRequest,res:NextResponse){
    return await getIronSession(req,res,sessionOptions)
}