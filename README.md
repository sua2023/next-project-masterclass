This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# next-project-masterclass


## Make Project

1. Login UI Design and API Integration (`app/(auth)/login/Login.tsx`):

```tsx
export default function LoginComponent() {
    const [state, formAction, pending] = useActionState(login, undefined);
    return (
        <div className="font-sans dark:bg-black flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Sign in to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 pt-4">
                        <Input
                            name="username"
                            placeholder="Username"
                            type="text"
                            required
                            disabled={pending}
                        />
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                            disabled={pending}
                        />
                        {state?.error && (
                            <p className="text-sm text-destructive">{state.error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={pending}
                            className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {pending ? "Signing in..." : "Sign in"}
                        </button>
                    </CardContent>
                    
                </form>
            </Card>
        </div>
    );
}
```

2. Actions (`app/(auth)/login/actions.ts`) — a Server Action that calls the login API and stores the token in an httpOnly cookie:

```ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = { error: string } | undefined;

export async function login(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
        return { error: "Username and password are required" };
    }

    const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        return { error: "Invalid username or password" };
    }

    const { token } = await res.json();

    if (!token) {
        return { error: "Login failed, please try again" };
    }


    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/");
}
```

3. Route protection with Proxy (`proxy.ts`):

> Starting with Next.js 16, Middleware is called **Proxy**. The `proxy.ts` file lives in the project root (same level as `app`) and runs before a request is completed — here we use it as an optimistic auth check.

- Visitors without a `token` cookie are redirected to `/login` on any protected route.
- Logged-in users visiting a public route (`/login`, `/signup`) are redirected to `/`.
- The `matcher` excludes `api`, `_next/static`, `_next/image`, and `favicon.ico` so the proxy only runs on page routes.

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/signup']

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
```
