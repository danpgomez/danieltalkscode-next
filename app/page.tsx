import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <section id="about-me">
        <p>
          Hi there 👋! I&apos;m a frontend developer with a background in software quality and a passion for accessibility.
        </p>
      </section>

      <section id="projects">
        <h2>Projects</h2>
      </section>

      <section id="featured-blog-posts">
        <h2>Featured Blog Posts</h2>
      </section>

    </main>
  );
}
