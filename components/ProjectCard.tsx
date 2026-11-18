import Link from "next/link";
import Image, { type ImageProps} from "next/image";

type Props = {
    slug: string;
    title: string;
    description: string;
    thumbnail: ImageProps["src"];
    as?: "h2" | "h3";
};

function ProjectCard({
    slug,
    title,
    description,
    thumbnail,
    as: Heading = "h3",
}: Props) {
    return (
        <li className="relative flex flex-col gap-3 rounded-xl bg-gray-200 p-4 transition hover:bg-gray-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2">
            <Image 
                src={thumbnail}
                width={400}
                height={300}
                alt=""
                className="aspect-4/3 w-full rounded-lg object-cover object-top"
            />
            <Heading className="text-xl font-semibold">
                <Link href={`/projects/${slug}`} className="after:absolute after:inset-0">
                    {title}
                </Link>
            </Heading>
            <p className="text-gray-700">{description}</p>
        </li>
    );
}

export default ProjectCard;