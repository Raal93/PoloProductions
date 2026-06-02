export type FilmProject = {
  title: string;
  slug: string;
  location: string;
  excerpt: string;
  coverImage: string;
  vimeoUrl?: string;
  featured?: boolean;
};

export const mockFilms: FilmProject[] = [
  {
    title: "Marta & Tomasz",
    slug: "marta-tomasz",
    location: "Kraków, Polska",
    excerpt: "Intymny ślub w zabytkowym dworku otoczonym historią i ciszą.",
    coverImage: "",
    featured: true,
  },
  {
    title: "Zofia & Michał",
    slug: "zofia-michal",
    location: "Gdańsk, Polska",
    excerpt: "Romantyczny ślub nad morzem z widokiem na zachód słońca.",
    coverImage: "",
    featured: true,
  },
  {
    title: "Anna & Piotr",
    slug: "anna-piotr",
    location: "Warszawa, Polska",
    excerpt: "Eleganckie wesele w centrum stolicy — nowoczesne i ponadczasowe.",
    coverImage: "",
    featured: true,
  },
  {
    title: "Karolina & Jakub",
    slug: "karolina-jakub",
    location: "Wrocław, Polska",
    excerpt: "Ciepła, rodzinna uroczystość w klimatycznej restauracji przy Rynku.",
    coverImage: "",
    featured: false,
  },
  {
    title: "Ewa & Rafał",
    slug: "ewa-rafal",
    location: "Zakopane, Polska",
    excerpt: "Górski ślub wśród Tatr — dzikość natury i nieskończona miłość.",
    coverImage: "",
    featured: false,
  },
  {
    title: "Natalia & Kamil",
    slug: "natalia-kamil",
    location: "Poznań, Polska",
    excerpt: "Minimalistyczna ceremonia pełna autentycznych emocji i światła.",
    coverImage: "",
    featured: false,
  },
];
