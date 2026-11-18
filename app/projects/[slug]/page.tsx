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
            
            <ul aria-label="Technologies used" className="not-prose my-6 flex flex-wrap gap-2">
                {frontmatter.tech.map((techCategory) => (
                    <li key={techCategory} className="rounded-full bg-gray-200 px-3 py-1 text-sm">{techCategory}</li>
                ))}
            </ul>

            <div className="not-prose my-6 flex flex-wrap gap-3">
                {frontmatter.liveUrl && (
                    <a 
                        href={frontmatter.liveUrl}
                        className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        View live site
                    </a>
                )}
                {frontmatter.repoUrl && (
                    <a 
                        href={frontmatter.repoUrl}
                        className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        View source code
                    </a>
                )}
            </div>
            <Content />
        </article>
    );
}