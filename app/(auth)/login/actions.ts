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
