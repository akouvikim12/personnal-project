import { useRef } from 'react';

const GALLERY_IMAGES = [
  { src: '/images/bg-accueil.png', alt: 'Laboratoire - accueil' },
  { src: '/images/bg-services.jpg', alt: 'Laboratoire - services' },
  { src: '/images/bg-apropos.jpg', alt: 'Laboratoire - à propos' },
  { src: '/images/bg-contact.png', alt: 'Laboratoire - contact' },
  { src: '/images/bg-faq.jpg', alt: 'Laboratoire - FAQ' },
];

function Gallery() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <div className="gallery-container">
      <button
        type="button"
        className="gallery-arrow gallery-arrow-left"
        aria-label="Défiler vers la gauche"
        onClick={() => scroll(-1)}
      >
        ‹
      </button>
      <div className="gallery-scroll" ref={scrollRef}>
        {GALLERY_IMAGES.map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} className="gallery-img" />
        ))}
      </div>
      <button
        type="button"
        className="gallery-arrow gallery-arrow-right"
        aria-label="Défiler vers la droite"
        onClick={() => scroll(1)}
      >
        ›
      </button>
    </div>
  );
}

export default Gallery;
