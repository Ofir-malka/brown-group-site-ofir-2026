import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://browngroup.it.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/apartments-tel-aviv`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/rent`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties/sale`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}