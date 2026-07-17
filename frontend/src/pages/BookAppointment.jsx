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
    <>
      <section className="page-header">
        <div className="container">
          <h1>Prendre rendez-vous</h1>
          <p>Décrivez votre besoin, nous vous répondrons sous 48h avec une confirmation par e-mail.</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          {sent && (
            <div className="alert alert-success">
              Votre demande de rendez-vous a bien été enregistrée. Une confirmation vous sera envoyée par e-mail sous 48h.
            </div>
          )}
          {error && <div className="alert alert-error">{error}</div>}
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <label>Nom complet
                <input type="text" name="contact_name" value={form.contact_name} onChange={handleChange} required />
              </label>
              <label>E-mail
                <input type="email" name="contact_email" value={form.contact_email} onChange={handleChange} required />
              </label>
              <label>Téléphone
                <input type="tel" name="contact_phone" value={form.contact_phone} onChange={handleChange} />
              </label>
              <label>Laboratoire / organisation
                <input type="text" name="laboratory_name" value={form.laboratory_name} onChange={handleChange} />
              </label>
              <label>Pays
                <input type="text" name="country" value={form.country} onChange={handleChange} />
              </label>
              <label>Service souhaité
                <select name="service" value={form.service} onChange={handleChange} required>
                  <option value="">-- Choisir --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </label>
              <label>Date souhaitée
                <input type="date" name="requested_date" value={form.requested_date} onChange={handleChange} required />
              </label>
              <label>Heure souhaitée
                <input type="time" name="requested_time" value={form.requested_time} onChange={handleChange} required />
              </label>
              <label>Mode de rendez-vous
                <select name="mode" value={form.mode} onChange={handleChange} required>
                  <option value="online">En ligne / visioconférence</option>
                  <option value="phone">Téléphone</option>
                  <option value="onsite">Sur place</option>
                </select>
              </label>
            </div>
            <label>Votre besoin
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Décrivez brièvement votre besoin..." />
            </label>
            <p className="form-note">Merci de ne transmettre aucune donnée d'analyse ou information confidentielle via ce formulaire.</p>
            <button type="submit" className="btn btn-primary btn-lg">Envoyer ma demande</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default BookAppointment;