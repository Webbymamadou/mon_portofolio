import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const PROJECTS = [
  {
    title: 'DistriManager',
    subtitle: 'Gestion intégrée pour une entreprise de distribution',
    bg: '/images/work-2.jpg',
    problem: 'Une entreprise de distribution suit ses stocks sur plusieurs entrepôts, et ses commerciaux prennent les commandes aussi bien au bureau que sur le terrain.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    features: 'Clients et stocks multi-entrepôts, prise de commande bureau + terrain, tableau de bord, gestion des rôles (RBAC)',
    link: null,
    site: null,
    linkType: 'private',
    linkText: 'Projet client — dépôt privé',
  },
  {
    title: 'KP — Librairie Papeterie',
    subtitle: 'Site vitrine multi-boutiques avec espace de gestion',
    bg: '/images/work-4.jpg',
    problem: 'Chaque boutique présente son catalogue en ligne, et les clients commandent directement par WhatsApp.',
    tech: ['Django REST Framework', 'PostgreSQL', 'React (Vite)', 'JWT'],
    features: 'Catalogue par boutique avec recherche et filtres, commande via WhatsApp, espace de gestion sécurisé par boutique',
    link: null,
    site: 'https://www.lpkkas.sn/',
    linkType: 'private',
    linkText: 'Projet client — dépôt privé',
  },
  {
    title: 'SaaS WebBuilder PME',
    subtitle: 'Générateur de sites web pour PME',
    bg: '/images/work-1.jpg',
    problem: 'Permettre à une petite entreprise d’obtenir son site web sans passer par un développeur.',
    tech: ['Django', 'React', 'Celery', 'PostgreSQL', 'Docker'],
    features: 'Tâches asynchrones, génération automatique, automatisation du déploiement',
    link: 'https://github.com/Webbymamadou/GIGRH_App',
    site: null,
    linkType: 'github',
    linkText: 'Code source sur GitHub',
  },
  {
    title: 'DevConnect',
    subtitle: 'Plateforme collaborative pour développeurs',
    bg: '/images/work-5.jpg',
    problem: 'Un espace où des développeurs se retrouvent pour collaborer et partager.',
    tech: ['Django', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    features: 'API RESTful, authentification JWT, migration PostgreSQL, Docker Compose',
    link: 'https://github.com/Webbymamadou/DevConnect',
    site: null,
    linkType: 'github',
    linkText: 'Code source sur GitHub',
  },
  {
    title: 'Portfolio Professionnel',
    subtitle: 'Ce site même',
    bg: '/images/work-3.jpg',
    problem: 'Présenter mon profil, mes compétences et mes projets de façon claire et rapide à parcourir.',
    tech: ['React 19', 'Framer Motion', 'Sass', 'GitHub Actions'],
    features: 'Jauges circulaires SVG animées, workflow CI/CD, design responsive',
    link: 'https://github.com/Webbymamadou/mon_portofolio',
    site: null,
    linkType: 'github',
    linkText: 'Code source sur GitHub',
  },
  {
    title: 'Portfolio Professionnel',
    subtitle: 'Ce site même',
    bg: '/images/work-3.jpg',
    problem: 'Présenter mon profil, mes compétences et mes projets de façon claire et rapide à parcourir.',
    tech: ['React 19', 'Framer Motion', 'Sass', 'GitHub Actions'],
    features: 'Jauges circulaires SVG animées, workflow CI/CD, design responsive',
    link: 'https://github.com/Webbymamadou/mon_portofolio',
    site: null,
    linkType: 'github',
    linkText: 'Code source sur GitHub',
  },
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
            <span className="subheading">Ce que j'ai construit</span>
            <h2 className="mb-4">Mes Projets</h2>
            <p>Des applications réelles, certaines utilisées par des entreprises, d'autres construites pour apprendre. Quand le code est public, il est à un clic.</p>
          </div>
        </div>

        {/* Grille de projets */}
        <div className="row justify-content-center">
          {PROJECTS.map((project, index) => {
            const isPrivate = project.linkType === 'private' || !project.link;

            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="col-md-6 col-lg-4 mb-4 d-flex"
              >
                <div
                  className="bg-white rounded shadow"
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                  {/* Image du projet */}
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img
                      src={project.bg}
                      alt={`Aperçu du projet ${project.title}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />

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
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        En cours
                      </span>
                    )}

                    {isPrivate && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '15px',
                          left: '15px',
                          background: 'rgba(0,0,0,0.55)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}
                      >
                        Client — Prod
                      </span>
                    )}
                  </div>

                  {/* Texte du projet */}
                  <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 600, margin: '0 0 4px' }}>{project.title}</h3>
                    <span style={{ display: 'block', color: '#a9ae8e', fontWeight: 500, fontSize: '14px', marginBottom: '12px' }}>
                      {project.subtitle}
                    </span>

                    <p style={{ fontSize: '15px', lineHeight: '1.55', color: '#555', marginBottom: '12px' }}>
                      {project.problem}
                    </p>

                    <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#777', marginBottom: '14px' }}>
                      <strong style={{ color: '#000' }}>Fonctionnalités :</strong> {project.features}
                    </p>

                    {/* Technologies en étiquettes */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '4px 12px',
                            fontSize: '13px',
                            borderRadius: '999px',
                            border: '1px solid #d9dcc7',
                            background: '#f6f7ef',
                            color: '#555'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Liens, poussés en bas de la carte */}
                    <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                      {project.site && (
                        <a
                          href={project.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#a9ae8e', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
                        >
                          <span className="fa fa-external-link mr-1"></span> Voir le site
                        </a>
                      )}

                      {isPrivate ? (
                        <span style={{ color: '#999', fontWeight: 600, fontSize: '14px', fontStyle: 'italic' }}>
                          <span className="fa fa-lock mr-1"></span> {project.linkText}
                        </span>
                      ) : (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#a9ae8e', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
                        >
                          <span className="fa fa-github mr-1"></span> {project.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}