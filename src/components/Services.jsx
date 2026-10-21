import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const SERVICES = [
  {
    icon: 'flaticon-web-programming',
    title: 'Développement Backend Python',
    desc: "Je construis des API REST avec Django, Django REST Framework et FastAPI : ORM, authentification JWT, documentation Swagger / OpenAPI."
  },
  {
    icon: 'flaticon-computer',
    title: 'Conception & Gestion de BD',
    desc: 'Je modélise les données avec UML et Merise, puis j’écris les requêtes SQL sur PostgreSQL et MySQL.'
  },
  {
    icon: 'flaticon-vector',
    title: 'DevOps & Conteneurisation',
    desc: 'J’empaquette les applications avec Docker et Docker Compose, je les déploie sur des serveurs Linux derrière Nginx, et je commence à automatiser avec GitHub Actions (CI/CD).'
  },
  {
    icon: 'flaticon-app-development',
    title: 'Intégration & Outils',
    desc: "Je relie le backend à l’interface (HTML, CSS, Bootstrap), je teste les API avec Postman et je gère le code avec Git et GitHub."
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
            <span className="subheading">Ce que je peux faire pour vous</span>
            <h2 className="mb-4">Ingénierie Backend &amp; DevOps</h2>
            <p>Je transforme un besoin en application qui tourne en ligne : API, base de données, déploiement. Disponible pour des missions de développement, et pour une alternance à partir de janvier 2027.</p>
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