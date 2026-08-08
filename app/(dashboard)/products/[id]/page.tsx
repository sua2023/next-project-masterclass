import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IProducts } from "../page";

export default async function ProductDetail({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        redirect("/products");
    }
    const product: IProducts | null = await response.json();
    if (!product) {
        redirect("/products");
    }

    return (
        <div>
            <div className="bg-neutral-primary-soft shadow-xs rounded-base border border-default p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/products">
                        <Button variant="ghost" size="sm">
                            <ArrowLeftIcon />
                            Back to products
                        </Button>
                    </Link>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="flex items-center justify-center bg-white rounded-base p-8">
                        <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
                        <h1 className="text-2xl font-medium text-heading">{product.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-body">
                            <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                            <span>{product.rating?.rate}</span>
                            <span className="text-muted-foreground">({product.rating?.count} reviews)</span>
                        </div>
                        <p className="text-3xl font-semibold text-heading">${product.price}</p>
                        <Separator />
                        <p className="text-sm text-body leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
