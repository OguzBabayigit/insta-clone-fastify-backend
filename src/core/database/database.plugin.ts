import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Database from "better-sqlite3";
import {
  createTransactionHelpers,
  type TransactionHelpers,
} from "./database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transactions: TransactionHelpers;
  }
}

async function databasePluginHelper(fastify: FastifyInstance) {
  const db = new Database(":memory:");
  fastify.log.info("SQLite database connection established.");

  
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      caption TEXT,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      tagged_by TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cover_image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  
  db.exec(`
    INSERT OR IGNORE INTO tagged_posts (img_url, caption, tagged_by) 
    SELECT 'https://picsum.photos/400/400', 'You were tagged in this post!', 'friend_user'
    WHERE NOT EXISTS (SELECT 1 FROM tagged_posts);
    
    INSERT OR IGNORE INTO tagged_posts (img_url, caption, tagged_by) 
    SELECT 'https://picsum.photos/401/401', 'Another tagged post', 'family_user' 
    WHERE NOT EXISTS (SELECT 1 FROM tagged_posts);
    
    INSERT OR IGNORE INTO highlights (cover_image_url, title) 
    SELECT 'https://picsum.photos/300/300', 'Summer Vacation' 
    WHERE NOT EXISTS (SELECT 1 FROM highlights);
    
    INSERT OR IGNORE INTO highlights (cover_image_url, title) 
    SELECT 'https://picsum.photos/301/301', 'Weekend Fun' 
    WHERE NOT EXISTS (SELECT 1 FROM highlights);
  `);

  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (instance, done) => {
    instance.db.close();
    instance.log.info("SQLite database connection closed.");
    done();
  });
}

const databasePlugin = fp(databasePluginHelper);

export { databasePlugin };