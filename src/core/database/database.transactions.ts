import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";
import { CreateReelDto } from "src/modules/reels/reels.types";

const createTransactionHelpers = (db: Database) => {
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *",
    ),
    getAllReels: db.prepare("SELECT * FROM reels"),
    createReel: db.prepare(
      "INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *",
    ),
    getAllTagged: db.prepare("SELECT * FROM tagged_posts"),
    getAllHighlights: db.prepare("SELECT * FROM highlights"),
    getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
  };

  const posts = {
  getById: (id: number) => statements.getPostById.get(id),
  getAll: () => statements.getAllPosts.all(),
  create: (data: CreatePostDto) => statements.createPost.get(data),
  delete: (id: number) => {
    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    return stmt.run(id);
    }
  };

  const reels = {
    getAll: () => statements.getAllReels.all(),
    create: (data: CreateReelDto) => statements.createReel.get(data),
  };

  const tagged = {
    getAll: () => statements.getAllTagged.all(),
  };

  // YENİ: Highlights transactions
  const highlights = {
    getAll: () => statements.getAllHighlights.all(),
    getById: (id: number) => statements.getHighlightById.get(id),
  };

  return {
    posts,
    reels,
    tagged,
    highlights, // YENİ: Highlights'ı da döndür
  };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };