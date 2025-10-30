import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();
    const mockTaggedPosts = [
      {
        id: 1,
        img_url: "http://example.com/tagged1.jpg",
        caption: "You were tagged in this post!",
        created_at: "2025-10-29 10:00:00",
        tagged_by: "friend_user"
      },
      {
        id: 2, 
        img_url: "http://example.com/tagged2.jpg",
        caption: "Another tagged post",
        created_at: "2025-10-29 11:00:00",
        tagged_by: "family_user"
      }
    ];

    app.decorate("transactions", {
      posts: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      reels: {
        getAll: jest.fn(),
        create: jest.fn(),
      },
      tagged: {
        getAll: jest.fn().mockReturnValue(mockTaggedPosts),
      },
    });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockTaggedPosts);
  });
});