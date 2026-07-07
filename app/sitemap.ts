import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllCakes } from "@/lib/cakes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cakes = await getAllCakes();

  const staticRoutes = ["", "/cakes", "/about", "/classes", "/contact"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const cakeRoutes = cakes.map((cake) => ({
    url: `${SITE_URL}/cakes/${cake.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...cakeRoutes];
}
