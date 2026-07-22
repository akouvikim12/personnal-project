import FaqAccordion from '../components/Faq';
import Testimonials from '../components/Testimonials';

function Faq() {
  return (
    <>
      <section className="faq-section">
        <div className="faq-top">
          <span className="faq-badge">FAQ</span>
          <h1>Questions fréquentes</h1>
          <p>Retrouvez les réponses aux questions les plus courantes concernant nos analyses et nos rendez-vous.</p>
        </div>
        <div className="faq-visual">
          <img src="/images/bg-faq.jpg" alt="Laboratoire" className="faq-image" />
          <div className="faq-card">
            <p className="faq-card-label">QUESTIONS COURANTES</p>
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="section testimonials-bg">
        <div className="container">
          <Testimonials />
        </div>
      </section>
    </>
  );
}

export default Faq;
