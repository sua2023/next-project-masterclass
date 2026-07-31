import ProductsComponent from "./Products";

export const metadata = {
    title: "Products",
    description: "Manage products",
    keywords: ["products", "crud", "store"]
};
export default function Products() {
    return (
        <div>
            <ProductsComponent />
        </div>
    );
}
