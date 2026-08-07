"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export interface IProducts {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number
    rating: {
        count: number
        rate: string;
    }
    title: string;
}
export interface IFormProduct {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number
}
export default function Product() {
    const router = useRouter()
    const [products, setProduct] = useState<IProducts[] | []>([])
    const [open, setOpen] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [form, setForm] = useState<IFormProduct>({
        id: 0,
        title: "",
        category: "",
        description: "",
        image: "",
        price: 0
    })

    const url = "https://fakestoreapi.com/products";
    const fetchProducts = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            setProduct(data)
            return data;
        } catch (error) {
            console.error("Failed to fetch products:", error);
            throw error;
        }
    }
    useEffect(() => {
        fetchProducts()
    }, []);

    const onSubmit = async () => {
        try {
            if (form.id !== 0) {
                const response = await fetch(`${url}/${form.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result: IProducts = await response.json();

                setProduct((prevProducts) => prevProducts.map((product) =>
                    product.id === form.id ? result : product
                ));
                setOpen(false);
                setForm({
                    id: 0,
                    title: "",
                    description: "",
                    category: "",
                    image: "", price: 0
                })
                setDeleteId(null);
                return;
            } else {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result: IProducts = await response.json();

                setProduct((prevProducts) => prevProducts.filter((product) => product.id !== form.id).concat(result));
                setOpen(false);
                setForm({
                    id: 0,
                    title: "",
                    description: "",
                    category: "",
                    image: "", price: 0
                })
            }

        } catch (error) {
            console.error("Error creating product:", error);
        }
    }

    const onDelete = async () => {
        if (deleteId === null) return;
        try {
            const response = await fetch(`${url}/${deleteId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setProduct((prevProducts) => prevProducts.filter((product) => product.id !== deleteId));
            setIsDelete(false);
            setDeleteId(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }


    return (
        <div>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <div className="flex justify-between items-center p-2">
                    <h4>Product list</h4>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger render={<Button variant="default" />}>
                            {form.id !== 0 ? "Edit Product" : "Add Product"}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{form.id !== 0 ? "Edit Product" : "Add new product"}</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Product name</FieldLabel>
                                    <Input type="text" placeholder="Enter product name" value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                </Field>
                                <Field>
                                    <FieldLabel>Description</FieldLabel>
                                    <Input type="text" placeholder="Enter product description" value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </Field>
                                <Field>
                                    <FieldLabel>Price</FieldLabel>
                                    <Input type="number" placeholder="Price" value={form.price} required
                                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                                </Field>
                                <Field>
                                    <FieldLabel>Category</FieldLabel>
                                    <Input type="text" placeholder="Category" value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })} />
                                </Field>
                                <Field>
                                    <FieldLabel>Image url</FieldLabel>
                                    <Input type="text" placeholder="Image url" value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })} />
                                </Field>
                                <Field orientation="horizontal">
                                    <Button type="reset" variant="outline" onClick={() => setOpen(!open)}>
                                        Close
                                    </Button>
                                    <Button type="button" onClick={onSubmit}>Submit</Button>
                                </Field>
                            </FieldGroup>
                        </DialogContent>
                    </Dialog>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 && products.map((row, index) => (
                            <tr key={index} className="bg-neutral-primary border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {row.id}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={row.image} alt="image" width={100} height={100} />
                                </td>
                                <td className="px-6 py-4">
                                    {row.price}
                                </td>
                                <td className="px-6 py-4">
                                    {row.description}
                                </td>
                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger render={<Button variant="ghost" />}>
                                            <MoreHorizontalIcon />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem id="edit" onClick={() => {
                                                    setForm({
                                                        id: row.id,
                                                        title: row.title,
                                                        category: row.category,
                                                        description: row.description,
                                                        image: row.image,
                                                        price: row.price
                                                    })
                                                    setOpen(true);
                                                }}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem id="delete" onClick={() => {
                                                    setDeleteId(row.id);
                                                    setIsDelete(true);
                                                }}>Delete</DropdownMenuItem>
                                                <DropdownMenuItem id="details" onClick={() => router.push(`/products/${row.id}`)}>Details</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AlertDialog open={isDelete} onOpenChange={setIsDelete}>
                    <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the product.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={onDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    )
}
