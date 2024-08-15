import api from "@/lib/api";

async function createCart(cartData: { name: string; cartProducts: any[] }) {
  try {
    const res = await api.post("/cart", cartData);
    console.log("Cart created:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error creating cart:", error);
    throw error;
  }
}

async function fetchUserCarts() {
  try {
    const res = await api.get("/cart");
    console.log("User carts:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching user carts:", error);
    throw error;
  }
}

async function fetchCartById(cartId: string) {
  try {
    const { data } = await api.get(`/cart/${cartId}`);
    console.log("Cart details:", data);
    return data;
  } catch (error) {
    console.log("Error fetching cart by ID:", error);
    throw error;
  }
}

async function updateCart(
  cartId: string,
  cartData: { name: string; products: any[] }
) {
  try {
    const { data } = await api.put(`/cart/${cartId}`, cartData);
    console.log("Cart updated:", data);
    return data;
  } catch (error) {
    console.log("Error updating cart:", error);
    throw error;
  }
}

async function deleteCart(cartId: string) {
  try {
    const { data } = await api.delete(`/cart/${cartId}`);
    console.log("Cart deleted:", data);
    return data;
  } catch (error) {
    console.log("Error deleting cart:", error);
    throw error;
  }
}

async function addCollaborator(
  cartId: string,
  collaboratorData: { collaboratorUsername: string }
) {
  try {
    const { data } = await api.post(
      `/cart/${cartId}/collaborators`,
      collaboratorData
    );
    console.log("Collaborator added:", data);
    return data;
  } catch (error) {
    console.log("Error adding collaborator:", error);
    throw error;
  }
}

async function fetchCollaboratorCarts() {
  try {
    const res = await api.get("/cart/collaborators");
    console.log("Collaborator carts:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching collaborator carts:", error);
    throw error;
  }
}

export const cartService = {
  createCart,
  fetchUserCarts,
  fetchCollaboratorCarts, // Add this new function here
  fetchCartById,
  updateCart,
  deleteCart,
  addCollaborator,
};
