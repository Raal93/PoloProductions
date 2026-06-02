// src/react/GalleryGrid.tsx

type GalleryGridProps = {
  items: string[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <button key={item} type="button">
          {item}
        </button>
      ))}
    </div>
  );
}
