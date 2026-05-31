import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const SERVICES = [
  {
    icon: 'flaticon-web-programming',
    title: 'Applications de Gestion',
    desc: 'Conception et développement de solutions de gestion d\'entreprise robustes avec Laravel et Django.'
  },
  {
    icon: 'flaticon-app-development',
    title: 'Interfaces Modernes',
    desc: 'Création d’interfaces de gestion fluides et réactives avec React, HTML, CSS et JavaScript.'
  },
  {
    icon: 'flaticon-computer',
    title: 'Modélisation & BD',
    desc: 'Conception et administration de bases de données relationnelles avec PostgreSQL et MySQL (Merise / UML).'
  },
  {
    icon: 'flaticon-vector',
    title: 'Gestion de Projet & ERP',
    desc: 'Gestion agile (Scrum, Trello), modélisation des processus d\'affaires et initiation aux solutions ERP (Odoo).'
  }
];

export default function Services() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section ref={ref} className="ftco-section" id="services-section">
      <div className="container">
        
        {/* Titre de section */}
        <div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center mb-5">
            <span className="subheading">Mes domaines de compétence</span>
            <h2 className="mb-4">Informatique de Gestion &amp; Applications</h2>
            <p>Je me spécialise dans la création d'applications web de gestion et la modélisation de systèmes d'information robustes adaptés aux organisations.</p>
          </div>
        </div>

        {/* Grille de cartes de service */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="row"
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="col-md-6 col-lg-3"
            >
              <div 
                className="media block-6 services d-block bg-white rounded-lg shadow" 
                style={{ height: '100%' }}
              >
                <div 
                  className="icon d-flex align-items-center justify-content-center" 
                  style={{ background: '#3e64ff', color: '#fff' }}
                >
                  <span className={service.icon}></span>
                </div>
                <div className="media-body">
                  <h3 className="heading mb-3">{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
