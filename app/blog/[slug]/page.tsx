import type { Metadata } from "next";
import { getAllSlugs, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false; // unknown URLs show a 404

export function generateStaticParams() {
    return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { frontmatter } = await getPost(slug);
    return { title: frontmatter.title,description: frontmatter.description };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const { Content, frontmatter } = await getPost(slug);
    return (
        <article>
            <h1>{frontmatter.title}</h1>
            <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", { dateStyle: "long" })}
            </time>
            <Content />
        </article>
    );
}