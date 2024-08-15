// components/search-results-dropdown.tsx
import { IProduct } from "@/types/product.types";
import { Link } from "react-router-dom";

interface SearchResultsDropdownProps {
  results: IProduct[] | undefined;
  isLoading: boolean;
  onSelect: (productId: string) => void;
}

function SearchResultsDropdown({
  results,
  isLoading,
  onSelect,
}: SearchResultsDropdownProps) {
  if (!results && !isLoading) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-secondary shadow-lg rounded-b-md mt-1 max-h-80 overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : results && results.length > 0 ? (
        results.map((product) => (
          <div
            key={product._id}
            className=" flex p-2 hover:bg-foreground/15  cursor-pointer"
          >
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              onClick={() => onSelect(product._id)}
            >
              {product.name}
            </Link>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No results found
        </div>
      )}
    </div>
  );
}

export default SearchResultsDropdown;
