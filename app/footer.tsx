import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
   
        <footer>
                
            <p>© Daniel Perez-Gomez {currentYear}</p>

            <nav aria-label="footer navigation">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </footer>
    );
};