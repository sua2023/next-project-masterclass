import { NextRequest, NextResponse } from "next/server";
const publicRoutes = ["/login", "/signup"]
export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}