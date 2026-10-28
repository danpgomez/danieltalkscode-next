import styles from "./media.module.css";

export function YouTube({ id, title }: { id: string; title: string }) {
    return (
        <div className={styles.frame}>
            <iframe 
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title}
                loading="lazy"
                allowFullScreen
            />
        </div>
    );
}

// Great for GIF-style clips: convert the GIF to MP4 and it's often 10x smaller
export function Video({ src, caption }: { src: string; caption?: string }) {
    return (
        <figure>
            <video src={src} controls playsInline preload="metadata" />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}