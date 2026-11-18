import Image from "next/image";
import Link from "next/link";

type Props = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    featuredImage?: { src: string };
    as?: "h2" | "h3";
};

function BlogPostCard({
    slug,
    title,
    date,
    description,
    featuredImage,
    as: Heading = "h3",
}: Props) {
    return (
        <li className="relative flex flex-col gap-4 rounded-xl border border-gray-200 p-4">
            {featuredImage && (
                <Image 
                    src={featuredImage.src}
                    width={400}
                    height={300}
                    alt=""
                    className="aspect-4/3 w-full rounded-lg object-cover sm:w-48 sm:shrink-0"
                />
            )}

            <div>
                <time dateTime={date} className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString("en-US", {
                        dateStyle: "long",
                        timeZone: "UTC",
                    })}
                </time>
                <Heading className="mt-1 text-xl font-semibold">
                    <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
                        {title}
                    </Link>
                </Heading>
                {description && <p className="mt-2 text-gray-700">{description}</p>}
            </div>
        </li>
    );
}

export default BlogPostCard;