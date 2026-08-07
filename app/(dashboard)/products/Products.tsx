"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormEditProduct from "./FormEditProduct";

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

export const emptyForm: ProductForm = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
}

export default function ProductsComponent() {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
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
        setForm(emptyForm)
        setIsFormOpen(true)
    }

    // send all product data in the URL so the edit page doesn't need to fetch
    const openEdit = (product: Product) => {
        const query = new URLSearchParams({
            title: product.title,
            price: String(product.price),
            description: product.description,
            category: product.category,
            image: product.image
        })
        router.push(`/products/edit/${product.id}?${query.toString()}`)
    }

    // CREATE
    const handleSubmit = async () => {
        setSaving(true)
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
            // fakestoreapi does not persist, so keep the new product in local state
            setProducts([...products, { ...created, price: Number(form.price), title: form.title, description: form.description, category: form.category, image: form.image }])
            setIsFormOpen(false)
            setForm(emptyForm)
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
                    onClick={()=>redirect('/products/create')}
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={<Button variant="ghost" className="h-8 w-8 p-0" />}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem onClick={() => openEdit(product)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(product.id)} >Delete</DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isFormOpen && (
                <FormEditProduct
                    isEdit={false}
                    form={form}
                    saving={saving}
                    onChange={setForm}
                    onCancel={() => setIsFormOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
