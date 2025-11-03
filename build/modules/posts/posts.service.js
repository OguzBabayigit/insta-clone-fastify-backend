"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const file_storage_service_1 = require("../../common/file-storage.service"); // Import the new service
const postsService = (fastify) => {
    return {
        create: async (data) => {
            fastify.log.info(`Creating a new post`);
            let img_url = data.caption; // Fallback if no image, or placeholder
            if (data.imageFile) {
                // If an image is provided, save it and get the URL
                img_url = await file_storage_service_1.fileStorageService.saveImage(data.imageFile.buffer, data.imageFile.filename);
            }
            const post = fastify.transactions.posts.create({
                img_url,
                caption: data.caption,
            });
            return post;
        },
    };
};
exports.postsService = postsService;
