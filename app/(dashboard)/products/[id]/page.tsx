import Link from "next/link";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IProducts } from "../page";
import { redirect } from "next/navigation";
function Rating({ rate, count }: { rate: number; count: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        className={
                            star <= Math.round(rate)
                                ? "size-4 fill-amber-400 text-amber-400"
                                : "size-4 text-muted-foreground"
                        }
                    />
                ))}
            </div>
            <span className="text-sm font-medium">{rate}</span>
            <span className="text-sm text-muted-foreground">({count} reviews)</span>
        </div>
    );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        redirect("/products");
    }

    const product: IProducts = await res.json();

    return (
        <div className="mx-auto max-w-5xl space-y-4">
            <Button variant="ghost" nativeButton={false} render={<Link href="/products" />}>
                <ArrowLeftIcon /> Back to products
            </Button>

            <Card>
                <CardContent className="grid gap-8 md:grid-cols-2">
                    <div className="flex items-center justify-center rounded-xl bg-white p-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-80 w-auto object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <span className="inline-flex w-fit items-center rounded-full border border-default bg-neutral-secondary-soft px-2.5 py-0.5 text-xs font-medium capitalize">
                                {product.category}
                            </span>
                            <h1 className="font-heading text-2xl font-semibold leading-tight text-heading">
                                {product.title}
                            </h1>
                            <Rating rate={Number(product.rating.rate)} count={product.rating.count} />
                        </div>

                        <p className="text-3xl font-bold text-heading">
                            ${product.price.toFixed(2)}
                        </p>

                        <Separator />

                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-heading">Description</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        <Separator />

                        <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt className="text-muted-foreground">Product ID</dt>
                            <dd className="font-medium">#{product.id}</dd>
                            <dt className="text-muted-foreground">Category</dt>
                            <dd className="font-medium capitalize">{product.category}</dd>
                        </dl>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
