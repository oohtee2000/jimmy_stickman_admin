'use client'
import Header from "@/components/layout/Header";
import Stat from "@/components/layout/Stat";
import { productStats, products } from "@/components/product/data";
import ProductsPagination from "@/components/product/ProductPagination";
import ProductsCardList from "@/components/product/ProductsCardList";
import ProductsTable from "@/components/product/ProductsTable";
import ProductsToolbar from "@/components/product/ProductToolBar";
import { useState } from "react";



export default function ProductPage(){
    const [query, setQuery] = useState("");
    const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(query.toLowerCase()) ||
  product.sku.toLowerCase().includes(query.toLowerCase())
);


const [currentPage, setCurrentPage] = useState(1);

const ITEMS_PER_PAGE = 10;

const totalPages = Math.ceil(
  filteredProducts.length / ITEMS_PER_PAGE

);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;


const paginatedProducts = filteredProducts.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);



    return(

        <div>
             <Header
              title="Product List"
              description="Here you can find all of your products."
              buttonText="Add product"
              buttonHref="/products/create"
            />
              <Stat stats={productStats} />

              <ProductsToolbar
  query={query}
  onQueryChange={(value) => {
    setQuery(value);
    setCurrentPage(1);
  }}
/>
    <div className="mt-6 rounded-xl border border-slate-200 bg-white">
       <ProductsTable products={paginatedProducts} />
<ProductsCardList products={paginatedProducts} />   
    </div>

   <ProductsPagination
  currentPage={currentPage}

  // Type '{ currentPage: number; totalPages: number; onPageChange: Dispatch<SetStateAction<number>>; }' is not assignable to type 'IntrinsicAttributes'.
  // Property 'currentPage' does not exist on type 'IntrinsicAttributes'.ts(2322)

  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
      

              
        </div>
    );
}