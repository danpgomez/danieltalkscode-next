import type { MDXComponents } from "mdx/types";
import { YouTube, Video } from "@/components/media";
import { Springy } from "./components/Springy";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return { Image, YouTube, Video, Springy, ...components };
}