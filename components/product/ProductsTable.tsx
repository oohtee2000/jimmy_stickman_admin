"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { Product } from "./types";
import ProductStatusBadge from "./ProductStatusBadge";
import EditProductDialog from "./EditProductDialog";

interface ProductsTableProps {
  products: Product[];
  onProductUpdated?: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductsTable({
  products,
  onProductUpdated,
  onRefresh,
}: ProductsTableProps) {
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);


  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Product
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                SKU
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Category
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Price
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Stock
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Sales
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-sm font-medium text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-100"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={44}
                      height={44}
                      className="rounded-lg border border-slate-200 object-cover"
                    />

                    <div>
                      <p className="font-medium text-slate-900">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {product.brand} •{" "}
                        {product.color}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-slate-700">
                    {product.sku}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <p className="text-slate-700">
                    {product.category}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-slate-900">
                    ${product.price}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-slate-900">
                    {product.stock}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-slate-900">
                    {product.sales.toLocaleString()}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <ProductStatusBadge
                    status={product.status}
                  />
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProduct(product)
                      }
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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