"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product, ProductForm } from "../../Products";

export default function EditProduct({ product }: { product: Product }) {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState<ProductForm>({
        title: product.title,
        price: String(product.price),
        description: product.description,
        category: product.category,
        image: product.image
    })

    // UPDATE
    const handleSubmit = async () => {
        setSaving(true)
        try {
            await fetch(`https://fakestoreapi.com/products/${product.id}`, {
                method: 'PUT',
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
            router.push("/products")
        } catch (error) {
            console.log(error);
            setSaving(false)
        }
    }

    return (
        <div>
            <Card className="w-full bg-white">
                <CardHeader>
                    <CardTitle>{"Edit product"}</CardTitle>
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
                            disabled={saving}
                            className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
