// components/search-dialog.tsx
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useProductSearch } from "@/hooks/useProductSearch";
import { IconInput } from "../ui/input";
import { Search } from "lucide-react";

import { IProduct } from "@/types/product.types";

import SearchItem from "./search-item";

function SearchDialog() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { data: searchResults, isLoading } =
    useProductSearch(debouncedSearchTerm);

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(ev.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <IconInput
        Icon={Search}
        value={searchTerm}
        onChange={handleNameChange}
        placeholder="Search for items..."
        className="w-full"
        autoFocus
      />
      <div className="max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.map((product: IProduct) => (
            <SearchItem key={product._id} product={product} />
          ))
        ) : searchTerm.length! > 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No results found
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Your search results will appear here!
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDialog;
