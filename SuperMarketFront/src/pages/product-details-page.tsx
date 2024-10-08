import CartItemButtonGroup from "@/components/general/cart-item-button-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceRange } from "@/lib/formatPriceRange";
import { productService } from "@/services/proucts.service";
import { IProduct } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<IProduct>({
    queryKey: ["singleProduct", productId],
    queryFn: () => productService.fetchProductById(productId!),
  });

  function handleCloseDialog() {
    navigate(-1);
  }

  return (
    <Dialog open={true} onOpenChange={handleCloseDialog}>
      <DialogContent
        className="h-fit max-w-3xl overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Individual product</DialogTitle>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl xs:text-2xl mt-4 font-bold">
                  {data.name}
                </DialogTitle>
              </DialogHeader>
              <Card className="mt-4 text-sm xs:text-base">
                <CardHeader className="items-center gap-6">
                  <div className="rounded-md bg-white w-4/5 h-[180px] flex items-center justify-center">
                    <img
                      className="w-4/5 max-h-full object-contain"
                      src={data.img}
                      alt={data.name}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 mx-14">
                  <div className=" font-semibold ">
                    <h3 className=" text-lg"> Price range:</h3>{" "}
                    <p>{formatPriceRange(data)}</p>
                  </div>
                  <div className="text-md">
                    <h3 className=" text-lg font-semibold"> Category:</h3>
                    <span className="font-medium">{data.category}</span>
                  </div>
                  <div className=" flex justify-center">
                    <CartItemButtonGroup product={data} />
                  </div>
                </CardContent>
              </Card>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <DialogHeader>
        <Skeleton className="h-8 w-3/4" />
      </DialogHeader>
      <Card className="mt-4">
        <CardHeader className="items-center gap-6">
          <Skeleton className="w-full h-[300px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
      </Card>
    </>
  );
}

export default ProductDetailsPage;
