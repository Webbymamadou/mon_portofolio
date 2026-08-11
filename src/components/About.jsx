import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

export default function About() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

  const slideInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section ref={ref} className="ftco-about ftco-section ftco-no-pt ftco-no-pb" id="apropos-section">
      <div className="container">
        <div className="row d-flex no-gutters">
          
          {/* Panneau gauche (Image) */}
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={slideInLeft}
            className="col-md-6 col-lg-5 d-flex"
          >
            <div className="img-about img d-flex align-items-stretch">
              <div className="overlay"></div>
              <div className="img d-flex align-self-stretch align-items-center" style={{ backgroundImage: 'url(/images/apropos.jpeg)', backgroundPosition: 'center top' }}>
              </div>
            </div>
          </motion.div>

          {/* Panneau droit (Textes et Informations) */}
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={slideInUp}
            className="col-md-6 col-lg-7 pl-md-4 pl-lg-5 py-5"
          >
            <div className="py-md-5">
              <div className="row justify-content-start pb-3">
                <div className="col-md-12 heading-section">
                  <span className="subheading">Mon introduction</span>
                  <h2 className="mb-4" style={{ fontSize: '34px', textTransform: 'capitalize' }}>À propos de moi</h2>
                   <p>Étudiant en Licence 2 Informatique Appliquée à la Gestion (ISI Dakar), après une première année en Génie Logiciel (IPD), je spécialise mon profil dans le développement Backend Python et les pratiques DevOps.Spécialisé dans l'écosystème Python (Django, FastAPI, DRF), je maîtrise la conception de bases de données relationnelles (PostgreSQL, MySQL) ainsi que la conteneurisation et le déploiement (Docker, Linux, Nginx).Je recherche actuellement une opportunité (stage / projet) pour mettre en pratique mes compétences et contribuer à la conception d'applications robustes et évolutives.</p>
                  <ul className="about-info mt-4 px-md-0 px-2">
                    <li className="d-flex"><span>Nom :</span> <span>Mamadou Seck</span></li>
                    <li className="d-flex"><span>Adresse :</span> <span>Sénégal, Dakar, Zac Mbao</span></li>
                    <li className="d-flex"><span>E-mail :</span> <span>mamadouseck1357@gmail.com</span></li>
                    <li className="d-flex"><span>Téléphone :</span> <span>+221 77 077 83 41</span></li>
                  </ul>
                </div>

                {/* Badges d'intérêts */}
                <div className="col-md-12">
                  <div className="my-interest d-lg-flex w-100">
                    <div className="interest-wrap d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="flaticon-web-programming"></span>
                      </div>
                      <div className="text">Python (Django, FastAPI, DRF, ORM)</div>
                    </div>
                    <div className="interest-wrap d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="flaticon-app-development"></span>
                      </div>
                      <div className="text">Bases de données (PostgreSQL, MySQL, SQL)</div>
                    </div>
                    <div className="interest-wrap d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="flaticon-vector"></span>
                      </div>
                      <div className="text">DevOps (Docker, Linux, Nginx, CI/CD)</div>
                    </div>
                    <div className="interest-wrap d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="flaticon-computer"></span>
                      </div>
                      <div className="text">Outils (Git, GitHub, Postman)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
