import styles from "./page.module.css";
import { getFeaturedPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const featuredBlogPosts = await getFeaturedPosts();

  return (
    <main className={styles.main}>

      <section id="about-me">
        <p>
          Hi there 👋! I&apos;m a frontend developer with a background in software quality and a passion for accessibility.
        </p>
      </section>

      <section id="projects">
        <h2>Projects</h2>
      </section>

      <section id="featured-blog-posts">
        <h2>Featured Blog Posts</h2>
        <ul>
          {featuredBlogPosts.map(({ slug, frontmatter }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
              <p>{frontmatter.description}</p>
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
