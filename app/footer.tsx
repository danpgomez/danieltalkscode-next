import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
   
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-600">
                
            <p>© Daniel Perez-Gomez {currentYear}</p>

            <nav aria-label="Footer">
                <ul className="mt-4 flex justify-center gap-6">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </footer>
    );
};