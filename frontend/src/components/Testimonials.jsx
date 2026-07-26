import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Lynda Akim',
    role: 'Patiente',
    rating: 4,
    photo: '/images/avi1.png',
    quote: "Très bon accueil et personnel aimable. La prise en charge a été rapide et les résultats ont été disponibles dans les délais annoncés. Je recommande ce laboratoire pour son professionnalisme.",
  },
  {
    name: 'Karim Dash',
    role: 'Patient',
    rating: 3,
    photo: '/images/avi2.png',
    quote: "L'expérience a été globalement satisfaisante. Le personnel est courtois, mais le temps d'attente était un peu plus long que prévu. Les résultats étaient néanmoins fiables et bien expliqués.",
  },
  {
    name: 'Marc Lebois',
    role: 'Médecin généraliste',
    rating: 4,
    photo: '/images/avi3.png',
    quote: "Je collabore régulièrement avec ce laboratoire et je suis satisfait de la qualité des analyses ainsi que de la rapidité de transmission des résultats. Une équipe sérieuse et compétente.",
  },
  {
    name: 'Madia Hélène',
    role: 'Infirmière à domicile',
    rating: 5,
    photo: '/images/avi4.png',
    quote: "Un laboratoire exemplaire. L'équipe est toujours disponible, accueillante et très professionnelle. Les patients que j'accompagne sont rassurés par la qualité du service. Je recommande sans hésiter.",
  },
  {
    name: 'Sophie Martin',
    role: 'Patiente',
    rating: 3,
    photo: '/images/avi5.png',
    quote: "Les analyses ont été réalisées correctement et les résultats reçus dans les temps. Quelques minutes d'attente supplémentaires à l'accueil, mais le personnel est resté poli et à l'écoute.",
  },
];

const AUTO_ADVANCE_DELAY = 4000;

const AVERAGE_RATING = (
  TESTIMONIALS.reduce((sum, item) => sum + item.rating, 0) / TESTIMONIALS.length
).toFixed(1);
const AVERAGE_RATING_ROUNDED = Math.round(AVERAGE_RATING);
const AVERAGE_RATING_STARS = '★'.repeat(AVERAGE_RATING_ROUNDED) + '☆'.repeat(5 - AVERAGE_RATING_ROUNDED);

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_DELAY);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    setActiveIndex(index);
    startTimer();
  };

  const goPrev = () => {
    goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goNext = () => {
    goTo((activeIndex + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <div className="testimonials-section">
      <div className="testimonials-main">
        <div className="testimonials-header">
          <div className="testimonials-heading">
            <h2 className="testimonials-title">Ce que disent nos patients</h2>
            <p className="testimonials-subtitle">
              Des retours authentiques de patients et professionnels qui nous font confiance.
            </p>
          </div>
          <div className="testimonials-nav">
            <button
              type="button"
              className="testimonials-arrow testimonials-arrow-left"
              aria-label="Avis précédent"
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="testimonials-arrow testimonials-arrow-right"
              aria-label="Avis suivant"
              onClick={goNext}
            >
              ›
            </button>
          </div>
        </div>

        <div className="testimonials-card" key={activeIndex}>
          {active.photo ? (
            <img src={active.photo} alt={active.name} loading="lazy" className="testimonials-avatar-photo" />
          ) : (
            <div className="testimonials-avatar" aria-hidden="true">{getInitials(active.name)}</div>
          )}
          <div className="testimonials-stars" aria-label={`${active.rating} étoiles sur 5`}>
            {'★'.repeat(active.rating)}{'☆'.repeat(5 - active.rating)}
          </div>
          <p className="testimonials-quote">« {active.quote} »</p>
          <p className="testimonials-name">{active.name}</p>
          <p className="testimonials-role">{active.role}</p>
        </div>
      </div>

      <div className="testimonials-photo">
        <img src="/images/acc3.png" alt="Laboratoire LabQuality" loading="lazy" className="testimonials-photo-img" />
        <div className="testimonials-rating-badge">
          <span className="testimonials-rating-number">{AVERAGE_RATING}</span>
          <span className="testimonials-rating-stars" aria-hidden="true">{AVERAGE_RATING_STARS}</span>
          <span className="testimonials-rating-label">NOTE CLIENTS</span>
          <div className="testimonials-avatar-stack">
            {TESTIMONIALS.map((item) => (
              <img
                key={item.name}
                src={item.photo}
                alt={item.name}
                loading="lazy"
                className="testimonials-mini-avatar"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
