import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "react-router-dom";

import CartItem from "./cart-item";
import api from "@/lib/api";
import { useToast } from "../ui/use-toast";

function CartToggle() {
  const { toast } = useToast();
  const { loggedInUser, setLoggedInUser } = useAuth();
  const cart = loggedInUser?.currentCart;
  async function handleClearCart() {
    const prevCart = cart;
    try {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: [] };
      });
      await api.delete("/user/current-cart/clear");
      toast({
        title: "Success",
        description: "successfuly cleared the cart",
        variant: "success",
      });
    } catch (error) {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart! };
      });
    }
  }

  return (
    <>
      {cart && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-foreground/15"
              >
                <div className=" relative">
                  {loggedInUser.currentCart.length > 0 && (
                    <div
                      className=" absolute text-xs -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex 
                    text-white items-center justify-center"
                    >
                      {loggedInUser.currentCart.length}
                    </div>
                  )}

                  <ShoppingCart size={18} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-full" align="end">
              <div className=" flex justify-between items-center">
                <DropdownMenuLabel>My Cart</DropdownMenuLabel>
                <Button
                  onClick={handleClearCart}
                  className=" text-accent"
                  variant={"link"}
                >
                  Clear cart
                </Button>
              </div>

              {cart.map((cartItem) => (
                <CartItem key={cartItem.productId} cartItem={cartItem} />
              ))}
              <DropdownMenuSeparator />
              {loggedInUser.currentCart.length > 0 && (
                <DropdownMenuItem asChild>
                  <Link to="/compare" className="w-full">
                    <Button className="w-full text-center">
                      Compare Prices
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

export default CartToggle;
