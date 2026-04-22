import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://browngroup.it.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/properties/rent`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/properties/sale`,
      lastModified: new Date(),
    },
  ];
}