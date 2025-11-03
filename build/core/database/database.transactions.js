"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHelpers = void 0;
const createTransactionHelpers = (db) => {
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare("INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare("INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *"),
        getAllTagged: db.prepare("SELECT * FROM tagged_posts"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    };
    const posts = {
        getById: (id) => statements.getPostById.get(id),
        getAll: () => statements.getAllPosts.all(),
        create: (data) => statements.createPost.get(data),
        delete: (id) => {
            const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
            return stmt.run(id);
        }
    };
    const reels = {
        getAll: () => statements.getAllReels.all(),
        create: (data) => statements.createReel.get(data),
    };
    const tagged = {
        getAll: () => statements.getAllTagged.all(),
    };
    // YENİ: Highlights transactions
    const highlights = {
        getAll: () => statements.getAllHighlights.all(),
        getById: (id) => statements.getHighlightById.get(id),
    };
    return {
        posts,
        reels,
        tagged,
        highlights, // YENİ: Highlights'ı da döndür
    };
};
exports.createTransactionHelpers = createTransactionHelpers;
