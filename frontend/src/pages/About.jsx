import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

function About() {
  const [para1Ref, para1Visible] = useScrollReveal();
  const [para2Ref, para2Visible] = useScrollReveal();

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container about-hero-content">
          <h1 className="about-hero-title">
            La qualité, ce n'est pas seulement une exigence, c'est un engagement.
          </h1>
          <p className="about-hero-subtitle">
            Ensemble, faisons de la qualité une véritable culture d'excellence.
          </p>
          <div className="about-hero-meta">
            <span className="about-hero-meta-number">15+</span>
            <span className="about-hero-meta-text">
              années d'expérience au service de la qualité en laboratoire
            </span>
          </div>
        </div>
        <div className="about-hero-card">
          <p className="about-hero-card-eyebrow">LabQuality Conseil</p>
          <h2 className="about-hero-card-title">Conseil qualité</h2>
          <p className="about-hero-card-line">Laboratoires de biologie médicale</p>
          <p className="about-hero-card-line">ISO 15189 / ISO 17025</p>
          <Link to="/rendez-vous" className="about-hero-card-btn">Prendre rendez-vous</Link>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
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
      </section>
    </>
  );
}

export default About;