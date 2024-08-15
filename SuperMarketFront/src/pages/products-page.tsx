import ProductList from "@/components/general/products-list";
import { Outlet } from "react-router-dom";

function ProductPage() {
  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default ProductPage;
