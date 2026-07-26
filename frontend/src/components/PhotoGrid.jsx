import useScrollReveal from '../hooks/useScrollReveal';

const PHOTOS = [
  { src: '/images/ac1.png', alt: 'Laboratoire - photo 1' },
  { src: '/images/acc2.png', alt: 'Laboratoire - photo 2' },
  { src: '/images/acc3.png', alt: 'Laboratoire - photo 3' },
  { src: '/images/accc4.png', alt: 'Laboratoire - photo 4' },
  { src: '/images/accc5.png', alt: 'Laboratoire - photo 5' },
  { src: '/images/acc8.png', alt: 'Laboratoire - photo 6' },
  { src: '/images/acc6.png', alt: 'Laboratoire - photo 7' },
  { src: '/images/accc7.png', alt: 'Laboratoire - photo 8' },
];

function PhotoGridItem({ photo, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <img
      ref={ref}
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      className={`photo-grid-img${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
    />
  );
}

function PhotoGrid() {
  return (
    <div className="photo-grid">
      {PHOTOS.map((photo, index) => (
        <PhotoGridItem key={photo.src} photo={photo} index={index} />
      ))}
    </div>
  );
}

export default PhotoGrid;
