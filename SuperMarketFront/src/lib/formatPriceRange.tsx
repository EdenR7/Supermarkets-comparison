import { IProduct } from "@/types/product.types";

export function formatPriceRange(product: IProduct) {
  if (!product || !product.prices || product.prices.length === 0) {
    return "";
  }

  // Filter out prices that are "N/A"
  const validPrices = product.prices
    .map((price) => price.price)
    .filter((price) => price > 0);

  if (validPrices.length === 0) {
    return "N/A";
  }

  const minPrice = Math.min(...validPrices);
  const maxPrice = Math.max(...validPrices);

  return (
    <>
      <span>₪{minPrice.toFixed(2)}</span> - <span>₪{maxPrice.toFixed(2)}</span>
      {product.category === "Fruits and Vegetables" ||
      product.category === "Meat and Fish" ? (
        <span className=" text-muted-foreground text-sm ml-2">(Per Kg)</span>
      ) : (
        ""
      )}
    </>
  );
}
