import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const EXPERIENCES = [
  {
    id: 'formuloo',
    type: 'stage',
    status: 'in_progress', // 'in_progress' | 'completed'
    statusLabel: 'En cours',
    role: 'Développeur Backend Python',
    company: 'Formuloo',
    location: 'Télétravail • Dakar',
    period: 'Septembre 2026 – Novembre 2026',
    contract: 'Stage professionnel',
    badgeIcon: 'fa-building-o',
    summary:
      "Intégration d'une équipe technique avec des développeurs seniors, au sein d'une organisation Agile/Scrum sous Jira avec des cycles de livraison courts.",
    missions: [
      "Conception et développement d'API REST sécurisées et performantes avec Django REST Framework.",
      'Modélisation des données relationnelles et optimisation de requêtes SQL complexes sous PostgreSQL.',
      'Gestion des tickets, revues de code systématiques (Pull Requests) et respect du Git Flow.',
      "Conteneurisation des environnements de travail avec Docker pour assurer la parité dev/prod.",
    ],
    platform: {
      name: 'Services & API Backend Formuloo',
      desc: "Modules d'authentification JWT, gestion de flux de données et intégration d'endpoints.",
      linkType: 'private',
    },
    technologies: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker', 'Git', 'Jira', 'Agile/Scrum'],
  },
  {
    id: 'e3-ndamli',
    type: 'mission',
    status: 'in_progress',
    statusLabel: 'En cours (MVP)',
    role: 'Chef de Projet • Développeur Backend & DevOps',
    company: 'E³ — Étudiants · Écoles · Entreprises (Projet Ndamli)',
    location: 'Sénégal',
    period: '2026 – En cours',
    contract: 'Mission & Plateforme Nationale',
    badgeIcon: 'fa-graduation-cap',
    summary:
      "Plateforme numérique d'envergure nationale reliant étudiants, établissements de formation et entreprises pour connecter la formation à l'emploi au Sénégal. Profils vérifiés, offres de stage/emploi, suivi des candidatures en temps réel et badges de compétences vérifiables.",
    missions: [
      'Pilotage du projet : rédaction des cahiers des charges fonctionnel et technique, gestion du backlog Trello, cadrage des sprints et répartition des tâches.',
      'Gouvernance technique & Qualité : mise en place de la convention Git Flow, revue systématique et validation des Pull Requests avant intégration.',
      'Conception Backend & API : architecture RESTful modulaire avec Django REST Framework et modélisation relationnelle PostgreSQL (étudiants, écoles, entreprises, candidatures, badges).',
      'Infrastructure DevOps : conteneurisation intégrale avec Docker et Docker Compose (backend Django, frontend React Vite, proxy Nginx et environnement d’infra).',
    ],
    platform: {
      name: 'Plateforme E³ / Projet Ndamli (MVP en développement)',
      desc: 'Mise en relation étudiants-écoles-entreprises, délivrance de badges de compétences vérifiables et matching de candidatures.',
      linkType: 'private',
    },
    technologies: [
      'Django REST Framework',
      'React (Vite)',
      'PostgreSQL',
      'Docker',
      'Docker Compose',
      'Nginx',
      'Git Flow',
      'Trello / Scrum',
    ],
  },

  {
    id: 'oustaz-agro',
    type: 'mission',
    status: 'completed',
    statusLabel: 'Terminée',
    role: 'Concepteur & Développeur Fullstack Backend',
    company: 'Oustaz Agro Business',
    location: 'Sénégal',
    period: '2026',
    contract: 'Mission Client',
    badgeIcon: 'fa-briefcase',
    summary:
      "Digitalisation intégrale d'une exploitation avicole : remplacement d'une gestion manuelle sur papier par une plateforme web centralisée et collaborative.",
    missions: [
      'Diagnostic approfondi des processus métiers : flux des bandes de poulets, mortalité, pontes, stocks et ventes.',
      'Conception de la base de données relationnelle et de la logique métier avec Django REST Framework.',
      'Mise en place du contrôle des accès basé sur les rôles (RBAC) pour isoler les vues gestionnaires et exploitants.',
      'Développement du frontend en PWA installable (React / TypeScript) et déploiement conteneurisé (Docker, Nginx).',
    ],
    platform: {
      name: 'Plateforme PWA de gestion avicole',
      desc: 'Tableau de bord, suivi des lots en temps réel, alertes stock, facturation et trésorerie.',
      linkType: 'private',
    },
    technologies: ['React', 'TypeScript', 'Django REST Framework', 'PostgreSQL', 'Docker', 'Nginx'],
  },
  {
    id: 'kp-librairie',
    type: 'mission',
    status: 'completed',
    statusLabel: 'Terminée',
    role: 'Développeur Backend & Intégration',
    company: 'KP — Librairie Papeterie (LP Kassas)',
    location: 'Sénégal',
    period: '2026',
    contract: 'Mission Client',
    badgeIcon: 'fa-shopping-bag',
    summary:
      'Création et mise en production d’un site vitrine multi-boutiques avec catalogue en ligne dynamique et système de commande directe via WhatsApp.',
    missions: [
      'Analyse du comportement d’achat des clients locaux pour concevoir un tunnel de commande ultra-rapide par WhatsApp.',
      'Développement des API REST du catalogue produits avec recherche instantanée, filtres par catégorie et disponibilité.',
      'Création d’un espace d’administration sécurisé permettant à chaque boutique de gérer ses stocks de manière autonome.',
      'Déploiement et mise en production du site en ligne.',
    ],
    platform: {
      name: 'Site Web LP Kassas (en ligne)',
      desc: 'Catalogue interactif multi-boutiques avec routage des commandes sur WhatsApp.',
      siteUrl: 'https://www.lpkkas.sn/',
      linkType: 'live',
    },
    technologies: ['Django REST Framework', 'React', 'PostgreSQL', 'JWT', 'WhatsApp API'],
  },
  {
    id: 'distrimanager',
    type: 'mission',
    status: 'in_progress',
    statusLabel: 'Finalisation',
    role: 'Architecte & Développeur Backend',
    company: 'Entreprise de Distribution',
    location: 'Sénégal',
    period: '2026',
    contract: 'Mission Applicative',
    badgeIcon: 'fa-cubes',
    summary:
      'Solution de gestion commerciale et logistique multi-entrepôts conçue pour fluidifier la saisie des commandes au bureau et sur le terrain par les commerciaux.',
    missions: [
      'Diagnostic des points de blocage entre le stock physique des entrepôts et les prises de commande terrain.',
      'Modélisation du stock multi-dépôts avec règles strictes de réservation et traçabilité des mouvements.',
      'Développement des endpoints API de synchronisation des commandes et calcul automatisé des marges.',
      'Mise en place d’une interface responsive et légère avec Tailwind CSS et JavaScript.',
    ],
    platform: {
      name: 'DistriManager - ERP Distribution',
      desc: 'Gestion des stocks multi-entrepôts, fiches clients, prises de commande et tableau de bord de vente.',
      linkType: 'private',
    },
    technologies: ['Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'JavaScript', 'Docker'],
  },
];

const FILTERS = [
  { key: 'all', label: 'Toutes les expériences' },
  { key: 'stage', label: 'Stages & Entreprises' },
  { key: 'mission', label: 'Missions & Applications' },
];

export default function Experience() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (activeFilter === 'all') return true;
    return exp.type === activeFilter;
  });

  return (
    <section ref={ref} className="ftco-section experience-section" id="experience-section">
      <div className="container">
        {/* En-tête de section */}
        <div className="row justify-content-center pb-4">
          <div className="col-md-10 heading-section text-center">
            <span className="subheading">Mon parcours professionnel</span>
            <h2 className="mb-4">Expériences &amp; Missions</h2>
            <p className="experience-intro">
              Stages en entreprise, missions de développement d’applications et diagnostics de besoins métiers. 
              Chaque expérience allie rigueur technique, modélisation de données et livrables concrets.
            </p>
          </div>
        </div>

        {/* Boutons de filtrage */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-12 text-center">
            <div className="experience-filter-group" role="tablist" aria-label="Filtres des expériences">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.key}
                  className={`experience-filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des cartes d'expérience */}
        <div className="experience-list">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="experience-grid"
            >
              {filteredExperiences.map((exp, index) => (
                <motion.article
                  key={exp.id}
                  className="experience-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Bandeau supérieur : Rôle, Entreprise, Période & Statut */}
                  <div className="exp-card-header">
                    <div className="exp-header-left">
                      <div className="exp-company-badge">
                        <i className={`fa ${exp.badgeIcon}`} aria-hidden="true" />
                        <span>{exp.company}</span>
                        <span className="exp-contract-tag">• {exp.contract}</span>
                      </div>
                      <h3 className="exp-role-title">{exp.role}</h3>
                      <div className="exp-meta-info">
                        <span className="exp-period">
                          <i className="fa fa-calendar-o mr-1" aria-hidden="true" />
                          {exp.period}
                        </span>
                        <span className="exp-location">
                          <i className="fa fa-map-marker mr-1" aria-hidden="true" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="exp-header-right">
                      <span className={`exp-status-pill status-${exp.status}`}>
                        <span className="status-dot" aria-hidden="true" />
                        {exp.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Résumé du contexte / Enjeu métier */}
                  <div className="exp-body">
                    <div className="exp-summary-block">
                      <span className="exp-block-title">
                        <i className="fa fa-info-circle mr-1" aria-hidden="true" />
                        Contexte &amp; Enjeux
                      </span>
                      <p className="exp-summary-text">{exp.summary}</p>
                    </div>

                    {/* Missions réalisées */}
                    <div className="exp-missions-block">
                      <span className="exp-block-title">
                        <i className="fa fa-check-square-o mr-1" aria-hidden="true" />
                        Missions &amp; Réalisations
                      </span>
                      <ul className="exp-missions-list">
                        {exp.missions.map((mission, mIdx) => (
                          <li key={mIdx} className="exp-mission-item">
                            <i className="fa fa-angle-right exp-bullet-icon" aria-hidden="true" />
                            <span>{mission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Plateforme / Livrable associé */}
                    {exp.platform && (
                      <div className="exp-platform-box">
                        <div className="platform-info">
                          <div className="platform-tag">
                            <i className="fa fa-rocket mr-1" aria-hidden="true" />
                            Application &amp; Plateforme réalisée
                          </div>
                          <strong className="platform-name">{exp.platform.name}</strong>
                          <p className="platform-desc">{exp.platform.desc}</p>
                        </div>

                        {exp.platform.siteUrl && (
                          <a
                            href={exp.platform.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="platform-live-btn"
                          >
                            <i className="fa fa-external-link mr-1" aria-hidden="true" />
                            Visiter
                          </a>
                        )}
                      </div>
                    )}

                    {/* Technologies utilisées */}
                    <div className="exp-tech-stack">
                      <span className="tech-label">Stack technique :</span>
                      <div className="tech-tags">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Styles harmonisés avec le design system du portfolio ($primary: #b1b493, sombre: #232931) */}
      <style>{`
        .experience-section {
          background: #fafaf8;
          position: relative;
          padding: 7em 0;
        }

        .experience-intro {
          font-family: "Times New Roman", Times, serif;
          font-size: 17px;
          color: #555;
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .experience-filter-group {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          background: #fff;
          padding: 6px;
          border-radius: 40px;
          border: 1px solid #e8e8e2;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }

        .experience-filter-btn {
          border: none;
          background: transparent;
          color: #4a4a4a;
          padding: 9px 22px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .experience-filter-btn:hover {
          color: #232931;
          background: rgba(177, 180, 147, 0.15);
        }

        .experience-filter-btn.active {
          background: #b1b493;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(177, 180, 147, 0.35);
        }

        .experience-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 980px;
          margin: 0 auto;
        }

        .experience-card {
          background: #ffffff;
          border: 1px solid #e8e8e2;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 22px rgba(25, 25, 25, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .experience-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(25, 25, 25, 0.08);
          border-color: #b1b493;
        }

        .exp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px 18px;
          background: #fbfbf9;
          border-bottom: 1px solid #f0f0ea;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .exp-card-header {
            flex-direction: column;
            padding: 20px 20px 14px;
          }
        }

        .exp-company-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #b1b493;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }

        .exp-contract-tag {
          color: #888;
          font-weight: 500;
          text-transform: none;
          letter-spacing: normal;
        }

        .exp-role-title {
          font-size: 22px;
          font-weight: 700;
          color: #232931;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .exp-meta-info {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          font-size: 13px;
          color: #777;
        }

        .exp-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .exp-status-pill.status-in_progress {
          background: #eef7ed;
          color: #2b7a37;
          border: 1px solid #c2e5bf;
        }

        .exp-status-pill.status-in_progress .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34a853;
          box-shadow: 0 0 0 0 rgba(52, 168, 83, 0.7);
          animation: statusPulse 1.8s infinite;
        }

        @keyframes statusPulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 168, 83, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(52, 168, 83, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 168, 83, 0);
          }
        }

        .exp-status-pill.status-completed {
          background: #f1f4ea;
          color: #556041;
          border: 1px solid #d8dfcd;
        }

        .exp-status-pill.status-completed .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #b1b493;
        }

        .exp-body {
          padding: 24px 28px;
        }

        @media (max-width: 768px) {
          .exp-body {
            padding: 18px 20px;
          }
        }

        .exp-block-title {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #232931;
          margin-bottom: 10px;
        }

        .exp-summary-text {
          font-family: "Times New Roman", Times, serif;
          font-size: 16px;
          color: #444;
          line-height: 1.65;
          margin-bottom: 22px;
        }

        .exp-missions-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .exp-mission-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: "Times New Roman", Times, serif;
          font-size: 16px;
          color: #333;
          line-height: 1.5;
        }

        .exp-bullet-icon {
          color: #b1b493;
          font-size: 15px;
          margin-top: 3px;
          font-weight: bold;
        }

        .exp-platform-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background: #f7f8f3;
          border-left: 4px solid #b1b493;
          border-radius: 0 10px 10px 0;
          margin-bottom: 22px;
          gap: 14px;
        }

        @media (max-width: 600px) {
          .exp-platform-box {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .platform-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #7b805c;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .platform-name {
          font-size: 15px;
          color: #232931;
          display: block;
        }

        .platform-desc {
          font-size: 13px;
          color: #666;
          margin: 2px 0 0 0;
        }

        .platform-live-btn {
          display: inline-flex;
          align-items: center;
          background: #b1b493;
          color: #fff !important;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .platform-live-btn:hover {
          background: #999c7c;
        }

        .exp-tech-stack {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px dashed #ecece6;
        }

        .tech-label {
          font-size: 12px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .tech-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #4a4d3a;
          background: #f1f3e9;
          border: 1px solid #e1e4d3;
          padding: 3px 10px;
          border-radius: 5px;
          transition: background 0.2s;
        }

        .tech-badge:hover {
          background: #e4e7d6;
        }
      `}</style>
    </section>
  );
}
