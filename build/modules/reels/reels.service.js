"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsService = void 0;
const reelsService = (fastify) => {
    return {
        getAll: async () => {
            fastify.log.info(`Fetching all reels`);
            const reels = fastify.transactions.reels.getAll();
            return reels;
        },
    };
};
exports.reelsService = reelsService;
