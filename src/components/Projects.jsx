import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const PROJECTS = [
  {
    title: 'DistriManager',
    subtitle: 'Gestion intégrée pour une entreprise de distribution',
    bg: '/images/work-2.jpg',
    problem:
      'Une entreprise de distribution suit ses stocks sur plusieurs entrepôts, et ses commerciaux prennent les commandes aussi bien au bureau que sur le terrain.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    features:
      'Clients et stocks multi-entrepôts, prise de commande bureau et terrain, tableau de bord et gestion des rôles (RBAC).',
    link: null,
    site: null,
    linkType: 'private',
    linkText: 'Code privé',
  },
  {
    title: 'KP — Librairie Papeterie',
    subtitle: 'Site vitrine multi-boutiques avec espace de gestion',
    bg: '/images/work-4.jpg',
    problem:
      'Chaque boutique présente son catalogue en ligne, et les clients commandent directement par WhatsApp.',
    tech: ['Django REST Framework', 'PostgreSQL', 'React (Vite)', 'JWT'],
    features:
      'Catalogue par boutique avec recherche et filtres, commande via WhatsApp et espace de gestion sécurisé par boutique.',
    link: null,
    site: 'https://www.lpkkas.sn/',
    linkType: 'private',
    linkText: 'Code privé',
  },
  {
    title: 'SaaS WebBuilder PME',
    subtitle: 'Générateur de sites web pour PME',
    bg: '/images/work-1.jpg',
    problem:
      'Permettre à une petite entreprise d’obtenir son site web sans passer par un développeur.',
    tech: ['Django', 'React', 'Celery', 'PostgreSQL', 'Docker'],
    features:
      'Tâches asynchrones, génération automatique de sites et automatisation du déploiement.',
    link: 'https://github.com/Webbymamadou/GIGRH_App',
    site: null,
    linkType: 'github',
    linkText: 'Code source GitHub',
  },
  {
    title: 'DevConnect',
    subtitle: 'Plateforme collaborative pour développeurs',
    bg: '/images/work-5.jpg',
    problem:
      'Un espace où des développeurs peuvent se retrouver pour collaborer et partager leurs connaissances.',
    tech: ['Django', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    features:
      'API RESTful, authentification JWT, migration PostgreSQL et environnement Docker Compose.',
    link: 'https://github.com/Webbymamadou/DevConnect',
    site: null,
    linkType: 'github',
    linkText: 'Code source GitHub',
  },
  {
    title: 'Portfolio Professionnel',
    subtitle: 'Ce site meme',
    bg: '/images/work-3.jpg',
    problem:
      'Présenter mon profil, mes compétences et mes projets de façon claire et agréable à parcourir.',
    tech: ['React 19', 'Framer Motion', 'Sass', 'GitHub Actions'],
    features:
      'Jauges circulaires SVG animées, workflow CI/CD et interface responsive.',
    link: 'https://github.com/Webbymamadou/mon_portofolio',
    site: null,
    linkType: 'github',
    linkText: 'Code source GitHub',
  },
  {
    title: 'Oustaz Agro Business',
    subtitle: 'Plateforme de gestion avicole intégrée',
    bg: '/images/work-6.jpg',
    problem:
      'Digitaliser et centraliser la gestion d’un élevage avicole : suivi des poulets, récolte des œufs, gestion des stocks, commandes, livraisons et finances.',
    tech: [
      'React 19',
      'TypeScript',
      'Django REST Framework',
      'PostgreSQL 16',
      'Docker',
      'Nginx',
    ],
    features:
      'Application PWA installable, gestion multi-rôles avec JWT, suivi des bandes et de la mortalité, gestion des stocks, commandes et livraisons, suivi de trésorerie et architecture conteneurisée.',
    link: null,
    site: null,
    linkType: 'private',
    linkText: 'Code privé',
  },
];

// Icônes officielles Devicon.
// Les technologies sans icône dédiée dans cette liste utilisent leurs initiales.
const TECH_ICONS = {
  'Django REST Framework': {
    icon: 'devicon-django-plain',
    label: 'Django REST Framework',
    short: 'DRF',
  },
  Django: {
    icon: 'devicon-django-plain',
    label: 'Django',
    short: 'Dj',
  },
  PostgreSQL: {
    icon: 'devicon-postgresql-plain',
    label: 'PostgreSQL',
    short: 'PG',
  },
  'PostgreSQL 16': {
    icon: 'devicon-postgresql-plain',
    label: 'PostgreSQL 16',
    short: 'PG',
  },
  React: {
    icon: 'devicon-react-original',
    label: 'React',
    short: 'R',
  },
  'React (Vite)': {
    icon: 'devicon-react-original',
    label: 'React avec Vite',
    short: 'R',
  },
  'React 19': {
    icon: 'devicon-react-original',
    label: 'React 19',
    short: 'R',
  },
  JavaScript: {
    icon: 'devicon-javascript-plain',
    label: 'JavaScript',
    short: 'JS',
  },
  TypeScript: {
    icon: 'devicon-typescript-plain',
    label: 'TypeScript',
    short: 'TS',
  },
  'Tailwind CSS': {
    icon: 'devicon-tailwindcss-original',
    label: 'Tailwind CSS',
    short: 'TW',
  },
  FastAPI: {
    icon: 'devicon-fastapi-plain',
    label: 'FastAPI',
    short: 'FA',
  },
  Docker: {
    icon: 'devicon-docker-plain',
    label: 'Docker',
    short: 'D',
  },
  PostgreSQL: {
    icon: 'devicon-postgresql-plain',
    label: 'PostgreSQL',
    short: 'PG',
  },
  Celery: {
    icon: null,
    label: 'Celery',
    short: 'Ce',
  },
  JWT: {
    icon: null,
    label: 'JWT',
    short: 'JWT',
  },
  Sass: {
    icon: 'devicon-sass-original',
    label: 'Sass',
    short: 'Sa',
  },
  'Framer Motion': {
    icon: null,
    label: 'Framer Motion',
    short: 'FM',
  },
  'GitHub Actions': {
    icon: 'devicon-github-original',
    label: 'GitHub Actions',
    short: 'GH',
  },
  Nginx: {
    icon: 'devicon-nginx-original',
    label: 'Nginx',
    short: 'N',
  },
};

function TechIcons({ technologies }) {
  return (
    <div className="project-tech-icons" aria-label="Technologies utilisées">
      {technologies.map((technology) => {
        const tech = TECH_ICONS[technology] || {
          icon: null,
          label: technology,
          short: technology.slice(0, 2),
        };

        return (
          <span
            key={technology}
            className="project-tech-icon"
            title={tech.label}
            aria-label={tech.label}
          >
            {tech.icon ? (
              <i className={tech.icon} aria-hidden="true" />
            ) : (
              <span className="project-tech-fallback" aria-hidden="true">
                {tech.short}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Fermer les détails du projet"
            >
              &times;
            </button>

            <div className="project-modal-image">
              <img src={project.bg} alt={`Aperçu de ${project.title}`} />

              <span className="project-modal-category">
                {project.linkType === 'private'
                  ? 'Projet client'
                  : 'Projet technique'}
              </span>
            </div>

            <div className="project-modal-content">
              <p className="project-modal-subtitle">{project.subtitle}</p>

              <h3 id="project-modal-title">{project.title}</h3>

              <div className="project-modal-section">
                <h4>À propos du projet</h4>
                <p>{project.problem}</p>
              </div>

              <div className="project-modal-section">
                <h4>Fonctionnalités principales</h4>
                <p>{project.features}</p>
              </div>

              <div className="project-modal-section">
                <h4>Technologies utilisées</h4>
                <div className="project-modal-tech">
                  {project.tech.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <div className="project-modal-actions">
                {project.site && (
                  <a
                    href={project.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action project-action-primary"
                  >
                    <i className="fa fa-external-link" aria-hidden="true" />
                    Voir le site
                  </a>
                )}

                {project.linkType === 'github' && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action project-action-primary"
                  >
                    <i className="fa fa-github" aria-hidden="true" />
                    Code source GitHub
                  </a>
                )}

                {project.linkType === 'private' && (
                  <span className="project-action project-action-private">
                    <i className="fa fa-lock" aria-hidden="true" />
                    Code privé
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [ref, isVisible] = useIntersection({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      ref={ref}
      className="ftco-section ftco-project projects-modern"
      id="projects-section"
    >
      <div className="container">
        <div className="row justify-content-center pb-5">
          <div className="col-md-10 heading-section text-center">
            <span className="subheading">Ce que j'ai construit</span>

            <h2 className="mb-4">Mes projets</h2>

            <p className="projects-intro">
              Des projets web et des applications de gestion conçus pour
              répondre à des besoins concrets. Cliquez sur un projet pour
              découvrir les détails.
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 35 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <button
                type="button"
                className="project-card-click"
                onClick={() => setSelectedProject(project)}
                aria-label={`Découvrir le projet ${project.title}`}
              >
                <div className="project-card-image">
                  <img
                    src={project.bg}
                    alt={`Aperçu du projet ${project.title}`}
                    loading="lazy"
                  />

                  <span className="project-card-open">
                    <i className="fa fa-arrow-up-right-from-square" aria-hidden="true" />
                    Découvrir
                  </span>
                </div>

                <div className="project-card-content">
                  <div className="project-card-heading">
                    <h3>{project.title}</h3>

                    <span
                      className={`project-access ${
                        project.linkType === 'private'
                          ? 'project-access-private'
                          : 'project-access-public'
                      }`}
                    >
                      <i
                        className={`fa ${
                          project.linkType === 'private'
                            ? 'fa-lock'
                            : 'fa-github'
                        }`}
                        aria-hidden="true"
                      />

                      {project.linkType === 'private'
                        ? 'Code privé'
                        : 'GitHub'}
                    </span>
                  </div>

                  <p className="project-card-subtitle">{project.subtitle}</p>

                  <TechIcons technologies={project.tech} />

                  <div className="project-card-footer">
                    <span>Voir les détails</span>
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-modern {
          background: #fafaf8;
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .projects-modern .projects-intro {
          max-width: 620px;
          margin: 0 auto;
          color: #737373;
          font-size: 15px;
          line-height: 1.8;
        }

        .projects-modern .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }

        .projects-modern .project-card {
          min-width: 0;
          height: 100%;
          background: #fff;
          border: 1px solid #eeeeea;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 22px rgba(25, 25, 25, 0.045);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .projects-modern .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(25, 25, 25, 0.09);
        }

        .projects-modern .project-card-click {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 0;
          text-align: left;
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font: inherit;
        }

        .projects-modern .project-card-click:focus-visible {
          outline: 3px solid #f2761d;
          outline-offset: -3px;
        }

        .projects-modern .project-card-image {
          position: relative;
          height: 215px;
          overflow: hidden;
          background: #efefeb;
        }

        .projects-modern .project-card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.02) 30%,
            rgba(0, 0, 0, 0.55) 100%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .projects-modern .project-card-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .projects-modern .project-card:hover .project-card-image img {
          transform: scale(1.055);
        }

        .projects-modern .project-card:hover .project-card-image::after {
          opacity: 1;
        }

        .projects-modern .project-card-open {
          position: absolute;
          z-index: 1;
          bottom: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border-radius: 7px;
          background: #fff;
          color: #242424;
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .projects-modern .project-card:hover .project-card-open,
        .projects-modern .project-card-click:focus-visible .project-card-open {
          opacity: 1;
          transform: translateY(0);
        }

        .projects-modern .project-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 21px 22px 17px;
        }

        .projects-modern .project-card-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .projects-modern .project-card-heading h3 {
          margin: 0;
          color: #202020;
          font-size: 19px;
          line-height: 1.4;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .projects-modern .project-access {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 5px;
          padding: 5px 8px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .projects-modern .project-access-public {
          color: #256b45;
          background: #eaf6ee;
        }

        .projects-modern .project-access-private {
          color: #6b6258;
          background: #f2f0ed;
        }

        .projects-modern .project-card-subtitle {
          margin: 8px 0 17px;
          color: #858585;
          font-size: 13px;
          line-height: 1.6;
        }

        .projects-modern .project-tech-icons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          padding: 13px 0 16px;
          border-bottom: 1px solid #f0f0ed;
        }

        .projects-modern .project-tech-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border: 1px solid #f0f0ed;
          border-radius: 9px;
          background: #fafaf8;
          color: #555;
          font-size: 21px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .projects-modern .project-card:hover .project-tech-icon {
          background: #fff;
          transform: translateY(-2px);
        }

        .projects-modern .project-tech-fallback {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: -0.3px;
        }

        .projects-modern .project-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 15px;
          color: #858585;
          font-size: 12px;
          font-weight: 600;
        }

        .projects-modern .project-card-footer i {
          color: #f2761d;
          transition: transform 0.2s ease;
        }

        .projects-modern .project-card:hover .project-card-footer i {
          transform: translateX(4px);
        }

        /* Fenêtre de détails */

        .project-modal-backdrop {
          position: fixed;
          z-index: 99999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          overflow-y: auto;
          background: rgba(16, 18, 20, 0.72);
          backdrop-filter: blur(5px);
        }

        .project-modal {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: calc(100vh - 44px);
          overflow-y: auto;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
        }

        .project-modal-close {
          position: absolute;
          z-index: 3;
          top: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.65);
          color: #fff;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
        }

        .project-modal-image {
          position: relative;
          height: 240px;
          background: #efefeb;
        }

        .project-modal-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-modal-category {
          position: absolute;
          left: 20px;
          bottom: 17px;
          padding: 7px 11px;
          border-radius: 5px;
          background: #fff;
          color: #333;
          font-size: 11px;
          font-weight: 700;
        }

        .project-modal-content {
          padding: 27px 30px 30px;
        }

        .project-modal-subtitle {
          margin: 0 0 5px;
          color: #f2761d;
          font-size: 13px;
          font-weight: 600;
        }

        .project-modal-content h3 {
          margin: 0 0 24px;
          color: #222;
          font-size: 27px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .project-modal-section {
          margin-bottom: 22px;
        }

        .project-modal-section h4 {
          margin: 0 0 8px;
          color: #252525;
          font-size: 15px;
          font-weight: 700;
        }

        .project-modal-section p {
          margin: 0;
          color: #686868;
          font-size: 14px;
          line-height: 1.8;
        }

        .project-modal-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .project-modal-tech span {
          padding: 7px 11px;
          border: 1px solid #e8e8e3;
          border-radius: 6px;
          background: #fafaf8;
          color: #555;
          font-size: 12px;
        }

        .project-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #eeeeea;
        }

        .project-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 42px;
          padding: 11px 16px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }

        .project-action-primary {
          background: #f2761d;
          color: #fff !important;
          transition: background 0.2s ease;
        }

        .project-action-primary:hover {
          background: #d96110;
        }

        .project-action-private {
          border: 1px solid #e8e5df;
          background: #f7f6f3;
          color: #6d675e;
        }

        @media (max-width: 991px) {
          .projects-modern .projects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }
        }

        @media (max-width: 575px) {
          .projects-modern {
            padding-top: 65px;
            padding-bottom: 65px;
          }

          .projects-modern .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .projects-modern .project-card-image {
            height: 220px;
          }

          .projects-modern .project-card-content {
            padding: 19px;
          }

          .projects-modern .project-card-heading h3 {
            font-size: 18px;
          }

          .projects-modern .project-card-open {
            opacity: 1;
            transform: none;
          }

          .project-modal-backdrop {
            padding: 12px;
          }

          .project-modal {
            max-height: calc(100vh - 24px);
            border-radius: 12px;
          }

          .project-modal-image {
            height: 190px;
          }

          .project-modal-content {
            padding: 22px 19px;
          }

          .project-modal-content h3 {
            font-size: 23px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-modern *,
          .project-modal-backdrop * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}