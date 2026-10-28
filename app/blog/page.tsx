import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndex() {
    const posts = await getAllPosts();
    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                        <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
                        <p>{frontmatter.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}