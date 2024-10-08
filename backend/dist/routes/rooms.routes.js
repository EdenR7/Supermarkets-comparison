"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_controller_1 = require("../controllers/rooms.controller");
const roomsRouter = (0, express_1.Router)();
roomsRouter.get("/", rooms_controller_1.getUserRooms);
roomsRouter.post("/", rooms_controller_1.createRoom);
roomsRouter.delete("/:roomId", rooms_controller_1.deleteRoom);
roomsRouter.post("/add-collaborator/:roomId", rooms_controller_1.addCollaborator);
roomsRouter.patch(":roomdId/quantity/:productId", rooms_controller_1.updateQuantity);
roomsRouter.patch("/:roomId/toggle/:productId", rooms_controller_1.toggleProduct);
exports.default = roomsRouter;
