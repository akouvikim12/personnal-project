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
        </nav>
        <Link to="/rendez-vous" className="btn btn-primary btn-sm">
          Prendre rendez-vous
        </Link>
      </div>
    </header>
  );
}

export default Header;