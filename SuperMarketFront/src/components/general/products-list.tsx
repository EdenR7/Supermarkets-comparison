import { IProduct } from "@/types/product.types";
import ProductItem from "./product-item";
import { Link, useSearchParams } from "react-router-dom";
import React, { useMemo } from "react";
import ProductCategoriesNavbar from "./product-categories-navbar";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/proucts.service";
import { Skeleton } from "../ui/skeleton";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = useMemo(() => {
    return searchParams.toString();
  }, [searchParams]);

  const { data, isFetching } = useQuery<IProduct[]>({
    queryKey: ["products", searchString],
    queryFn: () => productService.fetchProducts(searchString),
  });

  return (
    <>
      <ProductCategoriesNavbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="px-6 py-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-fr">
        {isFetching
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 p-4">
                <Skeleton className="w-full h-40  rounded-md" />
                <Skeleton className="h-4 rounded w-3/4" />
                <Skeleton className="h-4  rounded w-1/2" />
              </div>
            ))
          : data?.map((product) => (
              <React.Fragment key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <ProductItem product={product} />
                </Link>
              </React.Fragment>
            ))}
      </div>
    </>
  );
}

export default ProductList;
