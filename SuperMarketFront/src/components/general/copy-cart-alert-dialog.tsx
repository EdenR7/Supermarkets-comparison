import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CopyCartDialogProps {
  cartId: string;
  userHasCurrentCart: boolean;
  onConfirm: () => void;
}

const CopyCartDialog: React.FC<CopyCartDialogProps> = ({
  userHasCurrentCart,
  onConfirm,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Copy</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace Current Cart?</AlertDialogTitle>
          {userHasCurrentCart && (
            <AlertDialogDescription>
              You already have a cart with products. Do you want to discard your
              current cart and replace it with this one?
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CopyCartDialog;
