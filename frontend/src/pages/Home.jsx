import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('services/')
      .then((response) => setServices(response.data.results.slice(0, 6)))
      .catch((error) => console.error('Erreur lors du chargement des services', error));
  }, []);

  return (
    <>
      <section className="hero">
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

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos prestations</h2>
          <div className="grid grid-3">
            {services.map((service) => (
              <div className="card" key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p className="card-meta">
                  {service.price_on_quote ? 'Sur devis' : `${service.price} €`} · {service.duration_minutes} min
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
