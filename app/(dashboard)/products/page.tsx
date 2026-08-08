"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { MoreHorizontalIcon } from "lucide-react"
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
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
    const [products, setProduct] = useState<IProducts[] | []>([])
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [isDelete, setIsDelete] = useState(false)
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
            if (form.id > 0) {
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

                setProduct((prevProducts) =>
                    prevProducts.map((p) => p.id === form.id ? result : p)
                );
                setOpen(false);
                setForm({
                    id: 0,
                    title: "",
                    description: "",
                    category: "",
                    image: "", price: 0
                })
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

                setProduct((prevProducts) => [result, ...prevProducts]);
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

    const handleDelete = async () => {
        try {
            console.log(form);
            const response = await fetch(`${url}/${form.id}`, {
                method: "DELETE",
            });

            if (response.status == 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setProduct((prevProducts) =>
                prevProducts.filter((p) => p.id !== form.id)
            );
            setIsDelete(false);
            setForm({
                id: 0,
                title: "",
                category: "",
                description: "",
                image: "",
                price: 0
            });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    // localhost:3000/products/1
    // localhost:3000/products/detail?data=kdkdksdf
    const handleDetails = (row: IProducts) => {
        const productData = encodeURIComponent(JSON.stringify(row));
        // router.push(`/products/detail?data=${productData}`);
         window.history.pushState({ product: row }, "", "/products/detail");
    }
    return (
        <div>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <div className="flex justify-between items-center p-2">
                    <h4>Product list</h4>
                    <Dialog open={open} onOpenChange={() => {
                        setOpen(!open);
                        setForm({
                            id: 0,
                            title: "",
                            description: "",
                            category: "",
                            image: "", price: 0
                        })
                    }}>
                        <DialogTrigger render={<Button variant="default" />}>
                            Add Product
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{form.id > 0 ? "Edit Product" : "Add Product"}</DialogTitle>
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
                                    <Button type="button" onClick={onSubmit}>
                                        {form.id > 0 ? "Save Changes" : "Submit"}
                                    </Button>
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
                                                <DropdownMenuItem onClick={() => {
                                                    setForm(row);
                                                    setOpen(true);
                                                }}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => {
                                                    setIsDelete(true);
                                                    setForm(row);
                                                }}>Delete</DropdownMenuItem>
                                                {/* <DropdownMenuItem onClick={() => handleDetails(row)}>Details</DropdownMenuItem> */}

                                                <DropdownMenuItem onClick={()=> router.push(`/products/${row.id}`)}>Details</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AlertDialog open={isDelete} onOpenChange={() => setIsDelete(!isDelete)}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to delete this product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
