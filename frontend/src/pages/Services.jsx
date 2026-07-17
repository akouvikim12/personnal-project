import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('services/')
      .then((response) => setServices(response.data.results))
      .catch((error) => console.error('Erreur lors du chargement des services', error));
  }, []);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Nos services</h1>
          <p>Audit, accompagnement, formation et suivi qualité pour laboratoires de biologie médicale.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-2">
          {services.map((service) => (
            <div className="card card-lg" key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <ul className="card-tags">
                <li>{service.duration_minutes} min</li>
                {service.price_on_quote ? <li>Sur devis</li> : service.price && <li>{service.price} €</li>}
                {service.is_remote_available && <li>À distance</li>}
                {service.is_onsite_available && <li>Sur place</li>}
              </ul>
              <Link to="/rendez-vous" className="btn btn-primary btn-sm">Réserver ce service</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;