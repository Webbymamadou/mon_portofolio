import React from 'react';
import useIntersection from '../hooks/useIntersection';
import useCountUp from '../hooks/useCountUp';

function StatItem({ icon, target, text, trigger, duration, prefix = '', suffix = '' }) {
  const count = useCountUp(target, duration, trigger);
  return (
    <div className="col-md-3 justify-content-center counter-wrap">
      <div className="block-18 d-flex">
        <div className="icon d-flex justify-content-center align-items-center">
          <span className={icon}></span>
        </div>
        <div className="text">
          <strong className="number">{prefix}{count}{suffix}</strong>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default function Stats() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

const stats = [
  { icon: 'flaticon-check', target: 100, suffix: '%', text: 'Code propre et relu', duration: 1500 },
  { icon: 'flaticon-team', target: 100, suffix: '%', text: 'Esprit d’équipe', duration: 1500 },
  { icon: 'flaticon-code', target: 24, suffix: '/7', text: 'Passion pour le backend', duration: 1500 },
  { icon: 'flaticon-calendar', target: 2026, suffix: '', text: '1 objectif Rejoindre une équipe et y grandir', duration: 2500 },
];

  return (
    <section ref={ref} className="ftco-counter img bg-light" id="section-counter">
      <div className="container">
        <div className="row">
          {stats.map((stat, i) => (
            <StatItem 
              key={i} 
              icon={stat.icon} 
              target={stat.target} 
              prefix={stat.prefix}
              suffix={stat.suffix}
              text={stat.text} 
              trigger={isVisible} 
              duration={stat.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
