import React from 'react';
import {motion} from 'motion/react';
import {
  Archive,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  ChartSpline,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Folder,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Network,
  PlaySquare,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Users,
} from 'lucide-react';
import {fade, pop, smooth} from './utils';

type SceneProps = {
  frame: number;
  duration: number;
  fps: number;
};

const nav = ['Acquisitions', 'Underwriting', 'Accounting', 'Asset Management', 'Investor Relations', 'Operations'];
const coverage = ['Acquisitions', 'Underwriting', 'Accounting', 'Asset Management', 'Investor Relations', 'Administration', 'Marketing', 'Operations'];
const resources = [
  ['SOPs', FileText],
  ['Training Materials', GraduationCap],
  ['Videos', PlaySquare],
  ['Templates', Archive],
  ['Instructions', ClipboardList],
];

const MotionLayer: React.FC<React.PropsWithChildren<{className?: string; style?: React.CSSProperties}>> = ({
  className,
  style,
  children,
}) => (
  <motion.div className={className} style={style} initial={false}>
    {children}
  </motion.div>
);

const Brand: React.FC<{large?: boolean}> = ({large = false}) => (
  <div className={large ? 'brand large' : 'brand'}>
    <div className="brand-mark">G&amp;M</div>
    <div>
      <div className="brand-name">Gallagher &amp; Mohan</div>
      {!large && <div className="brand-tag">Real Service Through Global Systems</div>}
    </div>
  </div>
);

const SceneShell: React.FC<
  React.PropsWithChildren<{
    frame: number;
    duration: number;
    eyebrow?: string;
    title: React.ReactNode;
    align?: 'left' | 'center';
  }>
> = ({frame, duration, eyebrow, title, align = 'left', children}) => {
  const opacity = fade(frame, duration);
  const y = smooth(frame, 0, 34, [28, 0]);
  return (
    <MotionLayer className={`scene ${align}`} style={{opacity}}>
      <Brand />
      <MotionLayer className="copy" style={{transform: `translateY(${y}px)`}}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
      </MotionLayer>
      {children}
    </MotionLayer>
  );
};

const DocumentCloud: React.FC<{frame: number; faded?: boolean}> = ({frame, faded}) => {
  const items = [
    ['SOP', FileText, 1040, 280, -9],
    ['XLS', FileSpreadsheet, 1325, 420, 7],
    ['Policy', Folder, 1180, 620, -5],
    ['Notes', BookOpen, 1470, 250, 11],
    ['Tasks', ListChecks, 925, 560, 5],
  ] as const;
  return (
    <div className={faded ? 'doc-cloud faded' : 'doc-cloud'}>
      {items.map(([label, Icon, x, y, rot], index) => {
        const lift = Math.sin((frame + index * 18) / 38) * 16;
        const scale = 0.9 + pop(frame, 30, index * 8) * 0.1;
        return (
          <MotionLayer
            key={label}
            className="doc-card"
            style={{
              left: x,
              top: y + lift,
              transform: `rotate(${rot}deg) scale(${scale})`,
            }}
          >
            <Icon size={42} />
            <span>{label}</span>
            <div className="doc-lines">
              <i />
              <i />
              <i />
            </div>
          </MotionLayer>
        );
      })}
    </div>
  );
};

const Dashboard: React.FC<{frame: number; zoom?: number; active?: number; repository?: boolean}> = ({
  frame,
  zoom = 1,
  active = 0,
  repository = false,
}) => {
  const drift = Math.sin(frame / 90) * 10;
  return (
    <MotionLayer className="dashboard" style={{transform: `translate(${drift}px, ${-drift / 2}px) scale(${zoom})`}}>
      <div className="dash-sidebar">
        <div className="dash-logo"><LayoutDashboard size={24} /> PMS</div>
        {nav.map((item, index) => (
          <div className={index === active ? 'dash-nav active' : 'dash-nav'} key={item}>
            <span />
            {item}
          </div>
        ))}
      </div>
      <div className="dash-main">
        <div className="dash-top">
          <div>
            <b>Process Repository</b>
            <p>Operational knowledge center</p>
          </div>
          <div className="search"><Search size={20} /> Search workflows</div>
        </div>
        <div className="metric-row">
          {['Departments', 'Workflows', 'Activities'].map((m, i) => (
            <div className="metric" key={m}>
              <span>{repository ? [8, 142, 1248][i] : [6, 84, 620][i]}</span>
              <p>{m}</p>
            </div>
          ))}
        </div>
        <ProcessMapMini frame={frame} dense={repository} />
      </div>
    </MotionLayer>
  );
};

const ProcessMapMini: React.FC<{frame: number; dense?: boolean}> = ({frame, dense}) => {
  const pulse = 0.55 + Math.sin(frame / 18) * 0.2;
  return (
    <div className={dense ? 'map-mini dense' : 'map-mini'}>
      <div className="map-node root">Acquire Asset</div>
      <div className="map-line horizontal" />
      {[0, 1, 2].map((col) => (
        <React.Fragment key={col}>
          <div className="map-line vertical" style={{left: 275 + col * 230}} />
          <div className="map-node" style={{left: 190 + col * 230, top: 170}}>
            {['Diligence', 'IC Review', 'Closing'][col]}
          </div>
          <div className="map-node small" style={{left: 175 + col * 230, top: 280, opacity: col === 1 ? pulse : 1}}>
            {['Checklist', 'Memo', 'Funding'][col]}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const BigProcessMap: React.FC<{frame: number; zoom?: number}> = ({frame, zoom = 1}) => {
  const pan = smooth(frame, 0, 180, [0, -240]);
  const nodes = ['Discovery', 'Stakeholders', 'Workflow', 'Decision', 'Task', 'Resource', 'Owner', 'Control'];
  return (
    <MotionLayer className="big-map" style={{transform: `translateX(${pan}px) scale(${zoom})`}}>
      {nodes.map((node, index) => (
        <div className={index === 0 ? 'big-node primary' : 'big-node'} style={{left: 120 + index * 245, top: 185 + (index % 3) * 140}} key={node}>
          {node}
        </div>
      ))}
      {nodes.slice(1).map((node, index) => (
        <div className="connector" style={{left: 295 + index * 245, top: 235 + ((index + 1) % 3) * 70}} key={node} />
      ))}
    </MotionLayer>
  );
};

export const ChallengeScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Process knowledge is scattered across your organization.">
    <div className="scatter-field">
      <DocumentCloud frame={frame} />
      <div className="signal-line one" />
      <div className="signal-line two" />
      <div className="signal-line three" />
    </div>
  </SceneShell>
);

export const DocumentationScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell
    frame={frame}
    duration={duration}
    title={<><span>Building documentation takes time.</span><br />Keeping it current is even harder.</>}
  >
    <DocumentCloud frame={frame} />
    <MotionLayer className="clock-ring" style={{transform: `rotate(${frame * 1.5}deg)`}} />
  </SceneShell>
);

export const MaintenanceBurdenScene: React.FC<SceneProps> = ({frame, duration}) => {
  const decay = smooth(frame, 30, duration - 20, [0, 1]);
  return (
    <SceneShell frame={frame} duration={duration} title="Managing employees to create and maintain process documentation can become a major burden.">
      <MotionLayer className="outdated-map" style={{filter: `blur(${decay * 2}px)`, transform: `rotate(${-2 + decay * 4}deg)`}}>
        <BigProcessMap frame={frame} />
        <div className="stamp">OUTDATED</div>
      </MotionLayer>
    </SceneShell>
  );
};

export const DashboardIntroScene: React.FC<SceneProps> = ({frame, duration}) => {
  const z = smooth(frame, 0, duration, [0.84, 1.02]);
  return (
    <SceneShell frame={frame} duration={duration} eyebrow="Introducing" title="Process Map Solutions." align="center">
      <Dashboard frame={frame} zoom={z} repository />
    </SceneShell>
  );
};

export const CoverageScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Built exclusively for real estate companies.">
    <div className="coverage-grid">
      {coverage.map((item, index) => (
        <MotionLayer className="coverage-pill" key={item} style={{opacity: pop(frame, 30, index * 5), transform: `translateY(${(1 - pop(frame, 30, index * 5)) * 30}px)`}}>
          <Building2 size={30} />
          {item}
        </MotionLayer>
      ))}
    </div>
  </SceneShell>
);

export const SpecialistScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title={<><span>A dedicated Process Map Specialist assigned to your account.</span><br />A proven process.</>}>
    <div className="process-steps">
      {['Discovery', 'Build', 'Review', 'Maintain'].map((step, index) => {
        const StepIcon = [Search, Boxes, CheckCircle2, RefreshCw][index];
        return (
          <React.Fragment key={step}>
            <MotionLayer className="step" style={{opacity: pop(frame, 30, index * 12)}}>
              <StepIcon size={44} />
              <span>{step}</span>
            </MotionLayer>
            {index < 3 && <div className="arrow-line" />}
          </React.Fragment>
        );
      })}
    </div>
  </SceneShell>
);

export const DashboardRepositoryScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="A centralized repository for your operational knowledge.">
    <Dashboard frame={frame} zoom={smooth(frame, 0, duration, [0.95, 1.08])} repository />
  </SceneShell>
);

export const DepartmentsScene: React.FC<SceneProps> = ({frame, duration}) => {
  const active = Math.floor((frame / duration) * nav.length) % nav.length;
  return (
    <SceneShell frame={frame} duration={duration} title={<><span>View every department.</span><br />Every workflow.<br />Every process.</>}>
      <Dashboard frame={frame} zoom={1.05} active={active} repository />
    </SceneShell>
  );
};

export const ProcessFlythroughScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Understand how work flows throughout your organization.">
    <MotionLayer className="flythrough" style={{transform: `scale(${smooth(frame, 0, duration, [0.86, 1.35])})`}}>
      <BigProcessMap frame={frame} zoom={1} />
    </MotionLayer>
  </SceneShell>
);

export const ActivitiesScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Move from high-level workflows to detailed operational activities.">
    <MotionLayer className="activity-stack" style={{transform: `scale(${smooth(frame, 0, duration, [1, 1.12])})`}}>
      {['Workflow', 'Activity', 'Task', 'Control'].map((item, index) => (
        <MotionLayer className="activity-card" style={{left: 980 + index * 70, top: 260 + index * 100, opacity: pop(frame, 30, index * 10)}} key={item}>
          <span>{item}</span>
          <b>{['Asset onboarding', 'Verify documents', 'Confirm approval', 'Log exception'][index]}</b>
        </MotionLayer>
      ))}
    </MotionLayer>
  </SceneShell>
);

export const ResourcesScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Capture the knowledge behind every process step.">
    <Dashboard frame={frame} zoom={0.92} active={2} repository />
    <MotionLayer className="resource-panel" style={{transform: `translateX(${smooth(frame, 10, 45, [420, 0])}px)`}}>
      <h2>Step Resources</h2>
      {resources.map(([label, Icon], index) => (
        <div className="resource-row" key={label}>
          <Icon size={28} />
          <span>{label}</span>
          <CheckCircle2 size={22} />
        </div>
      ))}
    </MotionLayer>
  </SceneShell>
);

export const ConnectedMapsScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} title="Create a standardized operational framework.">
    <div className="connected">
      {[0, 1, 2, 3].map((item) => (
        <MotionLayer className="mini-board" key={item} style={{transform: `translateY(${Math.sin(frame / 30 + item) * 10}px)`}}>
          <ProcessMapMini frame={frame + item * 12} dense />
        </MotionLayer>
      ))}
    </div>
  </SceneShell>
);

export const OutcomesScene: React.FC<SceneProps> = ({frame, duration}) => {
  const items = [
    ['Training', GraduationCap],
    ['AI', Bot],
    ['Optimization', ChartSpline],
    ['Outsourcing', Users],
  ] as const;
  return (
    <SceneShell frame={frame} duration={duration} title="The foundation for future growth and operational improvement.">
      <div className="outcome-row">
        {items.map(([label, Icon], index) => (
          <MotionLayer className="outcome" key={label} style={{opacity: pop(frame, 30, index * 9), transform: `scale(${0.88 + pop(frame, 30, index * 9) * 0.12})`}}>
            <Icon size={58} />
            <span>{label}</span>
          </MotionLayer>
        ))}
      </div>
    </SceneShell>
  );
};

export const HeroDashboardScene: React.FC<SceneProps> = ({frame, duration}) => (
  <SceneShell frame={frame} duration={duration} eyebrow="Gallagher & Mohan" title="Process Map Solutions" align="center">
    <MotionLayer className="hero-orbit" style={{transform: `scale(${smooth(frame, 0, duration, [0.88, 1])})`}}>
      <Dashboard frame={frame} zoom={1.08} repository />
      <div className="hero-badge"><Sparkles size={28} /> Real Service Through Global Systems</div>
    </MotionLayer>
  </SceneShell>
);

export const FinalLogoScene: React.FC<SceneProps> = ({frame, duration}) => (
  <MotionLayer className="scene final" style={{opacity: fade(frame, duration, 24, 1)}}>
    <Brand large />
  </MotionLayer>
);
