import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectIndex() {
    const projects = await getAllProjects();
    return (
        <>
            <h1>Projects</h1>
            <ul className="list-none">
                {projects.map(({ slug, frontmatter }) => (
                    <ProjectCard 
                        key={slug}
                        as="h2"
                        slug={slug}
                        title={frontmatter.title}
                        description={frontmatter.description}
                        thumbnail={frontmatter.thumbnail}
                    />
                ))}
            </ul>
        </>
    );
}