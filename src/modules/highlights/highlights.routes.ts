import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";

const highlightsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = highlightsService(fastify);

  // GET /highlights - Tüm highlights'ları getir
  fastify.get("/highlights", async (request, reply) => {
    const highlights = await service.getAll();
    return reply.send(highlights);
  });

  // GET /highlights/:id - Tek bir highlight'ı getir
  fastify.get("/highlights/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const id = parseInt(params.id);
    
    const highlight = await service.getById(id);
    if (!highlight) {
      return reply.code(404).send({ error: "Highlight not found" });
    }
    
    return reply.send(highlight);
  });
};

export { highlightsRoutes };