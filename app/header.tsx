import Link from "next/link";

export default function Header() {
    return (
        <header className="max-w-none border-b border-gray-200">
            <div className="mx-auto max-w-3xl px-6 pt-4">
                <Link href="/" className="text-lg font-bold">Daniel Perez-Gomez</Link>
                <p className="text-sm text-gray-600">Frontend Engineer</p>
            </div>
            <nav 
                aria-label="Main"
                className="mx-auto max-w-3xl items-center px-6 py-4"
            >
                <ul className="flex gap-6 text-sm text-gray-600">
                    <li className="hover:text-black"><Link href="/">Home</Link></li>
                    <li className="hover:text-black"><Link href="/projects">Projects</Link></li>
                    <li className="hover:text-black"><Link href="/blog">Blog</Link></li>
                    <li className="hover:text-black"><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};