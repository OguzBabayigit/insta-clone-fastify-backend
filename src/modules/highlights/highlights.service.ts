import type { FastifyInstance } from "fastify";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching all highlights`);
      const highlights = fastify.transactions.highlights.getAll();
      return highlights;
    },
    getById: async (id: number) => {
      fastify.log.info(`Fetching highlight with id: ${id}`);
      const highlight = fastify.transactions.highlights.getById(id);
      return highlight;
    },
  };
};

export { highlightsService };