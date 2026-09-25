"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { Product } from "./types";

import ProductStatusBadge from "./ProductStatusBadge";
import EditProductDialog from "./EditProductDialog";

interface ProductsCardListProps {
  products: Product[];
  onProductUpdated?: (product: Product) => void;
   onRefresh: () => void;
}

export default function ProductsCardList({
  products,
  onProductUpdated,
  onRefresh,
}: ProductsCardListProps) {
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  return (
    <>
      <ul className="divide-y divide-slate-100 md:hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4"
          >
            <div className="flex items-start gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                      {product.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {product.brand} •{" "}
                      {product.color}
                    </p>
                  </div>

                  <ProductStatusBadge
                    status={product.status}
                    className="shrink-0"
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400">
                      SKU
                    </p>

                    <p className="truncate font-medium text-slate-900">
                      {product.sku}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Category
                    </p>

                    <p className="font-medium text-slate-900">
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Price
                    </p>

                    <p className="font-medium text-slate-900">
                      ${product.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Stock
                    </p>

                    <p className="font-medium text-slate-900">
                      {product.stock}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-slate-400">
                      Sales
                    </p>

                    <p className="font-medium text-slate-900">
                      {product.sales.toLocaleString()}{" "}
                      sold
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProduct(product)
                    }
                    className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-md transition hover:bg-slate-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <EditProductDialog
        product={editingProduct}
        open={editingProduct !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
          }
        }}
        onUpdated={(updatedProduct) => {
          onProductUpdated?.(updatedProduct);
          setEditingProduct(null);
          onRefresh();
        }}
      />
    </>
  );
}