/**
 * HindsightLoop — the closed learning loop, made visible.
 * Presentation only: reads no API, changes no contracts. Steps link to the
 * existing routes that own each stage (navigation only).
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoopStep { name: string; desc: string; path: string }

const STEPS: LoopStep[] = [
  { name: 'Experience',     desc: 'An incident and its outcome are observed',        path: '/memory' },
  { name: 'Hindsight',      desc: 'Retain and recall what happened',                 path: '/memory' },
  { name: 'Reflection',     desc: 'Why it worked or failed',                         path: '/memory' },
  { name: 'Generalization', desc: 'Pattern lifted beyond one incident',              path: '/genome' },
  { name: 'Genome',         desc: 'Success conditions and failure boundaries',       path: '/genome' },
  { name: 'Skill',          desc: 'Boundary-aware recovery skill',                   path: '/learning/deliberate' },
  { name: 'Challenge',      desc: 'Adversarial counterfactual testing',              path: '/challenge' },
  { name: 'Transfer',       desc: 'Does it apply to this new context?',              path: '/transfer' },
  { name: 'Decision',       desc: 'Governed action selection',                       path: '/decision/cockpit' },
  { name: 'Outcome',        desc: 'What actually happened afterwards',               path: '/decision/cockpit' },
  { name: 'Learning',       desc: 'Delta retained for future decisions',             path: '/governance/resilience' },
];

interface Props { activeIndex?: number; title?: string; compact?: boolean }

export const HindsightLoop: React.FC<Props> = ({
  activeIndex,
  title = 'The Hindsight learning loop',
  compact = false,
}) => {
  const navigate = useNavigate();
  return (
    <section className="hl-wrap" aria-labelledby="hl-title">
      <div className="hl-head">
        <div>
          <h2 id="hl-title" className="hl-title">{title}</h2>
          <p className="hl-sub">Experienced → understood → generalized → bounded → behaviour changed</p>
        </div>
      </div>
      <ol className="hl-track">
        {STEPS.map((s, i) => (
          <li key={s.name} style={{ display: 'contents' }}>
            <button
              type="button"
              className="hl-step"
              aria-current={activeIndex === i ? 'true' : undefined}
              aria-label={`${i + 1}. ${s.name}: ${s.desc}. Open workspace.`}
              onClick={() => navigate(s.path)}
              style={{ font: 'inherit' }}
            >
              {activeIndex === i && <span className="hl-pulse" aria-hidden="true" />}
              <span className="hl-step-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="hl-step-name">{s.name}</span>
              {!compact && <span className="hl-step-desc">{s.desc}</span>}
              {i < STEPS.length - 1 && <span className="hl-step-arrow" aria-hidden="true">›</span>}
            </button>
          </li>
        ))}
      </ol>
      <div className="hl-return" aria-hidden="true"><span>Learning returns to <b>Hindsight</b></span></div>
    </section>
  );
};

export default HindsightLoop;
