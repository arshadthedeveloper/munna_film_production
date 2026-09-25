import type { MetadataRoute } from "next";

const siteUrl = "https://munnaflimproduction.example.com"; // TODO: replace with the real domain once live

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
