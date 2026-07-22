import FeaturedServices from '../components/FeaturedServices';

function Services() {
  return (
    <>
      <section className="page-header page-header-services">
        <div className="container">
          <h1>Nos services</h1>
          <p>Audit, accompagnement, formation et suivi qualité pour laboratoires de biologie médicale.</p>
        </div>
      </section>
      <FeaturedServices />
    </>
  );
}

export default Services;