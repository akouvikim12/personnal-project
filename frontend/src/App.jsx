import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import Faq from './pages/Faq';
import './App.css';

function App() {
  const { pathname } = useLocation();
  // La page À propos affiche sa propre navigation à l'intérieur du cadre en verre du hero.
  const hideGlobalHeader = pathname === '/a-propos';

  return (
    <>
      {!hideGlobalHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/rendez-vous" element={<BookAppointment />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;