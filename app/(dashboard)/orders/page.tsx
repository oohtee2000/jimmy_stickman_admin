'use client'
import Header from "@/components/layout/Header";
import OrdersTable from "@/components/order/OrdersTable";
import Stat from "@/components/layout/Stat";
import OrdersToolbar from "@/components/order/OrderToolBar";
import { useState, useMemo } from "react";
import { orders } from "@/components/order/data";
import OrdersCardList from "@/components/order/CardOrderList";
import OrdersPagination from "@/components/order/OrderPagination";
import { orderStats } from "@/components/order/data";
import { customers } from "@/components/customer/data";



const orderFilters = [
  {
    label: "All Status",
    icon: "status",
  },
  {
    label: "01 Jan, 2024 to 31 Dec, 2024",
    icon: "calendar",
  },
  {
    label: "More Filter",
    icon: "filter",
  },
];

export default function OrderPage(){


   // Create the customer lookup map first
  const customerMap = useMemo(
  () => new Map(customers.map((customer) => [customer.id, customer])),
  []
);

  const ITEMS_PER_PAGE = 10;

const [query, setQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
     const filteredOrders = useMemo(() => {
  const search = query.toLowerCase();

  return orders.filter((order) => {
    const customer = customerMap.get(order.customerId);

    return (
      customer?.name.toLowerCase().includes(search) ||
      order.paymentMethod.toLowerCase().includes(search) ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.id.toLowerCase().includes(search)
    );
  });
}, [query, customerMap]);

const totalPages = Math.ceil(
  filteredOrders.length / ITEMS_PER_PAGE
);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const paginatedOrders = filteredOrders.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);
    return(
        <div>
            <Header
  title="Orders List"
  description="Here you can find all of your orders."
  buttonText="Add Order"
  buttonHref="/orders/create"
/>
            <Stat stats={orderStats} />
           <OrdersToolbar
  query={query}
  onQueryChange={(value) => {
    setQuery(value);
    setCurrentPage(1);
  }}
/>



      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
       <OrdersTable
  orders={paginatedOrders}
  customers={customers}
/>

<OrdersCardList
  orders={paginatedOrders}
  customers={customers}
/>
      </div>

      <OrdersPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
             
            
        </div>
    );
}