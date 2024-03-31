import * as process from "process";


export const sessionOptions = {
    password:process.env.SECRET,
    cookieName:"blog",
    cookieOptions:{secure:false}
};