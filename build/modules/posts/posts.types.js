"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsSchema = exports.postSchema = exports.createPostDtoSchema = void 0;
const zod_1 = require("zod");
// First, we define the zod schemas
const createPostDtoSchema = zod_1.z.object({
    img_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable().optional(), // Caption can be a string, null, or undefined
});
exports.createPostDtoSchema = createPostDtoSchema;
const postSchema = zod_1.z.object({
    id: zod_1.z.number(),
    img_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable(),
    created_at: zod_1.z.string(), // SQLite returns DATETIME as a string by default
});
exports.postSchema = postSchema;
// This will be useful for validating the response from the `GET /posts` endpoint.
const postsSchema = zod_1.z.array(postSchema);
exports.postsSchema = postsSchema;
