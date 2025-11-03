"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsRoutes = void 0;
const reels_service_1 = require("./reels.service");
const reelsRoutes = async (fastify) => {
    const service = (0, reels_service_1.reelsService)(fastify);
    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll();
        return reply.send(reels);
    });
};
exports.reelsRoutes = reelsRoutes;
