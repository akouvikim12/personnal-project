import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="LabQuality Conseil" className="logo-img" />
          <span className="logo-text">LabQuality Conseil</span>
        </Link>
        <nav className="main-nav">
          <Link to="/">Accueil</Link>
          <Link to="/services">Services</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <Link to="/rendez-vous" className="btn-pill btn-pill-primary">
          <span aria-hidden="true">📅</span>
          Prendre rendez-vous
        </Link>
      </div>
    </header>
  );
}

export default Header;