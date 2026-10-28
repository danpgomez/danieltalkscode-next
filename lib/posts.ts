import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type Frontmatter = {
    title: string;
    date: string;
    description?: string;
};

export function getAllSlugs(): string[] {
    return fs
        .readdirSync(POSTS_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
}

export async function getPost(slug: string) {
    const mod = await import(`@/content/blog/${slug}/index.mdx`);
    return { slug, Content: mod.default, frontmatter: mod.frontmatter as Frontmatter };
}

export async function getAllPosts() {
    const posts = await Promise.all(getAllSlugs().map(getPost));
    return posts.sort(
        (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}