import fs from "node:fs";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
    title: string;
    description: string;
    thumbnail: string;
    thumbnailAlt: string;
    tech: string[];
    liveUrl?: string;
    repoUrl?: string;
    featured?: boolean;
    order: number;
};

export function getAllProjectSlugs(): string[] {
    return fs
        .readdirSync(PROJECTS_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
}

export async function getProject(slug: string) {
    const mod = await import(`@/content/projects/${slug}/index.mdx`);
    return { slug, Content: mod.default, frontmatter: mod.frontmatter as ProjectFrontmatter };
}

export async function getAllProjects() {
    const projects = await Promise.all(getAllProjectSlugs().map(getProject));
    return projects.sort(
        (a, b) => b.frontmatter.order - a.frontmatter.order
    );
}

export async function getFeaturedProjects() {
    const featuredProjects = await getAllProjects();
    return featuredProjects.filter(project => project.frontmatter.featured);
}