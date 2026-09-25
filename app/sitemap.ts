import type { MetadataRoute } from "next";

const siteUrl = "https://munnaflimproduction.example.com"; // TODO: replace with the real domain once live

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/wedding",
    "/birthday",
    "/corporate",
    "/gallery",
    "/packages",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
