import ProductList from "@/components/products-page/products-list";
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
