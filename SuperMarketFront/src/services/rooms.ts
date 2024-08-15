import api from "@/lib/api";
import { socket } from "./sockets";
import { ActiveCartProductI } from "@/types/rooms.types";

async function createRoom(todoCart: ActiveCartProductI[]) {
  try {
    const { data: room } = await api.post("/rooms", {
      roomId: socket.id,
      todoCart,
    });
    console.log(room);
  } catch (error) {
    console.log(error);
  }
}

export const roomService = {
  createRoom,
};
