import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const PROJECTS = [
  {
    title: 'DistriManager',
    subtitle: 'Gestion intégrée pour une entreprise de distribution',
    bg: '/images/work-2.jpg',
    problem:
      'Une entreprise de distribution suit ses stocks sur plusieurs entrepôts, et ses commerciaux prennent les commandes au bureau comme sur le terrain.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    features:
      'Clients et stocks multi-entrepôts, prise de commande bureau et terrain, tableau de bord et gestion des rôles (RBAC).',
    link: null,
    site: null,
    linkType: 'private',
  },
  {
    title: 'KP — Librairie Papeterie',
    subtitle: 'Site vitrine multi-boutiques avec espace de gestion',
    bg: '/images/work-4.jpg',
    problem:
      'Chaque boutique présente son catalogue en ligne, et les clients commandent directement par WhatsApp.',
    tech: ['Django REST Framework', 'PostgreSQL', 'React', 'JWT'],
    features:
      'Catalogue par boutique avec recherche et filtres, commande via WhatsApp et espace de gestion sécurisé par boutique.',
    link: null,
    site: 'https://www.lpkkas.sn/',
    linkType: 'private',
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
  },
  {
    title: 'Portfolio Professionnel',
    subtitle: 'Ce site même',
    bg: '/images/work-3.jpg',
    problem:
      'Présenter mon profil, mes compétences et mes projets de façon claire et agréable à parcourir.',
    tech: ['React', 'Framer Motion', 'Sass', 'GitHub Actions'],
    features:
      'Jauges circulaires SVG animées, workflow CI/CD et interface responsive.',
    link: 'https://github.com/Webbymamadou/mon_portofolio',
    site: null,
    linkType: 'github',
  },
  {
    title: 'Oustaz Agro Business',
    subtitle: 'Plateforme de gestion avicole intégrée',
    bg: '/images/work-6.jpg',
    problem:
      'Digitaliser et centraliser la gestion d’un élevage avicole : suivi des poulets, récolte des œufs, stocks, commandes, livraisons et finances.',
    tech: [
      'React',
      'TypeScript',
      'Django REST Framework',
      'PostgreSQL',
      'Docker',
      'Nginx',
    ],
    features:
      'Application PWA installable, gestion multi-rôles avec JWT, suivi des bandes et de la mortalité, gestion des stocks, commandes, livraisons, trésorerie et architecture conteneurisée.',
    link: null,
    site: null,
    linkType: 'private',
  },
];

/*
 * Les icônes ci-dessous utilisent Font Awesome 4.7,
 * déjà chargé dans le index.html du projet.
 */
const TECH_ICONS = {
  'Django REST Framework': { icon: 'fa-code', short: 'DRF', color: '#a30000', bg: 'rgba(163, 0, 0, 0.08)' },
  Django: { icon: 'fa-leaf', short: 'Dj', color: '#092e20', bg: 'rgba(9, 46, 32, 0.09)' },
  PostgreSQL: { icon: 'fa-database', short: 'PG', color: '#336791', bg: 'rgba(51, 103, 145, 0.1)' },
  'Tailwind CSS': { icon: 'fa-paint-brush', short: 'TW', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
  JavaScript: { icon: 'fa-file-code-o', short: 'JS', color: '#d49a00', bg: 'rgba(247, 223, 30, 0.18)' },
  React: { icon: 'fa-code', short: 'R', color: '#0088cc', bg: 'rgba(97, 218, 251, 0.16)' },
  JWT: { icon: 'fa-lock', short: 'JWT', color: '#6b46c1', bg: 'rgba(107, 70, 193, 0.1)' },
  Celery: { icon: 'fa-tasks', short: 'Ce', color: '#37814a', bg: 'rgba(55, 129, 74, 0.1)' },
  Docker: { icon: 'fa-cube', short: 'D', color: '#2496ed', bg: 'rgba(36, 150, 237, 0.1)' },
  FastAPI: { icon: 'fa-bolt', short: 'FA', color: '#05998b', bg: 'rgba(5, 153, 139, 0.1)' },
  'Framer Motion': { icon: 'fa-magic', short: 'FM', color: '#bb2689', bg: 'rgba(187, 38, 137, 0.1)' },
  Sass: { icon: 'fa-paint-brush', short: 'Sa', color: '#cf649a', bg: 'rgba(207, 100, 154, 0.12)' },
  'GitHub Actions': { icon: 'fa-github', short: 'GH', color: '#24292e', bg: 'rgba(36, 41, 46, 0.08)' },
  TypeScript: { icon: 'fa-file-code-o', short: 'TS', color: '#3178c6', bg: 'rgba(49, 120, 198, 0.1)' },
  Nginx: { icon: 'fa-server', short: 'N', color: '#009639', bg: 'rgba(0, 150, 57, 0.1)' },
  Python: { icon: 'fa-code', short: 'Py', color: '#3776ab', bg: 'rgba(55, 118, 171, 0.1)' },
};

function TechIcons({ technologies = [] }) {
  return (
    <div className="project-tech-icons" aria-label="Technologies utilisées">
      {technologies.map((technology) => {
        const tech = TECH_ICONS[technology] || {
          icon: 'fa-code',
          short: technology.slice(0, 2),
          color: '#555555',
          bg: '#fafaf8',
        };

        return (
          <span
            key={technology}
            className="project-tech-icon"
            style={{
              color: tech.color,
              backgroundColor: tech.bg || '#fafaf8',
              borderColor: tech.color ? `${tech.color}35` : '#f0f0ed',
            }}
            title={technology}
            aria-label={technology}
          >
            <i className={`fa ${tech.icon}`} aria-hidden="true" style={{ color: tech.color }} />
            <span className="project-tech-tooltip">{technology}</span>
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
      if (event.key === 'Escape') onClose();
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
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Fermer"
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
              initial={{ opacity: 0, y: 25 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 25 }
              }
              transition={{ duration: 0.4, delay: index * 0.07 }}
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
                    <i className="fa fa-external-link" aria-hidden="true" />
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
                      {project.linkType === 'private' ? 'Code privé' : 'GitHub'}
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
          padding-top: 90px;
          padding-bottom: 90px;
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
          column-gap: 24px;
          row-gap: 30px;
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
          transform: translateY(-5px);
          box-shadow: 0 13px 30px rgba(25, 25, 25, 0.09);
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
          height: 205px;
          overflow: hidden;
          background: #efefeb;
        }

        .projects-modern .project-card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(0, 0, 0, 0.5) 100%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .projects-modern .project-card-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .projects-modern .project-card:hover .project-card-image img {
          transform: scale(1.045);
        }

        .projects-modern .project-card:hover .project-card-image::after {
          opacity: 1;
        }

        .projects-modern .project-card-open {
          position: absolute;
          z-index: 1;
          bottom: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border-radius: 7px;
          background: #fff;
          color: #242424;
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transform: translateY(5px);
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
          padding: 20px 20px 16px;
        }

        .projects-modern .project-card-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .projects-modern .project-card-heading h3 {
          margin: 0;
          color: #202020;
          font-size: 18px;
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
          margin: 8px 0 12px;
          color: #858585;
          font-size: 13px;
          line-height: 1.6;
        }

        .projects-modern .project-tech-icons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          margin-top: auto;
          padding: 12px 0 15px;
          border-bottom: 1px solid #f0f0ed;
        }

        .projects-modern .project-tech-icon {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border: 1px solid #f0f0ed;
          border-radius: 9px;
          background: #fafaf8;
          color: #555;
          font-size: 19px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .projects-modern .project-card:hover .project-tech-icon {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
        }

        .projects-modern .project-tech-icon:hover {
          filter: brightness(0.94);
        }

        .projects-modern .project-tech-tooltip {
          position: absolute;
          z-index: 10;
          bottom: calc(100% + 8px);
          left: 50%;
          padding: 5px 8px;
          border-radius: 5px;
          background: #222;
          color: #fff;
          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 4px);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .projects-modern .project-tech-icon:hover .project-tech-tooltip {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        .projects-modern .project-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
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

        /* Fenêtre des détails */
        .project-modal-backdrop {
          position: fixed;
          z-index: 99999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
          background: rgba(16, 18, 20, 0.72);
          backdrop-filter: blur(5px);
        }

        .project-modal {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: calc(100vh - 40px);
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
          background: rgba(20, 20, 20, 0.7);
          color: #fff;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
        }

        .project-modal-image {
          position: relative;
          height: 230px;
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
          padding: 26px 28px 28px;
        }

        .project-modal-subtitle {
          margin: 0 0 5px;
          color: #f2761d;
          font-size: 13px;
          font-weight: 600;
        }

        .project-modal-content h3 {
          margin: 0 0 22px;
          color: #222;
          font-size: 26px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .project-modal-section {
          margin-bottom: 20px;
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
          padding: 7px 10px;
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
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #eeeeea;
        }

        .project-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 42px;
          padding: 10px 15px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }

        .project-action-primary {
          background: #f2761d;
          color: #fff !important;
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
            column-gap: 20px;
            row-gap: 26px;
          }
        }

        @media (max-width: 575px) {
          .projects-modern {
            padding-top: 60px;
            padding-bottom: 60px;
          }

          .projects-modern .projects-grid {
            grid-template-columns: 1fr;
            row-gap: 22px;
          }

          .projects-modern .project-card-image {
            height: 215px;
          }

          .projects-modern .project-card-content {
            padding: 18px;
          }

          .projects-modern .project-card-heading h3 {
            font-size: 17px;
          }

          .projects-modern .project-card-open {
            opacity: 1;
            transform: none;
          }

          .project-modal-backdrop {
            padding: 10px;
          }

          .project-modal {
            max-height: calc(100vh - 20px);
            border-radius: 12px;
          }

          .project-modal-image {
            height: 180px;
          }

          .project-modal-content {
            padding: 21px 18px;
          }

          .project-modal-content h3 {
            font-size: 22px;
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
