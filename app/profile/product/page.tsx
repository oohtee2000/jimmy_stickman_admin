"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  product_code: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  color: string | null;
  image: string | null;
  price: number;
  stock: number;
  sales: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function ProductsPage() {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("=== PRODUCTS FROM SUPABASE ===");
    console.log(data);

    if (error) {
      console.error("Products error:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setProducts(data ?? []);
    setLoading(false);
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case "Active":
        return "default";

      case "Out of Stock":
        return "destructive";

      default:
        return "secondary";
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <p className="text-muted-foreground">
          Loading products...
        </p>
      </main>
    );
  }

  return (
    <main className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Products
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your product catalog.
          </p>
        </div>

        <Button render={ <Link href="product/new">
            Add Product
          </Link>}>
         
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Product count */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {products.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {
                products.filter(
                  (product) => product.status === "Active"
                ).length
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {
                products.filter(
                  (product) =>
                    product.stock > 0 &&
                    product.stock <= 10
                ).length
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Out of Stock
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {
                products.filter(
                  (product) => product.stock === 0
                ).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Products table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>

        <CardContent>
          {products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No products found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      {/* Product */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-muted">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                N/A
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-medium">
                              {product.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {product.product_code}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* SKU */}
                      <TableCell>
                        {product.sku}
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        {product.category}
                      </TableCell>

                      {/* Brand */}
                      <TableCell>
                        {product.brand}
                      </TableCell>

                      {/* Price */}
                      <TableCell>
                        ${Number(product.price).toLocaleString()}
                      </TableCell>

                      {/* Stock */}
                      <TableCell>
                        <span
                          className={
                            product.stock === 0
                              ? "font-medium text-destructive"
                              : product.stock <= 10
                                ? "font-medium text-orange-600"
                                : ""
                          }
                        >
                          {product.stock}
                        </span>
                      </TableCell>

                      {/* Sales */}
                      <TableCell>
                        {product.sales.toLocaleString()}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant={
                            getStatusVariant(product.status)
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}