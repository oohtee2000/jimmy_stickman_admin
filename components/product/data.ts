import type { Product, ProductStat } from "./types";

export const products: Product[] = [
  {
    id: "PRD-1001",

    name: "Nike Air Max 270",
    sku: "NK-AM270-BLK",

    category: "Shoes",
    brand: "Nike",
    color: "Black",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

    price: 120,

    stock: 56,
    sales: 1294,

    status: "Active",

    createdAt: "22 Jul, 2026",
  },

  {
    id: "PRD-1002",

    name: "MacBook Pro M4",
    sku: "APL-MBP-M4",

    category: "Laptop",
    brand: "Apple",
    color: "Space Black",

    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",

    price: 2499,

    stock: 18,
    sales: 246,

    status: "Active",

    createdAt: "19 Jul, 2026",
  },

  {
    id: "PRD-1003",

    name: "Sony WH-1000XM5",
    sku: "SNY-XM5",

    category: "Headphones",
    brand: "Sony",
    color: "Silver",

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

    price: 399,

    stock: 0,
    sales: 817,

    status: "Out of Stock",

    createdAt: "18 Jul, 2026",
  },

  {
    id: "PRD-1004",

    name: "Apple Watch Ultra 2",
    sku: "APL-U2",

    category: "Smart Watch",
    brand: "Apple",
    color: "Titanium",

    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

    price: 799,

    stock: 34,
    sales: 478,

    status: "Active",

    createdAt: "16 Jul, 2026",
  },

  {
    id: "PRD-1005",

    name: "Logitech MX Master 3S",
    sku: "LOG-MX3S",

    category: "Accessories",
    brand: "Logitech",
    color: "Graphite",

    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",

    price: 99,

    stock: 140,
    sales: 1742,

    status: "Draft",

    createdAt: "14 Jul, 2026",
  },

  {
    id: "PRD-1006",

    name: "Samsung Galaxy S25",
    sku: "SMS-S25",

    category: "Smartphone",
    brand: "Samsung",
    color: "Phantom Black",

    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",

    price: 999,

    stock: 65,
    sales: 931,

    status: "Archived",

    createdAt: "10 Jul, 2026",
  },
  {
    id: "PRD-10011",

    name: "Nike Air Max 270",
    sku: "NK-AM270-BLK",

    category: "Shoes",
    brand: "Nike",
    color: "Black",

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

    price: 120,

    stock: 56,
    sales: 1294,

    status: "Active",

    createdAt: "22 Jul, 2026",
  },

  {
    id: "PRD-10021",

    name: "MacBook Pro M4",
    sku: "APL-MBP-M4",

    category: "Laptop",
    brand: "Apple",
    color: "Space Black",

    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",

    price: 2499,

    stock: 18,
    sales: 246,

    status: "Active",

    createdAt: "19 Jul, 2026",
  },

  {
    id: "PRD-10031",

    name: "Sony WH-1000XM5",
    sku: "SNY-XM5",

    category: "Headphones",
    brand: "Sony",
    color: "Silver",

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

    price: 399,

    stock: 0,
    sales: 817,

    status: "Out of Stock",

    createdAt: "18 Jul, 2026",
  },

  {
    id: "PRD-10041",

    name: "Apple Watch Ultra 2",
    sku: "APL-U2",

    category: "Smart Watch",
    brand: "Apple",
    color: "Titanium",

    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

    price: 799,

    stock: 34,
    sales: 478,

    status: "Active",

    createdAt: "16 Jul, 2026",
  },

  {
    id: "PRD-10051",

    name: "Logitech MX Master 3S",
    sku: "LOG-MX3S",

    category: "Accessories",
    brand: "Logitech",
    color: "Graphite",

    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",

    price: 99,

    stock: 140,
    sales: 1742,

    status: "Draft",

    createdAt: "14 Jul, 2026",
  },

  {
    id: "PRD-10061",

    name: "Samsung Galaxy S25",
    sku: "SMS-S25",

    category: "Smartphone",
    brand: "Samsung",
    color: "Phantom Black",

    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",

    price: 999,

    stock: 65,
    sales: 931,

    status: "Archived",

    createdAt: "10 Jul, 2026",
  },
];

export const productStats: ProductStat[] = [
  {
    label: "Total Products",
    value: "12,540",
    sub: "Products in catalog",
    trend: "up",
  },
  {
    label: "Active Products",
    value: "10,982",
    sub: "Currently available",
    trend: "up",
  },
  {
    label: "Low Stock",
    value: "236",
    sub: "Require restocking",
    trend: "down",
  },
  {
    label: "Out of Stock",
    value: "89",
    sub: "Unavailable products",
    trend: "neg",
  },
];