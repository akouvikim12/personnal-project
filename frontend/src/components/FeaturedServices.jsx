import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

const BACKGROUND_IMAGES = [
  '/images/bg-accueil.png',
  '/images/bg-services.jpg',
  '/images/bg-apropos.jpg',
  '/images/bg-contact.png',
  '/images/bg-faq.jpg',
];

const AUTO_ADVANCE_DELAY = 4000;

function FeaturedServices() {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    apiClient.get('services/')
      .then((response) => setServices(response.data.results))
      .catch((error) => console.error('Erreur lors du chargement des services', error));
  }, []);

  useEffect(() => {
    setShowInfo(false);
  }, [activeIndex]);

  const startTimer = (count) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (count === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTO_ADVANCE_DELAY);
  };

  useEffect(() => {
    startTimer(services.length);
    return () => clearInterval(intervalRef.current);
  }, [services.length]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    startTimer(services.length);
  };

  if (services.length === 0) return null;

  const activeService = services[activeIndex];
  const backgroundImage = BACKGROUND_IMAGES[activeIndex % BACKGROUND_IMAGES.length];

  return (
    <section className="featured-services">
      <div
        key={`bg-${activeService.id}`}
        className="featured-services-bg"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="featured-services-overlay" />

      <div key={`content-${activeService.id}`} className="featured-services-content">
        <h2 className="featured-services-title">{activeService.name}</h2>
        <p className="featured-services-description">{activeService.description}</p>
        <div className="featured-services-actions">
          <button
            type="button"
            className="btn-pill btn-pill-ghost"
            aria-expanded={showInfo}
            onClick={() => setShowInfo((prev) => !prev)}
          >
            Infos
          </button>
          <Link to="/rendez-vous" className="btn-pill btn-pill-primary">Prendre rendez-vous</Link>
        </div>

        <div className={`featured-services-info${showInfo ? ' is-open' : ''}`}>
          <div className="featured-services-info-inner">
            <div className="featured-services-info-item">
              <span className="featured-services-info-icon" aria-hidden="true">⏱</span>
              <span className="featured-services-info-label">Durée</span>
              <span className="featured-services-info-value">{activeService.duration_minutes} minutes</span>
            </div>
            <div className="featured-services-info-item">
              <span className="featured-services-info-icon" aria-hidden="true">💶</span>
              <span className="featured-services-info-label">Tarif</span>
              <span className="featured-services-info-value">
                {activeService.price_on_quote
                  ? 'Sur devis'
                  : activeService.price
                    ? `${activeService.price} €`
                    : '—'}
              </span>
            </div>
            <div className="featured-services-info-item">
              <span className="featured-services-info-icon" aria-hidden="true">📍</span>
              <span className="featured-services-info-label">Format</span>
              <span className="featured-services-info-badges">
                {activeService.is_remote_available && (
                  <span className="featured-services-badge">À distance</span>
                )}
                {activeService.is_onsite_available && (
                  <span className="featured-services-badge">Sur place</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-services-tabs">
        {services.map((service, index) => (
          <button
            type="button"
            key={service.id}
            className={`featured-services-tab${index === activeIndex ? ' active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {service.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedServices;
