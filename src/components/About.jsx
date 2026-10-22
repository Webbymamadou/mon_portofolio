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
                  <p style={{ fontFamily: '"Times New Roman", Times, serif' }}>Étudiant en Licence 3 d’Informatique Appliquée à la Gestion des Entreprises (IAGE) à l’ISI Dakar, je construis la partie invisible des applications : les API, les bases de données et le déploiement. Ma formation en gestion me donne un réflexe qui m’aide au quotidien : comprendre à quoi sert un système et qui l’utilisera avant d’écrire la première ligne de code.
                    Je travaille avec l’écosystème Python (Django, FastAPI, Django REST Framework) et je conçois des bases de données relationnelles avec PostgreSQL et MySQL. Je conteneurise mes applications avec Docker et je les déploie sur des serveurs Linux avec Nginx, en m’appuyant sur l’automatisation (CI/CD).
                    Depuis septembre 2026, je suis stagiaire développeur backend chez Formuloo, à distance, avec des développeurs seniors et une organisation Agile/Scrum sous Jira. Ce stage se termine fin novembre 2026.
                    À partir de décembre 2026, je suis disponible pour une alternance ou un stage en développement backend Python. Je suis aussi ouvert aux missions de développement d’application et aux échanges avec les communautés tech : si vous avez un projet, écrivez-moi..</p>
                  <ul className="about-info mt-4 px-md-0 px-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <li className="d-flex" style={{ marginBottom: '6px', lineHeight: '1.4' }}><span>Nom :</span> <span>Mamadou Seck</span></li>
                    <li className="d-flex" style={{ marginBottom: '6px', lineHeight: '1.4' }}><span>Adresse :</span> <span>Sénégal, Dakar, Zac Mbao</span></li>
                    <li className="d-flex" style={{ marginBottom: '6px', lineHeight: '1.4' }}><span>E-mail :</span> <span>mamadouseck1357@gmail.com</span></li>
                    <li className="d-flex" style={{ marginBottom: '6px', lineHeight: '1.4' }}><span>Téléphone :</span> <span>+221 77 077 83 41</span></li>
                  </ul>
                </div>

                {/* Compétences en étiquettes */}
                                {/* Compétences : une ligne par catégorie */}
                <div className="col-md-12" style={{ marginTop: '45px' }}>
                  {[
                    { title: 'Python', items: 'Django, FastAPI, DRF, ORM' },
                    { title: 'Bases de données', items: 'PostgreSQL, MySQL, SQL' },
                    { title: 'DevOps', items: 'Docker, Linux, Nginx, CI/CD' },
                    { title: 'Outils', items: 'Git, GitHub, Postman' },
                  ].map((skill) => (
                    <div
                      key={skill.title}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        padding: '12px 0',
                        borderBottom: '1px solid #ececec',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ minWidth: '170px', fontSize: '17px', fontWeight: 600, color: '#000' }}>
                        {skill.title}
                      </span>
                      <span style={{ fontSize: '16px', color: '#a9ae8e', fontWeight: 500 }}>
                        {skill.items}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
