import { IProduct } from "@/types/product.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";
import CartItemButtonGroup from "./cart-item-button-group";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;

  return (
    <Card className=" min-h-full flex flex-col justify-between hover:bg-foreground/10 transition-all">
      <CardHeader className=" items-center gap-4">
        <div className="  rounded-sm bg-white w-full  ">
          <img
            className=" mx-auto min-h-full p-2"
            src={product.img}
            alt={product.name}
          />
        </div>
        <CardTitle className=" text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" text-xs text-muted-foreground">
          Category: {product.category}
        </p>
        <p className=" text-xs">Range: {formatPriceRange(product)}</p>
      </CardContent>
      <CardFooter className=" flex-col gap-4">
        <CartItemButtonGroup product={product} />
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
