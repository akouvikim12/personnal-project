import { useEffect, useState } from 'react';
import apiClient from '../api/client';

function BookAppointment() {
  const [services, setServices] = useState([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    laboratory_name: '',
    country: '',
    service: '',
    requested_date: '',
    requested_time: '',
    mode: 'online',
    message: '',
  });

  useEffect(() => {
    apiClient.get('services/')
      .then((response) => setServices(response.data.results))
      .catch((err) => console.error('Erreur lors du chargement des services', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    apiClient.post('appointments/', form)
      .then(() => {
        setSent(true);
        setForm({
          contact_name: '', contact_email: '', contact_phone: '',
          laboratory_name: '', country: '', service: '',
          requested_date: '', requested_time: '', mode: 'online', message: '',
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue lors de l'envoi. Merci de vérifier les champs et réessayer.");
      });
  };

  return (
    <section className="appointment-layout">
      <aside className="appointment-intro">
        <div className="appointment-intro-overlay" />
        <div className="appointment-intro-content">
          <h1>
            Planifiez votre
            <br />
            rendez-vous
          </h1>
          <p>
            Décrivez votre besoin, nous vous répondrons sous 48h avec une confirmation
            par e-mail.
          </p>

          <div className="appointment-benefits">
            <div className="appointment-benefit">
              <span className="appointment-benefit-icon" aria-hidden="true">👤</span>
              <strong>Expertise reconnue</strong>
            </div>
            <div className="appointment-benefit">
              <span className="appointment-benefit-icon" aria-hidden="true">⚡</span>
              <strong>Réponse rapide</strong>
            </div>
            <div className="appointment-benefit">
              <span className="appointment-benefit-icon" aria-hidden="true">🎯</span>
              <strong>Solutions sur mesure</strong>
            </div>
          </div>
        </div>
      </aside>

      <section className="appointment-form-card">
        <h2>Vos informations</h2>

        {sent && (
          <div className="alert alert-success">
            Votre demande de rendez-vous a bien été enregistrée. Une confirmation vous sera envoyée par e-mail sous 48h.
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="appointment-grid">
            <div className="appointment-field">
              <label htmlFor="contact_name">Nom complet</label>
              <input
                id="contact_name"
                name="contact_name"
                type="text"
                placeholder="Votre nom"
                value={form.contact_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="appointment-field">
              <label htmlFor="contact_email">E-mail</label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                placeholder="Votre e-mail"
                value={form.contact_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="appointment-grid">
            <div className="appointment-field">
              <label htmlFor="contact_phone">Téléphone</label>
              <input
                id="contact_phone"
                name="contact_phone"
                type="tel"
                placeholder="Votre numéro"
                value={form.contact_phone}
                onChange={handleChange}
              />
            </div>
            <div className="appointment-field">
              <label htmlFor="laboratory_name">Laboratoire / organisation</label>
              <input
                id="laboratory_name"
                name="laboratory_name"
                type="text"
                placeholder="Nom de votre laboratoire / organisation"
                value={form.laboratory_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="appointment-field">
            <label htmlFor="service">Service souhaité</label>
            <select id="service" name="service" value={form.service} onChange={handleChange} required>
              <option value="">Sélectionnez un service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="appointment-grid">
            <div className="appointment-field">
              <label htmlFor="mode">Mode de rendez-vous</label>
              <select id="mode" name="mode" value={form.mode} onChange={handleChange} required>
                <option value="online">En ligne / visioconférence</option>
                <option value="phone">Téléphone</option>
                <option value="onsite">Sur place</option>
              </select>
            </div>
            <div className="appointment-field">
              <label htmlFor="country">Pays</label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Votre pays"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="appointment-grid">
            <div className="appointment-field">
              <label htmlFor="requested_date">Date souhaitée</label>
              <input
                id="requested_date"
                name="requested_date"
                type="date"
                value={form.requested_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="appointment-field">
              <label htmlFor="requested_time">Heure souhaitée</label>
              <input
                id="requested_time"
                name="requested_time"
                type="time"
                value={form.requested_time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="appointment-field">
            <label htmlFor="message">Votre besoin</label>
            <textarea
              id="message"
              name="message"
              placeholder="Décrivez brièvement votre besoin..."
              rows="5"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <p className="form-note">Merci de ne transmettre aucune donnée d'analyse ou information confidentielle via ce formulaire.</p>

          <button type="submit" className="appointment-submit">Envoyer ma demande</button>
        </form>
      </section>
    </section>
  );
}

export default BookAppointment;
