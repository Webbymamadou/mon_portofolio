import React from 'react';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);

    if (el) {
      const offsetPosition =
        el.getBoundingClientRect().top + window.scrollY - 70;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="ftco-footer ftco-section py-4">
      <div className="container">

        <div className="row g-3 mb-3">

          {/* Colonne 1 : Présentation */}
          <div className="col-lg-4 col-md-6">
            <div className="ftco-footer-widget mb-2">
              <h2 className="ftco-heading-2">Parlons de votre projet</h2>

              <p>
                Échangeons autour de vos idées et de vos besoins pour
                concevoir ensemble des solutions numériques adaptées.
              </p>

              <a
                href="https://github.com/Webbymamadou?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Voir GitHub
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="col-lg-3 col-md-6">
            <div className="ftco-footer-widget mb-2">
              <h2 className="ftco-heading-2">Liens rapides</h2>

              <ul className="list-unstyled">
                {[
                  ['accueil-section', 'Accueil'],
                  ['apropos-section', 'À propos'],
                  ['services-section', 'Services'],
                  ['projects-section', 'Projets'],
                  ['contact-section', 'Contact'],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleScrollTo(e, id)}
                    >
                      <span className="fa fa-chevron-right mr-2"></span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne 3 : Coordonnées */}
          <div className="col-lg-5 col-md-12">
            <div className="ftco-footer-widget mb-2">
              <h2 className="ftco-heading-2">Me contacter</h2>

              <ul className="list-unstyled">
                <li>
                  <span className="fa fa-map-marker mr-2"></span>
                  Sénégal, Dakar, Zac Mbao
                </li>

                <li>
                  <a href="tel:+221770778341">
                    <span className="fa fa-phone mr-2"></span>
                    +221 77 077 83 41
                  </a>
                </li>

                <li>
                  <a
                    href="https://wa.me/221770778341"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fa fa-whatsapp mr-2"></span>
                    WhatsApp
                  </a>
                </li>

                <li>
                  <a href="mailto:mamadouseck1357@gmail.com">
                    <span className="fa fa-envelope mr-2"></span>
                    mamadouseck1357@gmail.com
                  </a>
                </li>
              </ul>

              {/* Réseaux sociaux */}
              <ul className="ftco-footer-social list-unstyled mt-2 d-flex">
                <li className="mr-3">
                  <a
                    href="https://www.linkedin.com/in/mamadou-seck-39b953350/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <span className="fa fa-linkedin"></span>
                  </a>
                </li>

                <li className="mr-3">
                  <a
                    href="https://github.com/Webbymamadou?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <span className="fa fa-github"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {currentYear} Mamadou Seck — Tous droits réservés.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
