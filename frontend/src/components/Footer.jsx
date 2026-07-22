import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

function Footer() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('services/')
      .then((response) => setServices(response.data.results))
      .catch((error) => console.error('Erreur lors du chargement des services', error));
  }, []);

  return (
    <footer className="site-footer-v2">
      <div className="container footer-grid">
        <div className="footer-col footer-col-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo.png" alt="LabQuality Conseil" className="footer-logo-img" />
            <span>LabQuality Conseil</span>
          </Link>
          <p className="footer-tagline">
            Accompagnement et suivi qualité pour les laboratoires de biologie médicale.
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Navigation</h3>
          <ul className="footer-list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Nos services</h3>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service.id}>
                <Link to="/services">{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Contact</h3>
          <ul className="footer-list">
            <li>
              <a href="tel:+33123456789">
                <span aria-hidden="true">☎</span> +33 1 23 45 67 89
              </a>
            </li>
            <li>
              <a href="mailto:contact@labquality.example">
                <span aria-hidden="true">✉</span> contact@labquality.example
              </a>
            </li>
            <li>
              <a href="#">
                <span aria-hidden="true">📷</span> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 LabQuality Conseil. Tous droits réservés.</p>
        <a href="#">Mentions légales / Confidentialité</a>
      </div>
    </footer>
  );
}

export default Footer;
