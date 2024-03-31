import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { visitorPath } from "utils/middlewareConfig";
import { sessionOptions } from "utils/sessionOptions";

export async function middleware(request: NextRequest) {
  const response=NextResponse.next();
  const session=await getIronSession(request,response,sessionOptions)
  for(let i=0;i<visitorPath.length;i++){
    const pathRegex=new RegExp(visitorPath[i])
    if(pathRegex.test(request.nextUrl.pathname)){
      return response
    }
  }

  if(session.currentUser?.id!=undefined){
    //这里配一些登录用户才能见到的页面
  }
  
  return NextResponse.redirect(new URL('/error',request.url))
}

// 这个也可以不需要，在middleware中处理也可以。
export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};