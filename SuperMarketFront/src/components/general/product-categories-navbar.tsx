import { SetURLSearchParams } from "react-router-dom";
import ProductCategoryDropdown from "./product-category-dropdown";
import { IconInput } from "../ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchDialog from "./search-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ProductCategoriesNavbarProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function ProductCategoriesNavbar(props: ProductCategoriesNavbarProps) {
  const { searchParams, setSearchParams } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="sticky top-[72.5px] py-2 z-40 w-full border-border/40 bg-background  shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-12 max-w-screen-2xl items-center px-6">
        <div className="flex gap-5  text-sm lg:gap-6">
          <ProductCategoryDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="relative w-44 sm:w-500">
                <IconInput
                  Icon={Search}
                  placeholder="Search for items..."
                  className="w-4/5"
                  readOnly
                />
              </div>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className=" p-8">
              <DialogTitle className="sr-only">Search Modal</DialogTitle>
              <SearchDialog />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoriesNavbar;
