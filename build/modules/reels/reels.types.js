"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelSchema = exports.createReelDtoSchema = void 0;
const zod_1 = require("zod");
const createReelDtoSchema = zod_1.z.object({
    video_url: zod_1.z.string().url(),
    thumbnail_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable().optional(),
    views: zod_1.z.number().default(0),
});
exports.createReelDtoSchema = createReelDtoSchema;
const reelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    video_url: zod_1.z.string().url(),
    thumbnail_url: zod_1.z.string().url(),
    caption: zod_1.z.string().nullable(),
    views: zod_1.z.number(),
    created_at: zod_1.z.string(),
});
exports.reelSchema = reelSchema;
