import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const PROJECTS = [
  {
    title: 'SaaS WebBuilder PME',
    subtitle: 'Générateur de sites web pour PME',
    bg: '/images/work-1.jpg',
    tech: 'Django, React, Celery, PostgreSQL, Docker',
    features: 'Tâches asynchrones, génération automatique, automatisation du déploiement',
    link: 'https://github.com/Webbymamadou/GIGRH_App',
    linkType: 'github',
    linkText: 'Code Source sur GitHub',
  },
  {
    title: 'DevConnect',
    subtitle: 'Plateforme collaborative pour développeurs',
    bg: '/images/work-5.jpg',
    tech: 'Django, FastAPI, PostgreSQL, Docker, Tailwind CSS',
    features: 'APIs RESTful, authentification JWT, migration PostgreSQL, Docker Compose',
    link: 'https://github.com/Webbymamadou/DevConnect',
    linkType: 'github',
    linkText: 'Code Source sur GitHub',
  },
  {
    title: 'Portfolio Professionnel',
    subtitle: 'Ce site même (Vitrine & Réalisations)',
    bg: '/images/work-3.jpg',
    tech: 'React 19, Framer Motion, Sass, GitHub Actions',
    features: 'Jauges circulaires SVG animées, workflow CI/CD, responsive design',
    link: 'https://github.com/Webbymamadou/mon_portofolio',
    linkType: 'github',
    linkText: 'Code Source sur GitHub',
  }
];

export default function Projects() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section ref={ref} className="ftco-section ftco-project" id="projects-section">
      <div className="container-fluid px-md-4">
        
        {/* Titre de section */}
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 heading-section text-center">
            <span className="subheading">Accomplissements</span>
            <h2 className="mb-4">Mes Projets</h2>
            <p>Découvrez mes réalisations majeures en ingénierie backend, architectures d'API, intégration DevOps et développement d'applications collaboratives.</p>
          </div>
        </div>

        {/* Grille de projets */}
        <div className="row">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="col-md-4"
            >
              <div 
                className="project img shadow d-flex justify-content-center align-items-center rounded mb-4" 
                style={{ 
                  backgroundImage: `url(${project.bg})`, 
                  height: '350px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                {project.status === 'en-cours' && (
                  <span 
                    style={{ 
                      position: 'absolute', 
                      top: '15px', 
                      right: '15px', 
                      background: '#ffbd39', 
                      color: '#000', 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    En cours
                  </span>
                )}
                <div className="overlay"></div>
                <div className="text text-center p-4">
                  <h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <span className="text-white opacity-80" style={{ display: 'block', marginBottom: '10px' }}>
                    {project.subtitle}
                  </span>
                  
                  <div className="mt-3 text-white" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                    <strong>Technologies :</strong> {project.tech}<br />
                    {project.features && (
                      <>
                        <strong>Fonctionnalités :</strong> {project.features}<br />
                      </>
                    )}
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: '#a5b4fc', 
                        textDecoration: 'none', 
                        fontWeight: '600', 
                        fontSize: '13px', 
                        display: 'inline-block', 
                        marginTop: '8px' 
                      }}
                    >
                      <span className="fa fa-github mr-1"></span> {project.linkText}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
