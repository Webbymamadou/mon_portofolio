import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="ftco-footer ftco-section">
      <div className="container">
        <div className="row mb-5">
          
          {/* Colonne 1 - Présentation courte */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Parlons de votre projet</h2>
              <p>Une invitation à échanger et collaborer autour de vos idées, projets et besoins afin de trouver ensemble les meilleures solutions digitales.</p>
              <p>
                <a href="https://github.com/Webbymamadou?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Voir GitHub
                </a>
              </p>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides de navigation */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Liens Rapides</h2>
              <ul className="list-unstyled">
                <li><a href="#accueil-section" onClick={(e) => handleScrollTo(e, 'accueil-section')}><span className="fa fa-chevron-right mr-2"></span>Accueil</a></li>
                <li><a href="#apropos-section" onClick={(e) => handleScrollTo(e, 'apropos-section')}><span className="fa fa-chevron-right mr-2"></span>À propos</a></li>
                <li><a href="#services-section" onClick={(e) => handleScrollTo(e, 'services-section')}><span className="fa fa-chevron-right mr-2"></span>Services</a></li>
                <li><a href="#projects-section" onClick={(e) => handleScrollTo(e, 'projects-section')}><span className="fa fa-chevron-right mr-2"></span>Projets</a></li>
                <li><a href="#contact-section" onClick={(e) => handleScrollTo(e, 'contact-section')}><span className="fa fa-chevron-right mr-2"></span>Contact</a></li>
              </ul>
            </div>
          </div>



          {/* Colonne 4 - Des questions ? Coordonnées détaillées */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Vous avez une question ?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li><span className="icon fa fa-map-marker"></span><span className="text">Sénégal, Dakar, Boop</span></li>
                  <li>
                    <a href="tel:+221770778341">
                      <span className="icon fa fa-phone"></span><span className="text">+221 77 077 83 41</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/221770778341" target="_blank" rel="noopener noreferrer">
                      <span className="icon fa fa-whatsapp"></span><span className="text">WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@terangaweb" target="_blank" rel="noopener noreferrer">
                      <span className="icon fa fa-music"></span><span className="text">TikTok</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:mamadouseck1357@gmail.com">
                      <span className="icon fa fa-paper-plane pr-4"></span><span className="text">mamadouseck1357@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Icônes de réseaux sociaux */}
              <ul className="ftco-footer-social list-unstyled mt-2">
                <li>
                  <a href="https://www.linkedin.com/in/mamadou-seck-39b953350/" target="_blank" rel="noopener noreferrer">
                    <span className="icon fa fa-linkedin"></span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Webbymamadou?tab=repositories" target="_blank" rel="noopener noreferrer">
                    <span className="icon fa fa-github"></span>
                  </a>
                </li>
                <li>
                  <a href="https://trello.com/fr/guide/trello-101" target="_blank" rel="noopener noreferrer">
                    <span className="icon fa fa-trello"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Droits d'auteur et signature */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              Copyright &copy; {currentYear} Tous droits réservés | Mon Portfolio - Votre partenaire <i className="fa fa-heart" aria-hidden="true" style={{ color: '#3e64ff' }}></i>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
