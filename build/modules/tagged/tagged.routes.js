"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedRoutes = void 0;
const tagged_service_1 = require("./tagged.service");
const taggedRoutes = async (fastify) => {
    const service = (0, tagged_service_1.taggedService)(fastify);
    fastify.get("/tagged/grid", async (request, reply) => {
        const taggedPosts = await service.getAll();
        return reply.send(taggedPosts);
    });
};
exports.taggedRoutes = taggedRoutes;
