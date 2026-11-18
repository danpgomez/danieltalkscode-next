import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import bio from "./daniel-about-me.webp";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";

export default async function Home() {
  const featuredBlogPosts = await getFeaturedPosts();
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <section id="about-me" className="lg:flex lg:gap-8">
        
        <Image 
          src={bio} 
          alt="Daniel smiling and excited to work with you" placeholder="blur" 
          className="size-64 object-cover rounded-full self-start mx-auto mb-8 shrink-0 lg:mx-0 lg:mb-0"
        />
        
        <div>
          <h1>Hi, I&apos;m Daniel <span aria-hidden="true">👋</span>!</h1>

          <p>
            I&apos;m a frontend developer who loves building with React, TypeScript, and Tailwind. 
            I previously worked at Squarespace for 13 years, including years as a Senior SDET specializing in mobile test automation, 
            and I&apos;ve spent the last couple of years building my frontend skills. I care about usability, accessibility, and code my teammates enjoy working in. 
            I&apos;m open to new opportunities with a friendly team that mentors and celebrates wins. Curious? Browse my projects below, then <Link href="/contact">let&apos;s chat!</Link>
          </p>
        </div>
      </section>

      <section id="projects">
        <h2>Featured Projects</h2>
        <ul className="not-prose grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map(({ slug, frontmatter }) => (

          <ProjectCard 
            key={slug}
            slug={slug}
            title={frontmatter.title}
            description={frontmatter.description}
            thumbnail={frontmatter.thumbnail}
          />

          ))}
        </ul>
      </section>

      <section id="featured-blog-posts">
        <h2>Featured Blog Posts</h2>
        <ul className="not-prose space-y-8">
          {featuredBlogPosts.map(({ slug, frontmatter }) => (
            <BlogPostCard 
              key={slug}
              slug={slug}
              date={frontmatter.date}
              title={frontmatter.title}
              description={frontmatter.description}
              featuredImage={frontmatter.featuredImage}
            />
          ))}
        </ul>
      </section>

    </>
  );
}
