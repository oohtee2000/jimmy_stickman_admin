"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Stat from "@/components/layout/Stat";

import {
  getProducts,
  getProductStats,
} from "@/components/product/data";

import type {
  Product,
  ProductStat,
} from "@/components/product/types";

import ProductsPagination from "@/components/product/ProductPagination";
import ProductsCardList from "@/components/product/ProductsCardList";
import ProductsTable from "@/components/product/ProductsTable";
import ProductsToolbar from "@/components/product/ProductToolBar";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productStats, setProductStats] = useState<ProductStat[]>([]);

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  /*
   * Load products and statistics
   * from Supabase
   */
async function loadProducts() {
  try {
    setLoading(true);
    setError("");

    const productsData = await getProducts();

    const statsData: ProductStat[] = [
      {
        label: "Total Products",
        value: productsData.length.toLocaleString(),
        sub: "Products in catalog",
        trend: "up",
      },
      {
        label: "Active Products",
        value: productsData
          .filter((p) => p.status === "Active")
          .length.toLocaleString(),
        sub: "Currently available",
        trend: "up",
      },
      {
        label: "Low Stock",
        value: productsData
          .filter(
            (p) => p.stock > 0 && p.stock <= 10
          )
          .length.toLocaleString(),
        sub: "Require restocking",
        trend: "down",
      },
      {
        label: "Out of Stock",
        value: productsData
          .filter(
            (p) =>
              p.stock === 0 ||
              p.status === "Out of Stock"
          )
          .length.toLocaleString(),
        sub: "Unavailable products",
        trend: "neg",
      },
    ];

    setProducts(productsData);
    setProductStats(statsData);
  } catch (error) {
    console.error(error);
    setError(
      error instanceof Error
        ? error.message
        : "Failed to load products."
    );
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadProducts();
}, []);


  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const [productsData, statsData] =
          await Promise.all([
            getProducts(),
            getProductStats(),
          ]);

        console.log(
          "=== PRODUCTS PAGE ==="
        );

        console.log(
          "Products:",
          productsData
        );

        console.log(
          "Product Stats:",
          statsData
        );

        setProducts(productsData);
        setProductStats(statsData);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /*
   * Filter products
   */
  const filteredProducts =
    products.filter((product) => {
      const search =
        query.toLowerCase().trim();

      if (!search) {
        return true;
      }

      return (
        product.name
          .toLowerCase()
          .includes(search) ||
        product.sku
          .toLowerCase()
          .includes(search) ||
        product.id
          .toLowerCase()
          .includes(search) ||
        product.category
          .toLowerCase()
          .includes(search) ||
        product.brand
          .toLowerCase()
          .includes(search)
      );
    });

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        ITEMS_PER_PAGE
    )
  );

  /*
   * Make sure current page is valid
   */
  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Product List"
          description="Here you can find all of your products."
          buttonText="Add product"
          buttonHref="/products/create"
        />

        <div className="flex min-h-75 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <p className="text-sm text-slate-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Product List"
        description="Here you can find all of your products."
        buttonText="Add product"
        buttonHref="/products/create"
      />

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Statistics */}
      <Stat stats={productStats} />

      {/* Toolbar */}
      <ProductsToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
      />

      {/* Products */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        {paginatedProducts.length === 0 ? (
          <div className="flex min-h-50 items-center justify-center">
            <p className="text-sm text-slate-500">
              {query
                ? "No products match your search."
                : "No products found."}
            </p>
          </div>
        ) : (
          <>
            <ProductsTable
              products={paginatedProducts}
              onRefresh={loadProducts}
            />

            <ProductsCardList
              products={paginatedProducts}
              onRefresh={loadProducts}
            />
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <ProductsPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}