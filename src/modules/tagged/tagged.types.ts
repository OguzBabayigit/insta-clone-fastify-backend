import { z } from "zod";

const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
  tagged_by: z.string(),
});

const taggedPostsSchema = z.array(taggedPostSchema);

type TaggedPost = z.infer<typeof taggedPostSchema>;

export { taggedPostSchema, taggedPostsSchema };
export type { TaggedPost };