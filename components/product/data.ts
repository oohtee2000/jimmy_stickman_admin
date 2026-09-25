import { createClient } from "@/lib/supabase/client";

import type {
  Product,
  ProductStat,
} from "./types";

type SupabaseProduct = {
  id: string;
  product_code: string;
  name: string;
  sku: string;
  gender: string | null;
  age_group: Product["ageGroup"] | null;
  category: string;
  subcategory: string | null;
  activity: Product["activity"] | null;
  product_type: Product["productType"] | null;

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

function isProductStatus(
  status: string
): status is Product["status"] {
  return (
    status === "Active" ||
    status === "Draft" ||
    status === "Out of Stock" ||
    status === "Archived"
  );
}

function isProductCategory(
  category: string
): category is Product["category"] {
  return (
    category === "Shoes" ||
    category === "Clothes" ||
    category === "Bags" ||
    category === "Accessories"
  );
}

function mapProduct(
  product: SupabaseProduct
): Product {
  if (!isProductStatus(product.status)) {
    throw new Error(
      `Invalid product status: ${product.status}`
    );
  }

  if (!isProductCategory(product.category)) {
    throw new Error(
      `Invalid product category: ${product.category}`
    );
  }

  return {
    id: product.product_code,

    name: product.name,

    sku: product.sku,

    gender: product.gender as Product["gender"],

    ageGroup: product.age_group,

    category: product.category,

    subcategory: product.subcategory,

    activity: product.activity,

    productType: product.product_type,

    brand: product.brand,

    color: product.color ?? "",

    image: product.image ?? "",

    price: Number(product.price),

    stock: product.stock,

    sales: product.sales,

    status: product.status,

    createdAt: new Date(
      product.created_at
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
}
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Failed to fetch products:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "=== PRODUCTS FROM SUPABASE ==="
  );

  console.log(data);

  return (
    (data as SupabaseProduct[] | null) ?? []
  ).map(mapProduct);
}

export async function getProductStats(): Promise<ProductStat[]> {
  const products = await getProducts();

  const totalProducts =
    products.length;

  const activeProducts =
    products.filter(
      (product) =>
        product.status === "Active"
    ).length;

  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <= 10
    ).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        product.stock === 0 ||
        product.status === "Out of Stock"
    ).length;

  return [
    {
      label: "Total Products",

      value:
        totalProducts.toLocaleString(),

      sub: "Products in catalog",

      trend: "up",
    },

    {
      label: "Active Products",

      value:
        activeProducts.toLocaleString(),

      sub: "Currently available",

      trend: "up",
    },

    {
      label: "Low Stock",

      value:
        lowStockProducts.toLocaleString(),

      sub: "Require restocking",

      trend: "down",
    },

    {
      label: "Out of Stock",

      value:
        outOfStockProducts.toLocaleString(),

      sub: "Unavailable products",

      trend: "neg",
    },
  ];
}

export const statusStyles: Record<
  Product["status"],
  string
> = {
  Active:
    "border-emerald-200 bg-emerald-50 text-emerald-600",

  Draft:
    "border-slate-200 bg-slate-100 text-slate-600",

  "Out of Stock":
    "border-amber-200 bg-amber-50 text-amber-600",

  Archived:
    "border-rose-200 bg-rose-50 text-rose-600",
};

export const statusDot: Record<
  Product["status"],
  string
> = {
  Active: "bg-emerald-500",

  Draft: "bg-slate-500",

  "Out of Stock": "bg-amber-500",

  Archived: "bg-rose-500",
};