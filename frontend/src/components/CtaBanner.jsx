import { Link } from 'react-router-dom';

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner-inner">
        <h2>Prêt à améliorer la qualité de votre laboratoire ?</h2>
        <p>
          Prenez rendez-vous dès aujourd'hui pour un accompagnement personnalisé,
          conforme aux exigences ISO 15189 / ISO 17025.
        </p>
        <Link to="/rendez-vous" className="btn btn-primary btn-lg">Prendre rendez-vous</Link>
      </div>
    </section>
  );
}

export default CtaBanner;
