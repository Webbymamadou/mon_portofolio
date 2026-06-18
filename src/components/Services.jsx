import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const SERVICES = [
  {
    icon: 'flaticon-web-programming',
    title: 'Développement Backend & API',
    desc: "Création d'APIs RESTful performantes et sécurisées avec Django (Python), FastAPI et Spring Boot (Java), avec authentification JWT."
  },
  {
    icon: 'flaticon-vector',
    title: 'Conteneurisation & DevOps',
    desc: 'Dockerisation complète d\'applications, automatisation CI/CD (GitHub Actions, GitLab CI/CD) et configuration de serveurs de déploiement Linux.'
  },
  {
    icon: 'flaticon-computer',
    title: 'Conception & Gestion de BD',
    desc: 'Conception, structuration (UML, Merise) et gestion avancée de bases de données relationnelles (PostgreSQL, MySQL) pour des performances optimales.'
  },
  {
    icon: 'flaticon-app-development',
    title: 'Interfaces Frontend',
    desc: 'Développement d\'interfaces utilisateur modernes et dynamiques à l\'aide de React et intégration avec Tailwind CSS pour un rendu fluide.'
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
            <span className="subheading">Mes domaines d'activité</span>
            <h2 className="mb-4">Ingénierie Backend &amp; DevOps</h2>
            <p>Je conçois des architectures backend robustes, des APIs performantes et j'automatise le déploiement et la maintenance de solutions logicielles.</p>
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
