"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductForm = {
  product_code: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  color: string;
  image: string;
  price: string;
  stock: string;
  status: string;
};

const emptyProduct: ProductForm = {
  product_code: "",
  name: "",
  sku: "",
  category: "",
  brand: "",
  color: "",
  image: "",
  price: "",
  stock: "",
  status: "Draft",
};

export default function NewProductPage() {
  const supabase = createClient();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [products, setProducts] = useState<ProductForm[]>([
    { ...emptyProduct },
  ]);

  function updateProduct(
    index: number,
    field: keyof ProductForm,
    value: string
  ) {
    setProducts((previous) =>
      previous.map((product, productIndex) =>
        productIndex === index
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  }

  function addProduct() {
    setProducts((previous) => [
      ...previous,
      { ...emptyProduct },
    ]);
  }

  function removeProduct(index: number) {
    setProducts((previous) =>
      previous.filter(
        (_, productIndex) => productIndex !== index
      )
    );
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setError("");

    const productsToInsert = products.map((product) => ({
      product_code: product.product_code,
      name: product.name,
      sku: product.sku,
      category: product.category,
      brand: product.brand,
      color: product.color || null,
      image: product.image || null,
      price: Number(product.price),
      stock: Number(product.stock),
      sales: 0,
      status: product.status,
    }));

    const { data, error: insertError } = await supabase
      .from("products")
      .insert(productsToInsert)
      .select();

    console.log("=== NEW PRODUCTS ===");
    console.log(data);

    if (insertError) {
      console.error(
        "Product insert error:",
        insertError
      );

      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/products");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Add Products</CardTitle>

              <CardDescription>
                Add one or multiple products to your catalog.
              </CardDescription>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addProduct}
            >
              + Add Another Product
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {products.map((product, index) => (
              <Card
                key={index}
                className="border-muted"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Product {index + 1}
                      </CardTitle>

                      <CardDescription>
                        Enter the product details.
                      </CardDescription>
                    </div>

                    {products.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          removeProduct(index)
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Basic information */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-semibold">
                        Basic Information
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Enter the main product details.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Product ID */}
                      <div className="space-y-2">
                        <Label>
                          Product ID
                        </Label>

                        <Input
                          value={product.product_code}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "product_code",
                              e.target.value
                            )
                          }
                          placeholder="PRD-1007"
                          required
                        />
                      </div>

                      {/* SKU */}
                      <div className="space-y-2">
                        <Label>SKU</Label>

                        <Input
                          value={product.sku}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "sku",
                              e.target.value
                            )
                          }
                          placeholder="NK-AIR-270"
                          required
                        />
                      </div>
                    </div>

                    {/* Product name */}
                    <div className="space-y-2">
                      <Label>Product Name</Label>

                      <Input
                        value={product.name}
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Nike Air Max 270"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Category */}
                      <div className="space-y-2">
                        <Label>Category</Label>

                        <Input
                          value={product.category}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "category",
                              e.target.value
                            )
                          }
                          placeholder="Shoes"
                          required
                        />
                      </div>

                      {/* Brand */}
                      <div className="space-y-2">
                        <Label>Brand</Label>

                        <Input
                          value={product.brand}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "brand",
                              e.target.value
                            )
                          }
                          placeholder="Nike"
                          required
                        />
                      </div>
                    </div>

                    {/* Color */}
                    <div className="space-y-2">
                      <Label>Color</Label>

                      <Input
                        value={product.color}
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "color",
                            e.target.value
                          )
                        }
                        placeholder="Black"
                      />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-semibold">
                        Product Image
                      </h2>
                    </div>

                    <div className="space-y-2">
                      <Label>Image URL</Label>

                      <Input
                        value={product.image}
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  {/* Inventory */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-semibold">
                        Inventory
                      </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Price */}
                      <div className="space-y-2">
                        <Label>Price</Label>

                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="120"
                          required
                        />
                      </div>

                      {/* Stock */}
                      <div className="space-y-2">
                        <Label>Stock</Label>

                        <Input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) =>
                            updateProduct(
                              index,
                              "stock",
                              e.target.value
                            )
                          }
                          placeholder="50"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label>Status</Label>

                    <Select
  value={product.status}
  onValueChange={(value) =>
    updateProduct(
      index,
      "status",
      value ?? "Draft"
    )
  }
>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Draft">
                          Draft
                        </SelectItem>

                        <SelectItem value="Active">
                          Active
                        </SelectItem>

                        <SelectItem value="Archived">
                          Archived
                        </SelectItem>

                        <SelectItem value="Out of Stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Error */}
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Add another */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addProduct}
            >
              + Add Another Product
            </Button>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  router.push("/products")
                }
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Adding Products..."
                  : `Add ${products.length} Product${
                      products.length > 1 ? "s" : ""
                    }`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}