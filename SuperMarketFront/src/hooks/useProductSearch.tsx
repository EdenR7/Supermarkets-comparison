// hooks/useProductSearch.ts
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/product.types";
import { productService } from "@/services/proucts.service";

export function useProductSearch(searchTerm: string) {
  return useQuery<IProduct[]>({
    queryKey: ["productSearch", searchTerm],
    queryFn: () => productService.getProductByName(searchTerm),
    enabled: searchTerm.length > 0,
  });
}
