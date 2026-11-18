import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogPostCard from "@/components/BlogPostCard";

export default async function BlogIndex() {
    const posts = await getAllPosts();
    return (
        <>
            <h1>Blog</h1>
            <ul>
                {posts.map(({ slug, frontmatter }) => (
                    <BlogPostCard 
                        key={slug}
                        as="h2"
                        slug={slug}
                        title={frontmatter.title}
                        date={frontmatter.date}
                        description={frontmatter.description}
                        featuredImage={frontmatter.featuredImage}
                    />
                ))}
            </ul>
        </>
    );
}