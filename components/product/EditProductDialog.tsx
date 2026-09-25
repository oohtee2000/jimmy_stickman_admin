"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import type {
  Product,
  ProductStatus,
  ProductAgeGroup,
  ProductCategory,
  ProductActivity,
  ProductType,
} from "./types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (product: Product) => void;
}

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
  onUpdated,
}: EditProductDialogProps) {
  const supabase = createClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
  name: "",
  sku: "",

  gender: "" as Product["gender"] | "",

  ageGroup: "" as ProductAgeGroup | "",

  category: "" as ProductCategory | "",

  subcategory: "",

  activity: "" as ProductActivity | "",

  productType: "" as ProductType | "",

  brand: "",
  color: "",
  image: "",
  price: "",
  stock: "",

  status: "Draft" as ProductStatus,
});

  /*
   * Load selected product into the form
   */
  useEffect(() => {
    if (!product) {
      return;
    }

   setForm({
  name: product.name,
  sku: product.sku,

  gender: product.gender ?? "",

  ageGroup: product.ageGroup ?? "",

  category: product.category,

  subcategory: product.subcategory ?? "",

  activity: product.activity ?? "",

  productType: product.productType ?? "",

  brand: product.brand,
  color: product.color,
  image: product.image,
  price: String(product.price),
  stock: String(product.stock),
  status: product.status,
});




    setError("");
  }, [product]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!product) {
      return;
    }

    setSaving(true);
    setError("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (Number.isNaN(price) || price < 0) {
      setError("Please enter a valid price.");
      setSaving(false);
      return;
    }

    if (
      Number.isNaN(stock) ||
      stock < 0 ||
      !Number.isInteger(stock)
    ) {
      setError(
        "Stock must be a valid whole number."
      );
      setSaving(false);
      return;
    }

    /*
     * Update using product_code.
     *
     * product.id in the frontend is actually
     * the database product_code.
     */
    const { data, error: updateError } =
      await supabase
        .from("products")
        .update({
          name: form.name.trim(),
          sku: form.sku.trim(),
          gender: form.gender || null,
           age_group: form.ageGroup,

          category: form.category.trim(),
           subcategory:
            form.subcategory.trim() || null,

          activity: form.activity || null,

          product_type: form.productType || null,

          brand: form.brand.trim(),
          color: form.color.trim() || null,
          image: form.image.trim() || null,
          price,
          stock,
          status: form.status,
          updated_at: new Date().toISOString(),
        })
        .eq("product_code", product.id)
        .select()
        .single();

    if (updateError) {
      console.error(
        "Product update error:",
        updateError
      );

      setError(updateError.message);
      setSaving(false);
      return;
    }

    console.log("=== PRODUCT UPDATED ===");
    console.log(data);

    /*
     * Convert the updated Supabase row
     * back into the frontend Product shape.
     */
    const updatedProduct: Product = {
      id: data.product_code,
      name: data.name,
      sku: data.sku,
      gender: data.gender,
        ageGroup: data.age_group,

     category:
        data.category as ProductCategory,

      subcategory:
        data.subcategory ?? null,

      activity:
        data.activity as ProductActivity | null,

      productType:
        data.product_type as ProductType | null,

      brand: data.brand,
      color: data.color ?? "",
      image: data.image ?? "",
      price: Number(data.price),
      stock: data.stock,
      sales: data.sales,
      status: data.status as ProductStatus,
      createdAt: new Date(
        data.created_at
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    onUpdated(updatedProduct);

    onOpenChange(false);

    setSaving(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Product
          </DialogTitle>

          <DialogDescription>
            Update the product information below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Product ID */}
          <div className="space-y-2">
            <Label>Product ID</Label>

            <Input
              value={product?.id ?? ""}
              disabled
              className="bg-slate-50"
            />

            <p className="text-xs text-muted-foreground">
              Product ID cannot be changed.
            </p>
          </div>

          {/* Basic information */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Basic Information
              </h3>

              <p className="text-sm text-muted-foreground">
                Update the main product details.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">
                  Product Name
                </Label>

                <Input
                  id="edit-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sku">
                  SKU
                </Label>

                <Input
                  id="edit-sku"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
  
  {/* Category */}
<div className="space-y-2">
  <Label htmlFor="edit-category">
    Category
  </Label>

  <Select
    value={form.category}
    onValueChange={(value) => {
      setForm((previous) => ({
        ...previous,
        category: value as ProductCategory,
      }));
    }}
  >
    <SelectTrigger id="edit-category">
      <SelectValue placeholder="Select category" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="Shoes">
        Shoes
      </SelectItem>

      <SelectItem value="Clothes">
        Clothes
      </SelectItem>

      <SelectItem value="Bags">
        Bags
      </SelectItem>

      <SelectItem value="Accessories">
        Accessories
      </SelectItem>
    </SelectContent>
  </Select>
</div>

  {/* Gender */}
<div className="space-y-2">
  <Label htmlFor="edit-gender">
    Gender
  </Label>

  <Select
    value={form.gender}
    onValueChange={(value) => {
      setForm((previous) => ({
        ...previous,
        gender: value as Product["gender"],
      }));
    }}
  >
    <SelectTrigger id="edit-gender">
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="Men">
        Men
      </SelectItem>

      <SelectItem value="Women">
        Women
      </SelectItem>

      <SelectItem value="Unisex">
        Unisex
      </SelectItem>
    </SelectContent>
  </Select>
</div>

{/* Product Classification */}
<div className="grid gap-4 sm:grid-cols-2">
  {/* Age Group */}
  <div className="space-y-2">
    <Label htmlFor="edit-age-group">
      Age Group
    </Label>

    <Select
      value={form.ageGroup}
      onValueChange={(value) => {
        setForm((previous) => ({
          ...previous,
          ageGroup: value as ProductAgeGroup,
        }));
      }}
    >
      <SelectTrigger id="edit-age-group">
        <SelectValue placeholder="Select age group" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Adult">
          Adult
        </SelectItem>

        <SelectItem value="Kids">
          Kids
        </SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Activity */}
  <div className="space-y-2">
    <Label htmlFor="edit-activity">
      Activity
    </Label>

    <Select
      value={form.activity}
      onValueChange={(value) => {
        setForm((previous) => ({
          ...previous,
          activity: value as ProductActivity,
        }));
      }}
    >
      <SelectTrigger id="edit-activity">
        <SelectValue placeholder="Select activity" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Sport">
          Sport
        </SelectItem>

        <SelectItem value="Lifestyle">
          Lifestyle
        </SelectItem>

        <SelectItem value="Training">
          Training
        </SelectItem>

        <SelectItem value="Running">
          Running
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

{/* Subcategory + Product Type */}
<div className="grid gap-4 sm:grid-cols-2">
  {/* Subcategory */}
  <div className="space-y-2">
    <Label htmlFor="edit-subcategory">
      Subcategory
    </Label>

    <Input
      id="edit-subcategory"
      name="subcategory"
      value={form.subcategory}
      onChange={handleChange}
      placeholder="e.g. Running Shoes"
    />
  </div>

  {/* Product Type */}
  <div className="space-y-2">
    <Label htmlFor="edit-product-type">
      Product Type
    </Label>

    <Select
      value={form.productType}
      onValueChange={(value) => {
        setForm((previous) => ({
          ...previous,
          productType: value as ProductType,
        }));
      }}
    >
      <SelectTrigger id="edit-product-type">
        <SelectValue placeholder="Select product type" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Original">
          Original
        </SelectItem>

        <SelectItem value="Replica">
          Replica
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
</div>

            <div className="space-y-2">
              <Label htmlFor="edit-color">
                Color
              </Label>

              <Input
                id="edit-color"
                name="color"
                value={form.color}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="edit-image">
              Image URL
            </Label>

            <Input
              id="edit-image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Inventory
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-price">
                  Price
                </Label>

                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-stock">
                  Stock
                </Label>

                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="edit-status">
              Status
            </Label>

            <Select
              value={form.status}
              onValueChange={(value) => {
                if (!value) {
                  return;
                }

                setForm((previous) => ({
                  ...previous,
                  status: value as ProductStatus,
                }));
              }}
            >
              <SelectTrigger id="edit-status">
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

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}