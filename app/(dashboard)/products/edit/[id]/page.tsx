import { redirect } from "next/navigation";
import type { Product } from "../../Products";
import EditProduct from "./EditProduct";

export default async function EditProductPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { id } = await params
    const query = await searchParams

    // no data sent (direct visit / refresh) — go back to the list
    if (typeof query.title !== "string") {
        redirect("/products")
    }

    // data sent by the products list — no fetch needed
    const product: Product = {
        id: Number(id),
        title: query.title,
        price: Number(query.price ?? 0),
        description: typeof query.description === "string" ? query.description : "",
        category: typeof query.category === "string" ? query.category : "",
        image: typeof query.image === "string" ? query.image : ""
    }

    return <EditProduct product={product} />
}
