import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching all tagged posts`);
      const taggedPosts = fastify.transactions.tagged.getAll();
      return taggedPosts;
    },
  };
};

export { taggedService };