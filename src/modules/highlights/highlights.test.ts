import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("Highlights API", () => {
  describe("GET /highlights", () => {
    it("should return a list of highlights with a 200 status code", async () => {
      const app = Fastify();
      const mockHighlights = [
        {
          id: 1,
          cover_image_url: "http://example.com/highlight1.jpg",
          title: "Summer Vacation",
          created_at: "2025-10-29 10:00:00"
        },
        {
          id: 2,
          cover_image_url: "http://example.com/highlight2.jpg", 
          title: "Weekend Fun",
          created_at: "2025-10-29 11:00:00"
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
          getAll: jest.fn(),
        },
        highlights: {
          getAll: jest.fn().mockReturnValue(mockHighlights),
          getById: jest.fn(),
        },
      });

      app.register(highlightsRoutes);

      const response = await app.inject({
        method: "GET",
        url: "/highlights",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockHighlights);
    });
  });

  describe("GET /highlights/:id", () => {
    it("should return a single highlight with a 200 status code", async () => {
      const app = Fastify();
      const mockHighlight = {
        id: 1,
        cover_image_url: "http://example.com/highlight1.jpg",
        title: "Summer Vacation",
        created_at: "2025-10-29 10:00:00"
      };

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
          getAll: jest.fn(),
        },
        highlights: {
          getAll: jest.fn(),
          getById: jest.fn().mockReturnValue(mockHighlight),
        },
      });

      app.register(highlightsRoutes);

      const response = await app.inject({
        method: "GET",
        url: "/highlights/1",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockHighlight);
    });
  });
});