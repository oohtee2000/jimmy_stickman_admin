"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import type { Product } from "./types";
import ProductStatusBadge from "./ProductStatusBadge";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
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
              {/* Product */}
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
                      {product.brand} • {product.color}
                    </p>
                  </div>
                </div>
              </td>

              {/* SKU */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-700">
                  {product.sku}
                </p>
              </td>

              {/* Category */}
              <td className="px-4 py-4">
                <p className="text-slate-700">
                  {product.category}
                </p>
              </td>

              {/* Price */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  ${product.price}
                </p>
              </td>

              {/* Stock */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  {product.stock}
                </p>
              </td>

              {/* Sales */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  {product.sales.toLocaleString()}
                </p>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <ProductStatusBadge status={product.status} />
              </td>

              {/* Action */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <button className="text-sm text-slate-600 hover:text-slate-900">
                    Edit
                  </button>

                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}