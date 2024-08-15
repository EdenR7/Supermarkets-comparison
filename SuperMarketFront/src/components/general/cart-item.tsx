import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useCartItem } from "@/hooks/useCartItem";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";

interface CartItemProps {
  cartItem: { productId: string; productName: string; quantity: number };
}

function CartItem(props: CartItemProps) {
  const { cartItem } = props;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { handleAddQuantity, handleSubtractQuantity, quantity } = useCartItem(
    cartItem.productId
  );
  const { toast } = useToast();
  async function handleDeleteProduct(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    ev.stopPropagation();
    ev.preventDefault();
    const prevCart = loggedInUser?.currentCart || [];

    try {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentCart: prev.currentCart.filter(
            (item) => item.productId !== productId
          ),
        };
      });
      await api.delete(`/user/current-cart/${productId}`);
    } catch (error) {
      toast({
        title: "Oops",
        description:
          "Something went wrong while trying to delete the item from your cart",
        variant: "destructive",
      });
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentCart: prevCart,
        };
      });
    }
  }

  return (
    <>
      <DropdownMenuItem className="hover:bg-foreground/10">
        <div className="flex w-full sm:items-center justify-between flex-col gap-2 sm:flex-row ">
          <div>
            <p className="max-w-36  truncate">{cartItem.productName}</p>
          </div>
          <div className=" flex items-center gap-4">
            <div className="flex gap-2 sm:gap-3 items-center">
              <Button
                className="p-3 sm:w-10"
                variant="outline"
                onClick={(ev) => handleSubtractQuantity(ev, cartItem.productId)}
              >
                <Minus size={12} />
              </Button>

              <Input className="w-10 text-center " disabled value={quantity} />
              <Button
                className=" p-3 sm:w-10"
                variant="outline"
                onClick={(ev) => handleAddQuantity(ev, cartItem.productId)}
              >
                <Plus size={12} />
              </Button>
            </div>
            <div>
              <Button
                className=" p-2"
                onClick={(ev) => handleDeleteProduct(ev, cartItem.productId)}
                variant="ghost"
              >
                <Trash2 size={16} color="#ff2424" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
}

export default CartItem;
