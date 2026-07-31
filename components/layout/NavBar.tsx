"use client";

import {
  Search,
  Plus,
  Bell,
  Moon,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className="relative hidden md:block w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-md border bg-muted pl-9 pr-12 text-sm outline-none focus:border-primary"
          />

          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button>
          <Plus className="mr-2 size-4" />
          Products
        </Button>

        {/* <Button variant="ghost" size="icon">
          <Moon className="size-4" />
        </Button> */}

        <Button variant="ghost" size="icon">
          <Settings className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="size-4" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
          AS
        </div>
      </div>
    </header>
  );
}