import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { readdirSync } from "node:fs";
import path from "node:path";

const nextConfig: NextConfig = {
  // Send every old Gatsby URL (/my-post) to its new home (/blog/my-post)
  async redirects() {
    const dir = path.join(process.cwd(), "content", "blog");
    return readdirSync(dir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => ({
        source: `/${entry.name}`,
        destination: `/blog/${entry.name}`,
        permanent: true,
      }));
  },

  // Basic security headers for every page
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      // "wrap" makes the heading itself the link which is friendlier to screen readers
      ["rehype-autolink-headings", { behavior: "wrap" }],
      ["rehype-pretty-code", { theme: "github-dark" }],
    ],
  },
});

export default withMDX(nextConfig);
