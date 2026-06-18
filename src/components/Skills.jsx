import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';
import useCountUp from '../hooks/useCountUp';

const SKILLS = [
  {
    name: 'Python (Django & FastAPI)',
    value: 92,
    subtitle1: 'Backend',
    desc1: 'APIs RESTful',
    subtitle2: 'Architecture',
    desc2: 'MVT & Clean Code',
  },
  {
    name: 'Java (Spring Boot)',
    value: 88,
    subtitle1: 'Langage',
    desc1: 'POO & Fiabilité',
    subtitle2: 'Backend',
    desc2: 'Microservices',
  },
  {
    name: 'Docker & Docker Compose',
    value: 88,
    subtitle1: 'DevOps',
    desc1: 'Conteneurisation',
    subtitle2: 'Environnements',
    desc2: 'Reproductibles',
  },
  {
    name: 'PostgreSQL & MySQL',
    value: 90,
    subtitle1: 'Conception',
    desc1: 'UML & Merise',
    subtitle2: 'Bases SQL',
    desc2: 'Optimisation',
  },
  {
    name: 'Linux & Administration',
    value: 85,
    subtitle1: 'OS',
    desc1: 'Serveurs Linux',
    subtitle2: 'Scripting',
    desc2: 'Bash / Shell',
  },
  {
    name: 'CI/CD & Automatisation',
    value: 84,
    subtitle1: 'Intégration',
    desc1: 'GitHub Actions',
    subtitle2: 'Déploiement',
    desc2: 'GitLab CI/CD',
  },
  {
    name: 'Git & GitHub',
    value: 92,
    subtitle1: 'Collaboration',
    desc1: 'Gestion de code',
    subtitle2: 'Versioning',
    desc2: 'Pratiques Git',
  },
  {
    name: 'Frontend (React & Tailwind)',
    value: 82,
    subtitle1: 'Interfaces',
    desc1: 'Dynamiques',
    subtitle2: 'CSS Modernes',
    desc2: 'Tailwind CSS',
  }
];

function SkillCard({ skill }) {
  const [hasEntered, setHasEntered] = React.useState(false);
  const count = useCountUp(skill.value, 1500, hasEntered);
  
  // Paramètres du cercle SVG
  const radius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius; // Environ 345.57

  return (
    <motion.div 
      className="skill-card shadow-sm"
      onViewportEnter={() => setHasEntered(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      <h2 className="skill-title">{skill.name}</h2>
      
      {/* Jauge circulaire en vecteur SVG animé avec Framer Motion */}
      <div className="circle-progress-wrapper">
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Cercle de fond (rail gris) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth={strokeWidth}
          />
          {/* Cercle actif de progression avec transition fluide */}
          <motion.circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke="#b1b493" // Couleur primaire d'origine
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={hasEntered ? { strokeDashoffset: circumference * (1 - skill.value / 100) } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Texte en pourcentage centré */}
        <div className="circle-progress-value">
          <div className="percentage-number">
            {count}<sup>%</sup>
          </div>
        </div>
      </div>
      
      {/* Infos supplémentaires sous forme de ligne Flexbox */}
      <div className="skill-stats-row">
        <div className="skill-stat-col">
          <div className="skill-stat-title">{skill.subtitle1}</div>
          <span className="skill-stat-desc">{skill.desc1}</span>
        </div>
        <div className="skill-stat-col">
          <div className="skill-stat-title">{skill.subtitle2}</div>
          <span className="skill-stat-desc">{skill.desc2}</span>
        </div>
      </div>

    </motion.div>
  );
}

export default function Skills() {
  const [ref, isVisible] = useIntersection({ threshold: 0.02, triggerOnce: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section ref={ref} className="ftco-section bg-light" id="competence-section">
      <div className="container">
        
        {/* Titre de section */}
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 heading-section text-center">
            <span className="subheading">Compétences</span>
            <h2 className="mb-4">Mes compétences</h2>
            <p>Voici un aperçu de mes compétences techniques et créatives développées à travers mes études et mes projets.</p>
          </div>
        </div>

        {/* Grille de compétences réécrite avec Grid CSS moderne */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="skills-grid mb-5"
        >
          {SKILLS.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
