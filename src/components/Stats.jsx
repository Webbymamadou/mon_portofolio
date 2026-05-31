import React from 'react';
import useIntersection from '../hooks/useIntersection';
import useCountUp from '../hooks/useCountUp';

function StatItem({ icon, target, text, trigger, duration }) {
  const count = useCountUp(target, duration, trigger);
  return (
    <div className="col-md-3 justify-content-center counter-wrap">
      <div className="block-18 d-flex">
        <div className="icon d-flex justify-content-center align-items-center">
          <span className={icon}></span>
        </div>
        <div className="text">
          <strong className="number">{count}</strong>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default function Stats() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: 'flaticon-suitcase', target: 3, text: 'Projets réalisés & en cours', duration: 1500 },
    { icon: 'flaticon-computer', target: 6, text: 'Technologies maîtrisées', duration: 1500 },
    { icon: 'flaticon-web-programming', target: 4, text: 'Frameworks utilisés', duration: 1500 },
    { icon: 'flaticon-calendar', target: 2026, text: 'Alternance 2026-2027', duration: 2500 },
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
