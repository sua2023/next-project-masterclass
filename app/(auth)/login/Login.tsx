"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type LoginData = {
    username: string,
    password: string
}
export default function LoginComponent() {
    const router = useRouter();
    const [data, setData] = useState<LoginData>({
        username: "",
        password: ""
    })
    const handleSubmit = async () => {
        try {
            const url = "https://fakestoreapi.com/auth/login"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: data.username, password: data.password })
            });
            if (response.ok) {
                router.push("/")
            }
            const { token } = await response.json()
            setCookie("token", token)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
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
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Sign in
                    </button>
                </CardContent>
            </Card>
        </div>
    );
}
