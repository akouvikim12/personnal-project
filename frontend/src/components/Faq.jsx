import { useState } from 'react';

const FAQ_ITEMS = [
  { question: "Dois-je être à jeun pour ma prise de sang ?", answer: "Cela dépend des analyses prescrites. Certains dosages (glycémie, bilan lipidique) nécessitent un jeûne de 8 à 12h, d'autres non. Vérifiez les instructions indiquées sur votre ordonnance ou contactez-nous." },
  { question: "Ai-je besoin d'un rendez-vous ou puis-je me présenter directement ?", answer: "Les deux sont possibles : vous pouvez prendre rendez-vous en ligne pour être prioritaire, ou vous présenter directement pendant nos horaires d'ouverture." },
  { question: "Combien de temps faut-il pour obtenir mes résultats ?", answer: "Le délai varie selon le type d'analyse — les analyses courantes sont généralement disponibles sous 24 à 48h, certains examens spécialisés peuvent prendre plus de temps." },
  { question: "Comment puis-je récupérer mes résultats ?", answer: "Plusieurs options s'offrent à vous : retrait directement sur place, envoi sécurisé par e-mail, ou consultation via notre portail patient en ligne." },
  { question: "Dois-je apporter ma carte vitale/mutuelle et mon ordonnance ?", answer: "Oui, munissez-vous de votre ordonnance, votre pièce d'identité, votre carte vitale et votre carte de mutuelle le jour du prélèvement." },
  { question: "Le laboratoire réalise-t-il des prélèvements à domicile ?", answer: "Non, tous les prélèvements se font directement dans nos locaux." },
  { question: "Mes données et résultats sont-ils confidentiels ?", answer: "Oui, vos données médicales sont traitées de manière strictement confidentielle, conformément au secret médical et au RGPD." },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.question}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div className="faq-answer">
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Faq;
