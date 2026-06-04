import { useState, useEffect, useRef } from "react";

type Film = {
  title: string;
  meta: string;
  description: string;
  youtubeId: string;
  poster: string;
  preview?: string;
};

const films: Film[] = [
  {
    title: "Adrian & Patrycja",
    meta: "Plener · Wedding Film",
    description: "Filmowa opowieść z naciskiem na detale, gesty i atmosferę dnia.",
    youtubeId: "WFXa3l6ZmWs",
    poster: "/posters/adrian-patrycja-poster.webp",
    preview: "/previews/adrian-patrycja-preview.mp4",
  },
  {
    title: "Maria & Marcin",
    meta: "Stodoła · Wedding Teaser",
    description: "Ciepły, emocjonalny teaser z letniego przyjęcia.",
    youtubeId: "ozLiv10do5M",
    poster: "/posters/maria-marcin-poster.webp",
    preview: "/previews/maria-marcin-preview.mp4",
  },
  {
    title: "Julia & Adam",
    meta: "Pałac Goetz · Wedding Film",
    description: "Elegancka historia ślubna z naturalnym światłem i spokojnym montażem.",
    youtubeId: "VIDEO_ID_3",
    poster: "/images/film-3.webp",
  },
];

// ——— FilmCard ——————————————————————————————————————————————
type FilmCardProps = {
  film: Film;
  onPlay: () => void;
  isPreviewActive: boolean;
  onPreviewStart: () => void;
  onPreviewStop: () => void;
};

function FilmCard({ film, onPlay, isPreviewActive, onPreviewStart, onPreviewStop }: FilmCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPreview = Boolean(film.preview);

  // React to external preview state — play or pause/reset the video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPreviewActive) {
      video.play().catch(() => {
        // Autoplay blocked by browser policy — fall back to poster
        onPreviewStop();
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isPreviewActive]);

  function handleMouseEnter() {
    if (!hasPreview) return;
    onPreviewStart();
  }

  function handleMouseLeave() {
    if (!hasPreview) return;
    onPreviewStop();
  }

  // Mobile: tap on thumb toggles preview; desktop: handled by mouse events
  function handleThumbClick() {
    if (!hasPreview) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) return; // Desktop — mouse events own the preview

    if (isPreviewActive) {
      onPreviewStop();
    } else {
      onPreviewStart();
    }
  }

  return (
    <article className="yt-card">
      <div
        className={`yt-card__thumb${isPreviewActive ? " yt-card__thumb--previewing" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleThumbClick}
      >
        {/* Poster — fades to transparent when preview is active */}
        <img
          src={film.poster}
          alt=""
          className={`yt-card__img${isPreviewActive ? " yt-card__img--hidden" : ""}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        />

        {/* Local preview video — muted, looping, no controls, no autoplay */}
        {hasPreview && (
          <video
            ref={videoRef}
            src={film.preview}
            className={`yt-card__video${isPreviewActive ? " yt-card__video--visible" : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}

        <div className="yt-card__overlay" aria-hidden="true" />

        {/* Touch-device hint — visible only on non-hover devices, hides during preview */}
        {hasPreview && (
          <p className="yt-card__hint" style={{ opacity: isPreviewActive ? 0 : 1 }} aria-hidden="true">
            Podgląd
          </p>
        )}

        {/* Play button — stopPropagation so mobile tap doesn't also toggle preview */}
        <button
          type="button"
          className="yt-card__play"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          aria-label={`Odtwórz film: ${film.title}`}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
            <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="yt-card__body">
        <span className="yt-card__meta">{film.meta}</span>
        <p className="yt-card__title">{film.title}</p>
        <p className="yt-card__desc">{film.description}</p>
      </div>
    </article>
  );
}

// ——— FeaturedFilms ——————————————————————————————————————————
export default function FeaturedFilms() {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (film: Film) => setActiveFilm(film);
  const close = () => setActiveFilm(null);

  useEffect(() => {
    if (!activeFilm) return;

    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeFilm]);

  return (
    <>
      <section className="yt-films" id="filmy">
        <div className="container">
          <div className="yt-films__header">
            <span className="yt-films__label">Portfolio</span>
            <h2 className="yt-films__title">Wybrane historie</h2>
            <p className="yt-films__subtitle">
              Trzy filmy, które najlepiej pokazują mój sposób pracy: naturalne emocje, światło i spokojny, filmowy montaż.
            </p>
          </div>

          <div className="yt-films__grid">
            {films.map((film) => (
              <FilmCard
                key={film.youtubeId}
                film={film}
                onPlay={() => open(film)}
                isPreviewActive={activePreviewId === film.youtubeId}
                onPreviewStart={() => setActivePreviewId(film.youtubeId)}
                onPreviewStop={() => setActivePreviewId(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal — iframe created on open, destroyed on close so video stops */}
      {activeFilm && (
        <div
          className="yt-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Film: ${activeFilm.title}`}
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) close();
          }}
        >
          <div className="yt-modal__box">
            <div className="yt-modal__top">
              <span className="yt-modal__film-title">{activeFilm.title}</span>
              <button ref={closeRef} className="yt-modal__close" onClick={close} aria-label="Zamknij film">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="yt-modal__player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                title={activeFilm.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${activeFilm.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-modal__yt-link"
            >
              Otwórz na YouTube ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
