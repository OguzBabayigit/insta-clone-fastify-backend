"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const posts_service_1 = require("./posts.service");
const zod_1 = require("zod");
const createPostSchema = zod_1.z.object({
    caption: zod_1.z.string().min(1, "Caption cannot be empty.").optional(),
});
const postsRoutes = async (fastify) => {
    const service = (0, posts_service_1.postsService)(fastify);
    fastify.get("/posts", async (request, reply) => {
        try {
            const posts = await fastify.transactions.posts.getAll();
            return reply.send(posts);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.code(500).send({ message: "Failed to fetch posts" });
        }
    });
    fastify.post("/posts", async (request, reply) => {
        if (!request.isMultipart()) {
            reply.code(415).send({ message: "Request must be multipart" });
            return;
        }
        const parts = request.parts();
        let caption;
        let imageFile;
        for await (const part of parts) {
            if (part.type === "field") {
                if (part.fieldname === "caption") {
                    caption = part.value;
                }
            }
            else if (part.type === "file") {
                const buffers = [];
                for await (const chunk of part.file) {
                    buffers.push(chunk);
                }
                imageFile = {
                    buffer: Buffer.concat(buffers),
                    filename: part.filename,
                };
            }
        }
        if (!imageFile && !caption) {
            return reply
                .code(400)
                .send({ message: "Either image or caption is required." });
        }
        try {
            if (caption) {
                createPostSchema.pick({ caption: true }).parse({ caption });
            }
            const newPost = await service.create({
                caption: caption || "",
                imageFile: imageFile,
            });
            return reply.code(201).send(newPost);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply
                    .code(400)
                    .send({ message: "Validation failed", errors: error.errors });
            }
            fastify.log.error(error);
            return reply.code(500).send({ message: "Failed to create post" });
        }
    });
    fastify.delete("/posts/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            const result = await fastify.transactions.posts.delete(parseInt(id));
            if (result.changes > 0) {
                return reply.code(204).send();
            }
            else {
                return reply.code(404).send({ message: "Post not found" });
            }
        }
        catch (error) {
            fastify.log.error(error);
            return reply.code(500).send({ message: "Failed to delete post" });
        }
    });
};
exports.postsRoutes = postsRoutes;
