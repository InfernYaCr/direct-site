import { site as fallbackSite } from "@/data/site";

export function GET({ site }: { site?: URL }) {
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const root = new URL(base, site ?? new URL(fallbackSite.url));
  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /thank-you/",
    "Disallow: /checkout/",
    "Disallow: /downloads/",
    "",
    `Sitemap: ${new URL("sitemap.xml", root).toString()}`,
    "",
  ].join("\n");

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
