import { Metadata } from "next";
import { getAllProjectSlugs, getProject } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }>};

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { frontmatter } = await getProject(slug);
    return { title: frontmatter.title, description: frontmatter.description };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { Content, frontmatter } = await getProject(slug);
    return (
        <article>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.description}</p>
            
            <ul aria-label="Technologies used">
                {frontmatter.tech.map((techCategory) => (
                    <li key={techCategory}>{techCategory}</li>
                ))}
            </ul>

            <div className="flex gap-3">
                {frontmatter.liveUrl && <a href={frontmatter.liveUrl}>View live site</a>}
                {frontmatter.repoUrl && <a href={frontmatter.repoUrl}>View source code</a>}
            </div>
            <Content />
        </article>
    );
}