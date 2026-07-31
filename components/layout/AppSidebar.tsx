"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const mainItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    href: "/orders",
  },
  {
    title: "Products",
    icon: Package,
    href: "/products",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
  },
];

const analyticsItems = [
  {
    title: "Payments",
    icon: CreditCard,
    href: "/payments",
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-3">
         
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">JS</div>

          <div>
            <h2 className="font-semibold">JimmyStickman</h2>
            <p className="text-xs text-muted-foreground">
              Ecommerce Dashboard
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Main */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  }>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  }>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={
                    <Link href="/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                }>
                  
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton render={
                    <Link href="/support">
                    <LifeBuoy className="size-4" />
                    <span>Support</span>
                  </Link>
                }>
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  Yusuf Olororo
                </span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>

              <ChevronRight className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}