"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsService = void 0;
const highlightsService = (fastify) => {
    return {
        getAll: async () => {
            fastify.log.info(`Fetching all highlights`);
            const highlights = fastify.transactions.highlights.getAll();
            return highlights;
        },
        getById: async (id) => {
            fastify.log.info(`Fetching highlight with id: ${id}`);
            const highlight = fastify.transactions.highlights.getById(id);
            return highlight;
        },
    };
};
exports.highlightsService = highlightsService;
