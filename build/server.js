"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const database_plugin_1 = require("./core/database/database.plugin");
const posts_routes_1 = require("./modules/posts/posts.routes");
const reels_routes_1 = require("./modules/reels/reels.routes");
const tagged_routes_1 = require("./modules/tagged/tagged.routes");
const highlights_routes_1 = require("./modules/highlights/highlights.routes");
const fastify = (0, fastify_1.default)({
    logger: true,
});
// Static file serving - MANUEL
fastify.get('/uploads/*', async (request, reply) => {
    const filePath = request.url.replace('/uploads/', '');
    const fullPath = path_1.default.join(process.cwd(), 'public', 'uploads', filePath);
    try {
        const file = await promises_1.default.readFile(fullPath);
        const ext = path_1.default.extname(filePath).toLowerCase();
        const contentType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif'
        }[ext] || 'application/octet-stream';
        reply.header('Content-Type', contentType);
        return reply.send(file);
    }
    catch (error) {
        return reply.code(404).send({ error: 'File not found' });
    }
});
fastify.register(multipart_1.default);
fastify.register(database_plugin_1.databasePlugin);
fastify.register(posts_routes_1.postsRoutes);
fastify.register(reels_routes_1.reelsRoutes);
fastify.register(tagged_routes_1.taggedRoutes);
fastify.register(highlights_routes_1.highlightsRoutes);
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});
const port = Number(process.env.PORT) || 3000;
fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
