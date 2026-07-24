"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { login } from "./actions";

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
