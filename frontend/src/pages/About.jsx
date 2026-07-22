import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

function About() {
  const [para1Ref, para1Visible] = useScrollReveal();
  const [para2Ref, para2Visible] = useScrollReveal();

  return (
    <>
      <section className="about-glass-hero">
        <div className="about-glass-overlay" />
        <div className="about-glass-frame">
          <div className="about-glass-navbar">
            <Link to="/" className="about-glass-logo">
              <span className="about-glass-logo-white">Lab</span>
              <span className="about-glass-logo-teal">Quality</span>
            </Link>
            <nav className="about-glass-menu">
              <Link to="/">Accueil</Link>
              <Link to="/services">Services</Link>
              <Link to="/a-propos">À propos</Link>
              <Link to="/contact">Contact</Link>
              <a href="#qualite">Qualité</a>
              <Link to="/rendez-vous" className="about-glass-menu-btn">Rendez-vous</Link>
            </nav>
          </div>

          <div className="about-glass-main">
            <div className="about-glass-content">
              <p className="about-glass-eyebrow">LabQuality Conseil</p>
              <h1 className="about-glass-title">
                La qualité, ce n'est pas seulement une exigence, c'est un engagement.
              </h1>
              <p className="about-glass-subtitle">
                Ensemble, faisons de la qualité une véritable culture d'excellence.
              </p>
            </div>

            <aside className="about-glass-card">
              <p className="about-glass-card-label">LabQuality Conseil</p>
              <h2 className="about-glass-card-title">Conseil qualité</h2>
              <div className="about-glass-card-info">
                <p>Laboratoires de biologie médicale</p>
                <p>ISO 15189 / ISO 17025</p>
              </div>
              <Link to="/rendez-vous" className="about-glass-card-btn">Prendre rendez-vous</Link>
            </aside>
          </div>

          <div className="about-glass-experience">
            <strong className="about-glass-experience-number">15+</strong>
            <p className="about-glass-experience-text">
              années d'expérience au service de la qualité en laboratoire
            </p>
          </div>

          <div className="about-glass-extra">
            <p
              ref={para1Ref}
              className={`scroll-reveal${para1Visible ? ' is-visible' : ''}`}
              style={{ transitionDelay: '0s' }}
            >
              Au laboratoire, je mets un point d'honneur à appliquer et à promouvoir le système
              qualité afin de garantir des résultats fiables, précis et conformes aux normes.
              Rigueur, sens de l'organisation, intégrité et souci du détail sont des qualités
              qui guident chacune de mes actions.
            </p>
            <p
              ref={para2Ref}
              className={`scroll-reveal${para2Visible ? ' is-visible' : ''}`}
              style={{ transitionDelay: '0.1s' }}
            >
              Je crois que l'amélioration continue, le respect des procédures et le travail
              d'équipe sont les clés d'un laboratoire performant et digne de confiance.
              Chaque analyse est une responsabilité, et chaque résultat contribue à la sécurité
              et au bien-être de tous.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;