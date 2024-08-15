export function generateTodoCart(cart: any) {
  return cart.cartProducts.map((product: any) => ({
    isActive: true,
    productId: product.productId,
    productName: product.productName,
    quantity: product.quantity,
  }));
}
