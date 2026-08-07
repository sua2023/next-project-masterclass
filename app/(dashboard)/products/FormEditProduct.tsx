"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductForm } from "./Products";

interface FormAction {
    isEdit: boolean;
    form: ProductForm;
    saving: boolean;
    onChange: (form: ProductForm) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export default function FormEditProduct({ isEdit, form, saving, onChange, onCancel, onSubmit }: FormAction) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Card className="w-full max-w-sm bg-white">
                <CardHeader>
                    <CardTitle>{isEdit ? "Edit product" : "Add product"}</CardTitle>
                    <CardDescription>
                        {isEdit ? `Update "${form.title}"` : "Create a new product"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-4">
                    <Input
                        name="title"
                        placeholder="Title"
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => onChange({ ...form, title: e.target.value })}
                    />
                    <Input
                        name="price"
                        placeholder="Price"
                        type="number"
                        required
                        value={form.price}
                        onChange={(e) => onChange({ ...form, price: e.target.value })}
                    />
                    <Input
                        name="category"
                        placeholder="Category"
                        type="text"
                        required
                        value={form.category}
                        onChange={(e) => onChange({ ...form, category: e.target.value })}
                    />
                    <Input
                        name="image"
                        placeholder="Image URL"
                        type="text"
                        value={form.image}
                        onChange={(e) => onChange({ ...form, image: e.target.value })}
                    />
                    <Input
                        name="description"
                        placeholder="Description"
                        type="text"
                        value={form.description}
                        onChange={(e) => onChange({ ...form, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="h-8 w-full rounded-lg border border-input text-sm font-medium transition-colors hover:bg-neutral-tertiary"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={saving}
                            className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
