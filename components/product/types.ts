export type ProductStatus =
  | "Active"
  | "Draft"
  | "Out of Stock"
  | "Archived";




export type ProductGender =
  | "Men"
  | "Women"
  | "Unisex";

export type ProductAgeGroup =
  | "Adult"
  | "Kids";

export type ProductCategory =
  | "Shoes"
  | "Clothes"
  | "Bags"
  | "Accessories";

export type ProductActivity =
  | "Sport"
  | "Lifestyle"
  | "Training"
  | "Running";

export type ProductType =
  | "Original"
  | "Replica";


export interface Product {
  id: string;

  name: string;
  sku: string;
 gender: string | null;
  ageGroup: ProductAgeGroup | null;

  category: ProductCategory;
  subcategory: string | null;

  activity: ProductActivity | null;
  productType: ProductType | null;
 
  brand: string;
  color: string;

  image: string;

  price: number;

  stock: number;
  sales: number;

  status: ProductStatus;

  createdAt: string;
}




export interface ProductStat {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "flat" | "neg";
}

export const statusStyles: Record<ProductStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Draft: "border-slate-200 bg-slate-100 text-slate-600",
  "Out of Stock": "border-amber-200 bg-amber-50 text-amber-600",
  Archived: "border-rose-200 bg-rose-50 text-rose-600",
};

export const statusDot: Record<ProductStatus, string> = {
  Active: "bg-emerald-500",
  Draft: "bg-slate-500",
  "Out of Stock": "bg-amber-500",
  Archived: "bg-rose-500",
};