import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default async function ProjectIndex() {
    const projects = await getAllProjects();
    return (
        <>
            <h1>Projects</h1>
            <ul>
                {projects.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                        <Link href={`/projects/${slug}`}>{frontmatter.title}</Link>
                        <p>{frontmatter.description}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}