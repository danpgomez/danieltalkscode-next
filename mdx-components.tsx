import type { MDXComponents } from "mdx/types";
import { YouTube, Video } from "@/components/media";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return { YouTube, Video, ...components };
}