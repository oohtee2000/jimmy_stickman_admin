"use client";

import { FormEvent, useEffect, useState } from "react";
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

export default function EditProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select(
        `
        full_name,
        phone,
        avatar_url,
        address,
        city,
        state,
        country,
        postal_code
        `
      )
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setForm({
      full_name: data.full_name ?? "",
      phone: data.phone ?? "",
      avatar_url: data.avatar_url ?? "",
      address: data.address ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
      postal_code: data.postal_code ?? "",
    });

    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        avatar_url: form.avatar_url,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        postal_code: form.postal_code,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Update error:", updateError);
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setMessage("Profile updated successfully.");

    setSaving(false);

    router.refresh();
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-muted-foreground">
          Loading profile...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal and contact information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">
                  Personal Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your basic profile information.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">
                  Full Name
                </Label>

                <Input
                  id="full_name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone
                </Label>

                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url">
                  Avatar URL
                </Label>

                <Input
                  id="avatar_url"
                  name="avatar_url"
                  value={form.avatar_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">
                  Address
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your delivery address.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address
                </Label>

                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City
                  </Label>

                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State
                  </Label>

                  <Input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country
                  </Label>

                  <Input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">
                    Postal Code
                  </Label>

                  <Input
                    id="postal_code"
                    name="postal_code"
                    value={form.postal_code}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}