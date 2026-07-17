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
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact</h1>
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-2">
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
          <div className="contact-info">
            <p><strong>E-mail :</strong> contact@labquality.example</p>
            <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
            <p><strong>Horaires :</strong> Lun–Ven, 9h–18h (UTC)</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;