"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: "customer" | "admin";
  avatar_url: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      // 1. Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("=== SUPABASE AUTH USER ===");
      console.log(user);

      if (userError) {
        console.error("Auth user error:", userError);
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        console.log("No user is currently logged in.");

        setError("No user is logged in.");
        setLoading(false);
        return;
      }

      console.log("User ID:", user.id);
      console.log("User Email:", user.email);
      console.log("User Metadata:", user.user_metadata);

      // 2. Get profile from public.profiles
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("=== PUBLIC PROFILE ===");
      console.log(data);

      if (profileError) {
        console.error("Profile error:", profileError);

        setError(profileError.message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [supabase]);

  async function handleLogout() {
    setLoggingOut(true);

    console.log("Logging out...");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);

      setError(error.message);
      setLoggingOut(false);
      return;
    }

    console.log("Logout successful.");

    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
          <h1 className="mb-2 font-semibold">Profile Error</h1>

          <p>{error}</p>

          <button
            onClick={() => router.push("/login")}
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="p-8">
        <p>Profile not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your account information
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* Profile */}
        <div className="rounded-xl border p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="font-medium">
                {profile.full_name || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium">
                {profile.email || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="font-medium capitalize">
                {profile.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-medium">
                {profile.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-medium">
                {[
                  profile.city,
                  profile.state,
                  profile.country,
                ]
                  .filter(Boolean)
                  .join(", ") || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}