import api from "@/lib/api";
import { socket } from "@/services/sockets";
import { LiveCartI } from "@/types/rooms.types";
import { createContext, useContext, useEffect, useState } from "react";

interface LiveCartContextI {
  liveCart: LiveCartI | null;
  changeProductMark: (productId: string) => Promise<void>;
  changeProductQuantity: (newValue: number, productId: string) => Promise<void>;
  setLiveCart: React.Dispatch<React.SetStateAction<LiveCartI | null>>;
  closeLive(): Promise<void>;
  addCollaborator: (roomId: string, collaboratorId: string) => Promise<void>;
}

const LiveCartContext = createContext<LiveCartContextI | undefined>(undefined);

export function LiveCartProvider({ children }: { children: React.ReactNode }) {
  const [liveCart, setLiveCart] = useState<LiveCartI | null>(null);

  async function changeProductMark(productId: string) {
    console.log("Product mark changed:", productId);
    await api.patch(`/rooms/${liveCart?.roomId}/toggle/${productId}`);
    setLiveCart((prev) => {
      if (!prev) return null;
      const newTodoCart = prev.todoCart.map((product) => {
        if (product.productId === productId) {
          return { ...product, isActive: !product.isActive };
        }
        return product;
      });
      return { ...prev, todoCart: newTodoCart };
    });
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async function closeLive() {
    try {
      const roomId = liveCart?.roomId;
      await api.delete(`/rooms/${roomId}`);
      setLiveCart(null);
    } catch (error) {
      console.log(error);
    }
  }

  // async function addNewProduct() {
  async function addCollaborator(roomId: string, collaboratorId: string) {
    try {
      await api.post(`/rooms/add-collaborator/${roomId}`, {
        collaboratorId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function changeProductQuantity(newValue: number) {
  // async function changeProductQuantity(newValue: number, productId: string) {
    try {
      console.log("Product quantity changed:", newValue);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleNewUserJoined = (newLiveCart: LiveCartI) => {
      console.log("New user joined event received:", newLiveCart);
      setLiveCart(newLiveCart);
    };

    socket.on("New user joined", handleNewUserJoined);

    return () => {
      socket.off("New user joined", handleNewUserJoined);
    };
  }, []);

  return (
    <LiveCartContext.Provider
      value={{
        liveCart,
        changeProductMark,
        changeProductQuantity,
        setLiveCart,
        closeLive,
        addCollaborator,
      }}
    >
      {children}
    </LiveCartContext.Provider>
  );
}
export function useLiveCart() {
  const context = useContext(LiveCartContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
