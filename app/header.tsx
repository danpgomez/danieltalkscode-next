import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <Link href="/"><h1>Daniel Perez-Gomez</h1></Link>
                <h2>Frontend Engineer</h2>
            </header>

            <nav aria-label="header navigation">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};