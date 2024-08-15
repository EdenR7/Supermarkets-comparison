import { useAuth } from "@/providers/auth-provider";
import { useToast } from "../components/ui/use-toast";
import api from "@/lib/api";
import { IBrandProduct } from "@/types/product.types";

// interface UseCartItemProps {
//   productId: string;
//   productName: string;
//   productPrices: IBrandProduct[];
// }

export function useCartItem(productId?: string) {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { toast } = useToast();
  const cart = loggedInUser?.currentCart;
  const isProductInCart = loggedInUser?.currentCart.some(
    (item) => item.productId === productId
  );
  const cartItem = cart?.find(
    (cartProduct) => cartProduct.productId === productId
  );
  const quantity = cartItem ? cartItem.quantity : 0;
  async function handleAddQuantity(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const prevCart = cart ? [...cart] : [];
    try {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedCart = prevUser.currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...prevUser, currentCart: updatedCart };
      });
      await api.patch(`/user/current-cart/increment/${productId}`);
    } catch (error) {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description: "Something went wrong while trying to update the item ",
        variant: "destructive",
      });
    }
  }

  async function handleSubtractQuantity(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const prevCart = cart ? [...cart] : [];
    const isItemDeleted = quantity - 1 === 0;
    try {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        let updatedCart;
        if (isItemDeleted) {
          updatedCart = prevUser.currentCart.filter(
            (item) => item.productId !== productId
          );
        } else {
          updatedCart = prevUser.currentCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
        return { ...prevUser, currentCart: updatedCart };
      });
      if (isItemDeleted) {
        await api.delete(`/user/current-cart/${productId}`);
      } else {
        await api.patch(`/user/current-cart/decrement/${productId}`);
      }
    } catch (error) {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description:
          "Something went wrong while trying to update the product count",
        variant: "destructive",
      });
    }
  }

  async function handleAddProduct(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    productName: string,
    productPrices: IBrandProduct[]
  ) {
    ev.stopPropagation();
    ev.preventDefault();
    const prevCart = cart ? [...cart] : [];
    try {
      const productToAdd = {
        productId,
        productName,
        quantity: 1,
        productPrices,
      };

      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedCart = [...prevUser.currentCart, productToAdd];
        return { ...prevUser, currentCart: updatedCart };
      });
      await api.post("/user/current-cart", productToAdd);
    } catch (error) {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        return { ...prevUser, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description:
          "Something went wrong while trying to add an Item to the cart",
        variant: "destructive",
      });
    }
  }

  return {
    handleAddProduct,
    handleAddQuantity,
    handleSubtractQuantity,
    isProductInCart,
    quantity,
  };
}
