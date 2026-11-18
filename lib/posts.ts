import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type Frontmatter = {
    title: string;
    date: string;
    description?: string;
    featured: boolean;
    featuredImage?: { src: string, alt: string }
};

export function getAllSlugs(): string[] {
    return fs
        .readdirSync(POSTS_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
}

export async function getPost(slug: string) {
    const mod = await import(`@/content/blog/${slug}/index.mdx`);
    const frontmatter = mod.frontmatter as Frontmatter;
    const { featuredImage } = frontmatter;

    return {
        slug,
        Content: mod.default,
        frontmatter: {
            ...frontmatter,
            featuredImage: featuredImage && {
                ...featuredImage,
                src: featuredImage.src.startsWith("./")
                ? `/blog/${slug}/${featuredImage.src.slice(2)}`
                : featuredImage.src,
            },
        } satisfies Frontmatter
    };
}

export async function getAllPosts() {
    const posts = await Promise.all(getAllSlugs().map(getPost));
    return posts.sort(
        (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export async function getFeaturedPosts() {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => post.frontmatter.featured);
}