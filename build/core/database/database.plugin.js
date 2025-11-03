"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databasePlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const database_transactions_1 = require("./database.transactions");
async function databasePluginHelper(fastify) {
    const db = new better_sqlite3_1.default("./database.db");
    fastify.log.info("SQLite database connection established.");
    // Tabloları oluştur (eğer yoksa)
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
    // Sample data ekle (eğer tablo boşsa)
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
    const transactions = (0, database_transactions_1.createTransactionHelpers)(db);
    fastify.decorate("db", db);
    fastify.decorate("transactions", transactions);
    fastify.addHook("onClose", (instance, done) => {
        instance.db.close();
        instance.log.info("SQLite database connection closed.");
        done();
    });
}
const databasePlugin = (0, fastify_plugin_1.default)(databasePluginHelper);
exports.databasePlugin = databasePlugin;
