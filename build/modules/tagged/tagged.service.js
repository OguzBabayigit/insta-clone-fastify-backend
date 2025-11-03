"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedService = void 0;
const taggedService = (fastify) => {
    return {
        getAll: async () => {
            fastify.log.info(`Fetching all tagged posts`);
            const taggedPosts = fastify.transactions.tagged.getAll();
            return taggedPosts;
        },
    };
};
exports.taggedService = taggedService;
