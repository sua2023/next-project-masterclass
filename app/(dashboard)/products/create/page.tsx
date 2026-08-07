"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { emptyForm, ProductForm } from "../Products";

export default function FormProductCreate() {
    const [form, setForm] = useState<ProductForm>(emptyForm)
    const router = useRouter()
    const [submiting, setSubmiting] = useState(false)

    const API_URL = "https://fakestoreapi.com/products";

    const handleSubmit = async () => {
        setSubmiting(true)
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: form.title,
                    price: Number(form.price),
                    description: form.description,
                    category: form.category,
                    image: form.image
                })
            });
            const created = await response.json()
            setForm(emptyForm)
        } catch (error) {
            console.log(error);
        } finally {
            setSubmiting(false)
        }
    }

    return (
        <div className="w-full">
            <Card className="w-full bg-white">
                <CardHeader>
                    <CardTitle>{"Add product"}</CardTitle>
                    <CardDescription>
                        {"Create a new product"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-4">
                    <Input
                        name="title"
                        placeholder="Title"
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <Input
                        name="price"
                        placeholder="Price"
                        type="number"
                        required
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <Input
                        name="category"
                        placeholder="Category"
                        type="text"
                        required
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <Input
                        name="image"
                        placeholder="Image URL"
                        type="text"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <Input
                        name="description"
                        placeholder="Description"
                        type="text"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="h-8 w-full rounded-lg border border-input text-sm font-medium transition-colors hover:bg-neutral-tertiary"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submiting}
                            className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {submiting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}