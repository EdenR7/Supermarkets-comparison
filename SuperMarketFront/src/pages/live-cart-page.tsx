// import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconInput } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLiveCart } from "@/providers/live-cart-provider";
import { UserPlus2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LiveCartPage() {
  const [addCollaboratorMode, setAddCollaboratorMode] = useState(false);
  const [collabName, setCollabName] = useState("");
  // const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const { liveCart, changeProductMark, closeLive, addCollaborator } =
    useLiveCart();
  // const { liveCart, changeProductMark, changeProductQuantity } = useLiveCart();

  return (
    <div className=" px-6 max-w-600 mx-auto">
      <div className=" pt-6 mb-8 flex justify-between flex-col sm:flex-row">
        <h1 className=" text-3xl mb-2">Todo Cart </h1>
        {addCollaboratorMode ? (
          <div className="flex gap-2 items-center">
            <div>
              <IconInput
                onChange={(ev) => {
                  setCollabName(ev.target.value);
                }}
                Icon={UserPlus2}
              />
            </div>
            <Button
              onClick={() => {
                if (liveCart) addCollaborator(liveCart?.roomId, collabName);
              }}
              size={"sm"}
              className=""
            >
              Add
            </Button>
          </div>
        ) : (
          <Button onClick={() => setAddCollaboratorMode(true)} size={"sm"}>
            <UserPlus2 size={20} />
          </Button>
        )}
      </div>
      <ul className=" flex flex-col">
        {liveCart?.collaborators.map((colab) => {
          return <li>{colab}</li>;
        })}
      </ul>
      <ul className=" flex flex-col ">
        {liveCart?.todoCart.map((product) => (
          <li className=" px-4" key={product.productId}>
            <div className=" py-4 flex gap-4 items-center">
              <div>
                <Checkbox
                  onClick={() => changeProductMark(product.productId)}
                  checked={!product.isActive}
                />
              </div>
              <div className=" w-full flex justify-between">
                <p
                  className={`${
                    !product.isActive
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {product.productName}
                </p>{" "}
                <p className=" min-w-10 text-right">x {product.quantity}</p>
              </div>
            </div>
            <Separator />
          </li>
        ))}
      </ul>
      <div className=" my-4 flex justify-between">
        <Button
          className=" bg-red-600"
          onClick={() => {
            closeLive();
            navigate("/");
          }}
        >
          Close Live{" "}
        </Button>
        <Button>Add New Product + </Button>
      </div>
    </div>
  );
}

export default LiveCartPage;
