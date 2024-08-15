import api from "@/lib/api";

async function addProductToCurrentCart(
  productId: string,
  productName: string,
  quantity: number,
  productPrices: { brandName: string; price: number }[]
) {
  console.log(productId, productName, quantity, productPrices);

  try {
    const { data } = await api.post("/user/current-cart", {
      productId,
      productName,
      quantity,
      productPrices,
    });
    return data;
  } catch (error) {
    console.error("Error adding product to current cart:", error);
    throw error;
  }
}

async function updateProductQuantityInCurrentCart(
  productId: string,
  quantity: number
) {
  try {
    const { data } = await api.put("/user/current-cart/update", {
      productId,
      quantity,
    });
    return data;
  } catch (error) {
    console.error("Error updating product quantity in current cart:", error);
    throw error;
  }
}

async function deleteProductFromCurrentCart(productId: string) {
  try {
    const { data } = await api.delete("/user/current-cart/delete", {
      data: { productId },
    });
    return data;
  } catch (error) {
    console.error("Error deleting product from current cart:", error);
    throw error;
  }
}

async function clearCurrentCart() {
  try {
    const { data } = await api.delete("/user/current-cart/clear");
    return data;
  } catch (error) {
    console.error("Error clearing current cart:", error);
    throw error;
  }
}

export const userService = {
  addProductToCurrentCart,
  updateProductQuantityInCurrentCart,
  deleteProductFromCurrentCart,
  clearCurrentCart,
};
