import React, { useState, useEffect } from 'react';
import useScroll from '../hooks/useScroll';

const NAV_ITEMS = [
  { id: 'accueil-section', label: 'Accueil' },
  { id: 'apropos-section', label: 'À propos' },
  { id: 'competence-section', label: 'Compétences' },
  { id: 'services-section', label: 'Services' },
  { id: 'projects-section', label: 'Projets' },
  { id: 'contact-section', label: 'Contact' },
];

export default function Navbar() {
  const { isScrolled, isAwake } = useScroll();
  const [activeSection, setActiveSection] = useState('accueil-section');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200; // Décalage pour correspondre à la hauteur du header
      
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 70; // hauteur de la navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target ${
        isScrolled ? 'scrolled' : ''
      } ${isAwake ? 'awake' : ''}`} 
      id="ftco-navbar"
      style={{ 
        position: isScrolled ? 'fixed' : 'absolute',
        top: isScrolled && !isAwake ? '-130px' : '0px', 
        transition: '0.3s all ease-out' 
      }}
    >
      <div className="container">
        <a className="navbar-brand" href="#accueil-section" onClick={(e) => handleNavClick(e, 'accueil-section')}>
          Mon Portfolio<span>.</span>
        </a>
        <button 
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          type="button" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="fa fa-bars mr-1"></span> Menu
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="nav-item">
                <a 
                  href={`#${item.id}`} 
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
