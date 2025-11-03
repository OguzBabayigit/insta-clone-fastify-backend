import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fs from 'fs/promises';
import path from "path";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

const fastify = Fastify({
  logger: true,
});

// Static file serving - MANUEL
fastify.get('/uploads/*', async (request, reply) => {
  const filePath = request.url.replace('/uploads/', '');
  const fullPath = path.join(process.cwd(), 'public', 'uploads', filePath);
  
  try {
    const file = await fs.readFile(fullPath);
    const ext = path.extname(filePath).toLowerCase();
    
    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif'
    }[ext] || 'application/octet-stream';
    
    reply.header('Content-Type', contentType);
    return reply.send(file);
  } catch (error) {
    return reply.code(404).send({ error: 'File not found' });
  }
});

fastify.register(multipart);
fastify.register(databasePlugin);
fastify.register(postsRoutes);
fastify.register(reelsRoutes);
fastify.register(taggedRoutes);
fastify.register(highlightsRoutes);

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

const port = Number(process.env.PORT) || 3000;

fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});