"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsRoutes = void 0;
const highlights_service_1 = require("./highlights.service");
const highlightsRoutes = async (fastify) => {
    const service = (0, highlights_service_1.highlightsService)(fastify);
    // GET /highlights - Tüm highlights'ları getir
    fastify.get("/highlights", async (request, reply) => {
        const highlights = await service.getAll();
        return reply.send(highlights);
    });
    // GET /highlights/:id - Tek bir highlight'ı getir
    fastify.get("/highlights/:id", async (request, reply) => {
        const params = request.params;
        const id = parseInt(params.id);
        const highlight = await service.getById(id);
        if (!highlight) {
            return reply.code(404).send({ error: "Highlight not found" });
        }
        return reply.send(highlight);
    });
};
exports.highlightsRoutes = highlightsRoutes;
