"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";

export type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating?: {
        rate: number,
        count: number
    }
}

export type ProductForm = {
    title: string,
    price: string,
    description: string,
    category: string,
    image: string
}

const emptyForm: ProductForm = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
}

export default function ProductsComponent() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState<ProductForm>(emptyForm)

    // READ
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL)
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const openCreate = () => {
        setEditingId(null)
        setForm(emptyForm)
        setIsFormOpen(true)
    }

    const openEdit = (product: Product) => {
        setEditingId(product.id)
        setForm({
            title: product.title,
            price: String(product.price),
            description: product.description,
            category: product.category,
            image: product.image
        })
        setIsFormOpen(true)
    }

    // CREATE + UPDATE
    const handleSubmit = async () => {
        setSaving(true)
        const body = JSON.stringify({
            title: form.title,
            price: Number(form.price),
            description: form.description,
            category: form.category,
            image: form.image
        })
        try {
            if (editingId === null) {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });
                const created = await response.json()
                // fakestoreapi does not persist, so keep the new product in local state
                setProducts([...products, { ...created, price: Number(form.price), title: form.title, description: form.description, category: form.category, image: form.image }])
            } else {
                await fetch(`${API_URL}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });
                setProducts(products.map((p) => p.id === editingId ? { ...p, title: form.title, price: Number(form.price), description: form.description, category: form.category, image: form.image } : p))
            }
            setIsFormOpen(false)
            setForm(emptyForm)
            setEditingId(null)
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false)
        }
    }

    // DELETE
    const handleDelete = async (id: number) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            setProducts(products.filter((p) => p.id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-heading">Products</h1>
                <button
                    type="button"
                    onClick={openCreate}
                    className="h-8 px-3 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Add product
                </button>
            </div>

            {loading ? (
                <p className="text-body">Loading...</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-default">
                    <table className="w-full text-sm text-left text-body">
                        <thead className="text-xs uppercase bg-neutral-primary-soft text-heading">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t border-default hover:bg-neutral-tertiary">
                                    <td className="px-4 py-2">
                                        <img src={product.image} alt={product.title} className="w-10 h-10 object-contain" />
                                    </td>
                                    <td className="px-4 py-2 max-w-xs truncate font-medium">{product.title}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2">{product.rating ? `${product.rating.rate} (${product.rating.count})` : "-"}</td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(product)}
                                            className="px-2 py-1 text-sm font-medium rounded hover:bg-neutral-tertiary-medium hover:text-heading"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(product.id)}
                                            className="px-2 py-1 text-sm font-medium text-red-600 rounded hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <Card className="w-full max-w-sm bg-white">
                        <CardHeader>
                            <CardTitle>{editingId === null ? "Add product" : "Edit product"}</CardTitle>
                            <CardDescription>
                                {editingId === null ? "Create a new product" : `Update product #${editingId}`}
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
                                    onClick={() => setIsFormOpen(false)}
                                    className="h-8 w-full rounded-lg border border-input text-sm font-medium transition-colors hover:bg-neutral-tertiary"
                                >
                                    Cancel
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
            )}
        </div>
    );
}
