"use client";

import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import Stat from "@/components/layout/Stat";

import PaymentToolbar from "@/components/payment/PaymentToolbar";
import PaymentTable from "@/components/payment/PaymentsTable";
import PaymentsCardList from "@/components/payment/CardPaymentList";
import PaymentPagination from "@/components/payment/PaymentPagination";

import { payments, paymentStats } from "@/components/payment/data";

const ITEMS_PER_PAGE = 10;

export default function PaymentPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPayments = useMemo(() => {
    const search = query.toLowerCase();

    return payments.filter(
      (payment) =>
        payment.transactionId.toLowerCase().includes(search) ||
        payment.orderId.toLowerCase().includes(search) ||
        payment.method.toLowerCase().includes(search) ||
        payment.status.toLowerCase().includes(search)
    );
  }, [query]);

  const totalPages = Math.ceil(
    filteredPayments.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <Header
        title="Payments"
        description="Manage all payment transactions."
        buttonText="Add Payment"
        buttonHref="/payments/create"
      />

      <Stat stats={paymentStats} />

      <PaymentToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
      />

      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        <PaymentTable payments={paginatedPayments} />

        <PaymentsCardList payments={paginatedPayments} />
      </div>

      <PaymentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}