"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setStatus(`Error: ${error.message}`);
        return;
      }

      setStatus(
        data.session
          ? "Supabase connected — user is logged in."
          : "Supabase connected — no user logged in."
      );
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-8">
        <h1 className="mb-4 text-2xl font-bold">
          Supabase Connection Test
        </h1>

        <p>{status}</p>
      </div>
    </main>
  );
}