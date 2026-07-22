import { Link } from 'react-router-dom';
import FeaturedServices from '../components/FeaturedServices';
import PhotoGrid from '../components/PhotoGrid';
import CtaBanner from '../components/CtaBanner';

function Home() {
  return (
    <>
      <section className="hero hero-with-bg">
        <div className="container hero-inner">
          <h1>Accompagnement et suivi qualité pour les laboratoires</h1>
          <p className="hero-subtitle">
            Améliorez la conformité, la fiabilité et la performance de votre laboratoire
            grâce à un accompagnement personnalisé, conforme aux exigences ISO 15189 / ISO 17025.
          </p>
          <div className="hero-actions">
            <Link to="/rendez-vous" className="btn btn-primary">Prendre rendez-vous</Link>
            <Link to="/services" className="btn btn-secondary">Découvrir les services</Link>
          </div>
        </div>
      </section>

      <FeaturedServices />

      <section className="section section-with-bg">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">années d'expérience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">laboratoires accompagnés</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">taux de satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">normes couvertes (ISO 15189 / ISO 17025)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PhotoGrid />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default Home;
