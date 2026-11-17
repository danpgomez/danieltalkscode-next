import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import bio from "./daniel-about-me.webp";

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
            
            <li key={slug}> 
              <Link 
              href={`/projects/${slug}`}
              className="block h-full rounded-xl bg-gray-300 p-3 hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <p className="mb-2 font-semibold">{frontmatter.title}</p>
                
                <Image 
                  src={frontmatter.thumbnail} 
                  width={400} 
                  height={300}
                  alt="" // The scr reader will read the Link's frontmatter.title which is enough.
                  className="aspect-4/3 w-full rounded-lg object-cover object-top"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="featured-blog-posts">
        <h2>Featured Blog Posts</h2>
        <ul className="not-prose space-y-8">
          {featuredBlogPosts.map(({ slug, frontmatter }) => (
            <li key={slug}>
              <Link 
               href={`/blog/${slug}`}
               className="text-xl font-semibold hover:underline"
              >{frontmatter.title}</Link>
              <p className="mt-1 text-gray-600">{frontmatter.description}</p>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
