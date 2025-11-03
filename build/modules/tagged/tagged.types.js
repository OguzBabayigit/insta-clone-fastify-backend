"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedPostsSchema = exports.taggedPostSchema = void 0;
const zod_1 = require("zod");
const taggedPostSchema = zod_1.z.object({
    id: zod_1.z.number(),
    img_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable(),
    created_at: zod_1.z.string(),
    tagged_by: zod_1.z.string(),
});
exports.taggedPostSchema = taggedPostSchema;
const taggedPostsSchema = zod_1.z.array(taggedPostSchema);
exports.taggedPostsSchema = taggedPostsSchema;
