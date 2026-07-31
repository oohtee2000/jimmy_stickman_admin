"use client";

import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import Stat from "@/components/layout/Stat";

import CustomersToolbar from "@/components/customer/CustomerToolbar";
import CustomersTable from "@/components/customer/CustomersTable";
import CustomerCardList from "@/components/customer/CustomerCardList";
import CustomersPagination from "@/components/customer/CustomerPagination";

import {
  customers,
  customerStats,
} from "@/components/customer/data";

export default function CustomersPage() {
  const ITEMS_PER_PAGE = 10;

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Search customers
  const filteredCustomers = useMemo(() => {
    const search = query.trim().toLowerCase();

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.toLowerCase().includes(search) ||
        customer.id.toLowerCase().includes(search)
      );
    });
  }, [query]);

  // Pagination
  const totalPages = Math.ceil(
    filteredCustomers.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <Header
        title="Customers"
        description="Manage your customers and monitor their activity."
        buttonText="Add Customer"
        buttonHref="/customers/create"
      />

      <Stat stats={customerStats} />

      <CustomersToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
      />

      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        <CustomersTable customers={paginatedCustomers} />

        <CustomerCardList customers={paginatedCustomers} />
      </div>

      <CustomersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}