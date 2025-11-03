"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsSchema = exports.highlightSchema = void 0;
const zod_1 = require("zod");
const highlightSchema = zod_1.z.object({
    id: zod_1.z.number(),
    cover_image_url: zod_1.z.string().url(),
    title: zod_1.z.string(),
    created_at: zod_1.z.string(),
});
exports.highlightSchema = highlightSchema;
const highlightsSchema = zod_1.z.array(highlightSchema);
exports.highlightsSchema = highlightsSchema;
