import type { MDXComponents } from "mdx/types";
import { YouTube, Video } from "@/components/media";
import { Springy } from "./components/Springy";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return { YouTube, Video, Springy, ...components };
}