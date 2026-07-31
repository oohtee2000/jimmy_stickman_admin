"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Order = {
  customer: string;
  initials: string;
  id: string;
  product: string;
  status: "Paid" | "Pending" | "Refunded" | "Shipped";
  amount: string;
};

const orders: Order[] = [
  {
    customer: "Liam Johnson",
    initials: "LJ",
    id: "#ORD-7392",
    product: "Wireless Headphones",
    status: "Paid",
    amount: "$352.00",
  },
  {
    customer: "Sarah Miller",
    initials: "SM",
    id: "#ORD-8210",
    product: "Smart Watch Pro",
    status: "Pending",
    amount: "$1,204.50",
  },
  {
    customer: "Noah Williams",
    initials: "NW",
    id: "#ORD-9011",
    product: "USB-C Hub",
    status: "Paid",
    amount: "$89.00",
  },
  {
    customer: "Emma Davis",
    initials: "ED",
    id: "#ORD-9022",
    product: "Mechanical Keyboard",
    status: "Shipped",
    amount: "$245.00",
  },
  {
    customer: "James Wilson",
    initials: "JW",
    id: "#ORD-9033",
    product: "4K Monitor",
    status: "Refunded",
    amount: "$789.00",
  },
];

const badgeVariant = {
  Paid: "default",
  Pending: "secondary",
  Shipped: "outline",
  Refunded: "destructive",
} as const;

export function RecentOrders() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>

          <CardDescription>
            Latest transactions from your store
          </CardDescription>
        </div>

        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {order.initials}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">
                        {order.customer}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-muted-foreground">
                    {order.id}
                  </TableCell>

                  <TableCell>
                    {order.product}
                  </TableCell>

                  <TableCell>
                    <Badge variant={badgeVariant[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {order.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}