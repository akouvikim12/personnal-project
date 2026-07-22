import { useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [titleRef, titleVisible] = useScrollReveal();
  const [introRef, introVisible] = useScrollReveal();
  const formSectionRef = useRef(null);

  const today = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant, confirmation simple côté client.
    // On pourra brancher un vrai endpoint API de contact plus tard si besoin.
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <div className="contact-hero-brand">
            <img src="/logo.png" alt="LabQuality Conseil" className="contact-hero-logo" />
            <h1 className="contact-hero-name">LabQuality Conseil</h1>
            <p className="contact-hero-tagline">Parlons de votre laboratoire.</p>
          </div>

          <div className="contact-hero-visual">
            <div className="laptop-mockup">
              <div className="laptop-screen">
                <div className="laptop-screen-content">
                  <div className="laptop-screen-info">
                    <p className="laptop-screen-eyebrow">LabQuality</p>
                    <h2 className="laptop-screen-title">Demande de contact</h2>
                    <p className="laptop-screen-line">Service : Contact laboratoire</p>
                    <p className="laptop-screen-line">{today}</p>
                    <button type="button" className="laptop-screen-btn" onClick={scrollToForm}>
                      Envoyer un message
                    </button>
                  </div>
                  <div className="laptop-screen-photo">
                    <img src="/images/bg-contact.png" alt="Laboratoire LabQuality" />
                  </div>
                </div>
              </div>
              <div className="laptop-base" />
            </div>
          </div>
        </div>
      </section>
      <section ref={formSectionRef} className="section section-with-bg-contact">
        <div className="container grid grid-2">
          <div className="contact-intro">
            <h2
              ref={titleRef}
              className={`contact-intro-title${titleVisible ? ' is-visible' : ''}`}
            >
              Parlons de votre laboratoire
            </h2>
            <p
              ref={introRef}
              className={`contact-intro-text${introVisible ? ' is-visible' : ''}`}
            >
              Notre équipe qualité est à votre écoute pour répondre à vos questions sur nos
              accompagnements, audits ou prises de rendez-vous.
            </p>
            <ul className="contact-details">
              <li>
                <span className="contact-detail-icon" aria-hidden="true">✉</span>
                <a href="mailto:contact@labquality.example">contact@labquality.example</a>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden="true">☎</span>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden="true">🕒</span>
                <span>Lun–Ven, 9h–18h</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="contact-form-subtitle">Envoyez-nous un message</p>
            <form className="form-card" onSubmit={handleSubmit}>
              {sent && <div className="alert alert-success">Votre message a bien été envoyé. Nous vous répondrons sous 48h.</div>}
              <label>
                Nom
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                E-mail
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
              </label>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;