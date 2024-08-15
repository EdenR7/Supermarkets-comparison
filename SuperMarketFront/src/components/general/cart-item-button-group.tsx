import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCartItem } from "@/hooks/useCartItem";
import { IProduct } from "@/types/product.types";

interface CartItemButtonGroupProps {
  product: IProduct;
}

function CartItemButtonGroup({ product }: CartItemButtonGroupProps) {
  const {
    handleAddProduct,
    handleAddQuantity,
    handleSubtractQuantity,
    isProductInCart,
    quantity,
  } = useCartItem(product._id);

  return isProductInCart ? (
    <div className="flex gap-5 items-center">
      <Button
        className="w-11"
        variant="outline"
        onClick={(ev) => handleSubtractQuantity(ev, product._id)}
      >
        <Minus />
      </Button>

      <Input className="  text-center w-11" disabled value={quantity} />
      <Button
        className="w-11"
        variant="outline"
        onClick={(ev) => handleAddQuantity(ev, product._id)}
      >
        <Plus />
      </Button>
    </div>
  ) : (
    <Button
      onClick={(ev) =>
        handleAddProduct(ev, product._id, product.name, product.prices)
      }
      className="w-full"
    >
      Add to cart
    </Button>
  );
}

export default CartItemButtonGroup;
