import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

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
    <section className="contact-hero">
      <div className="contact-light contact-light-one" />
      <div className="contact-light contact-light-two" />

      <div className="contact-presentation">
        <div className="main-brand">
          <img src="/logo.png" alt="LabQuality Conseil" className="main-brand-icon" />
          <div className="main-brand-name">
            <span className="main-brand-lab">Lab</span>
            <span className="main-brand-quality">Quality</span>
          </div>
        </div>
      </div>

      <div className="computer-area">
        <div className="computer-platform" />

        <div className="computer">
          <div className="computer-screen">
            <div className="computer-camera" />

            <div className="screen-page">
              <header className="screen-navbar">
                <span className="screen-logo">
                  <span className="screen-logo-icon" aria-hidden="true">◇</span>
                  <span>Lab</span>
                  <strong>Quality</strong>
                </span>
                <nav className="screen-menu" aria-hidden="true">
                  <span>Accueil</span>
                  <span>Services</span>
                  <span>À propos</span>
                  <span>Contact</span>
                  <span>FAQ</span>
                </nav>
              </header>

              <div className="screen-contact">
                <section className="screen-contact-info">
                  <p className="screen-eyebrow">LabQuality Conseil</p>
                  <h1>
                    Demande
                    <br />
                    de contact
                  </h1>
                  <p className="screen-description">
                    Notre équipe qualité est à votre écoute pour répondre à vos questions ou
                    planifier un rendez-vous.
                  </p>

                  <div className="screen-details">
                    <a href="mailto:contact@labquality.example" className="screen-detail">
                      <span className="screen-detail-icon" aria-hidden="true">✉</span>
                      <span>contact@labquality.example</span>
                    </a>
                    <a href="tel:+33123456789" className="screen-detail">
                      <span className="screen-detail-icon" aria-hidden="true">☎</span>
                      <span>+33 1 23 45 67 89</span>
                    </a>
                    <div className="screen-detail">
                      <span className="screen-detail-icon" aria-hidden="true">🕒</span>
                      <span>Lun–Ven, 9h–18h</span>
                    </div>
                  </div>
                </section>

                <div className="screen-separator" />

                <form className="screen-form" onSubmit={handleSubmit}>
                  <div className="screen-field">
                    <label htmlFor="contact-name">Nom</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="screen-field">
                    <label htmlFor="contact-email">E-mail</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Votre e-mail"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="screen-field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Votre message"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="screen-submit">Envoyer</button>

                  {sent && (
                    <p className="form-message form-success">
                      Votre message a bien été envoyé.
                    </p>
                  )}
                </form>

                <div className="screen-picture">
                  <img src="/images/bg-contact.png" alt="Éprouvettes dans un laboratoire médical" />
                </div>
              </div>
            </div>
          </div>

          <div className="computer-base">
            <div className="computer-base-notch" />
            <div className="computer-ports">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
