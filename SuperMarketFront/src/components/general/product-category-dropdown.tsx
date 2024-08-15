import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SetURLSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

const categories = [
  "Milk and Eggs",
  "Fruits and Vegetables",
  "Sweets",
  "Drinks",
  "Meat and Fish",
  "Frozens",
];

interface ProductCategoryDropdownProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function ProductCategoryDropdown(props: ProductCategoryDropdownProps) {
  const { searchParams, setSearchParams } = props;
  const category = searchParams.get("category") || "Milk and Eggs";

  function handleCategoryChange(newCategory: string) {
    // setCategory(newCategory);
    searchParams.set("category", newCategory);
    setSearchParams(searchParams);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter size={20} strokeWidth={1} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={category}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <DropdownMenuRadioItem key={category} value={category}>
              {category}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductCategoryDropdown;
