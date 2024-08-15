import { IProduct } from "@/types/product.types";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import CartItemButtonGroup from "./cart-item-button-group";

interface SearchItemProps {
  product: IProduct;
}

function SearchItem(props: SearchItemProps) {
  const { product } = props;

  return (
    <>
      <Link
        to={`/products/${product._id}`}
        key={product._id}
        className="block p-2 hover:bg-foreground/15 cursor-pointer"
      >
        <div className=" grid grid-cols-2 my-4 ">
          <img src={product.img} alt={product.name} />
          <div className=" flex flex-col justify-center gap-4 ">
            <p className=" self-center justify-self-start">{product.name}</p>
            <div className=" hidden sm:grid self-center ">
              <CartItemButtonGroup product={product} />
            </div>
          </div>
        </div>
      </Link>
      <Separator />
    </>
  );
}

export default SearchItem;
