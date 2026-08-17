// lm-sections-bottom.jsx

const StatCard = ({ target, suffix, prefix = '', label }) => {
  const [n, ref] = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '40px 16px', borderRight: '1px solid var(--lm-graphite)' }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', color: 'var(--lm-green)', lineHeight: 1, letterSpacing: '-0.03em' }}>{prefix}{n}{suffix}</div>
      <div style={{ width: 32, height: 2, background: 'var(--lm-green)', margin: '14px auto 12px' }} />
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lm-mist)' }}>{label}</div>
    </div>);

};

const EstatisticasSection = () =>
<section style={{ background: 'var(--lm-black)', borderTop: '1px solid var(--lm-graphite)', borderBottom: '1px solid var(--lm-graphite)' }}>
    <W>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
        <StatCard target={300} prefix="+" suffix="" label={tx('Alunos acompanhados', 'Clients coached')} />
        <StatCard target={100} prefix="+" suffix="" label={tx('Vidas transformadas', 'Lives transformed')} />
        <StatCard target={5} prefix="+" suffix="" label={tx('Países de atuação', 'Countries served')} />
      </div>
    </W>
  </section>;


const BeforeAfterCarousel = ({ pairs }) => {
  const [idx, setIdx] = React.useState(0);
  const n = pairs.length;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--lm-graphite)', background: 'var(--lm-black)' }}>
        <div style={{ display: 'flex', transition: 'transform 500ms cubic-bezier(.4,0,.2,1)', transform: `translateX(-${idx * 100}%)` }}>
          {pairs.map((p, i) => (
            <div key={i} style={{ width: '100%', flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {/* Antes */}
              <div style={{ position: 'relative' }}>
                <img src={p.before} alt={tx('Antes', 'Before')} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: 8, left: 8, fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lm-pearl)', background: 'rgba(11,11,13,0.7)', padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{tx('Antes', 'Before')}</span>
              </div>
              {/* Depois */}
              <div style={{ position: 'relative' }}>
                <img src={p.after} alt={tx('Depois', 'After')} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: 8, right: 8, fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lm-black)', background: 'var(--lm-green)', padding: '3px 8px', borderRadius: 999 }}>{tx('Depois', 'After')}</span>
              </div>
            </div>
          ))}
        </div>
        {/* divisória central */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, transform: 'translateX(-1px)', background: 'var(--lm-green)', opacity: 0.5, pointerEvents: 'none' }} />
      </div>
      {/* Dots */}
      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {pairs.map((_, i) => (
            <button key={i} type="button" aria-label={`${i + 1}`} onClick={() => setIdx(i)}
              style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', background: i === idx ? 'var(--lm-green)' : 'var(--lm-stone)', transition: 'all 260ms ease', padding: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
};

const DepoCard = ({ d, idx }) =>
<div className={`rv d${idx + 1}`} style={{ background: 'var(--lm-charcoal)', borderRadius: 14, padding: 28, border: '1px solid var(--lm-graphite)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 8, left: 16, fontFamily: "'Fraunces',serif", fontSize: 64, color: 'var(--lm-green)', opacity: .1, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {[0, 1, 2, 3, 4].map((j) => <Ic.star key={j} s={13} c="var(--lm-green)" />)}
    </div>
    {d.beforeAfter && <BeforeAfterCarousel pairs={d.beforeAfter} />}
    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.75, color: 'var(--t2)', marginBottom: 24, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>"{d.quote}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {d.avatar
        ? <div style={{ width: 54, height: 54, minWidth: 54, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--lm-green-mute)' }}>
            <img src={d.avatar} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.avatarPos || 'center top', transform: d.avatarScale ? `scale(${d.avatarScale})` : 'none' }} />
          </div>
        : <ImgPH h={54} label={tx('foto', 'photo')} style={{ width: 54, height: 54, minWidth: 54, borderRadius: '50%', border: '2px solid var(--lm-green-mute)', padding: 0 }} />}
      <div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--lm-pearl)' }}>{d.name}</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'var(--lm-mist)', marginTop: 2 }}>{d.detail}</div>
      </div>
    </div>
  </div>;

const DepoimentosSection = () => {
  const DEPOS = [
  { quote: tx('Finalmente entendi a diferença entre treinar e treinar com método. Em 8 semanas mudei minha composição corporal e parei de sentir dor no joelho.',
    'I finally understood the difference between training and training with a method. In 8 weeks I changed my body composition and stopped feeling knee pain.'),
    name: 'Hugo',
    detail: tx('31 anos', 'Age 31'),
    avatar: 'uploads/WhatsApp Image 2026-06-01 at 15.45.03.png',
    avatarPos: 'center',
    avatarScale: 1.7,
    beforeAfter: [
      { before: 'uploads/pasted-1780339944291-0.png', after: 'uploads/pasted-1780339950033-0.png' },
    ] },
  { quote: tx('Já tentei vários personais antes. Nenhum avaliou meu movimento, prescreveu recuperação e ainda me encaminhou pra quando precisou tudo integrado. Nunca tive isso.',
    "I've tried many personal trainers before. None of them assessed my movement, prescribed recovery and referred me when needed all integrated. I've never had this."),
    name: 'Thiago Mazega',
    detail: tx('23 anos', 'Age 23'),
    avatar: 'uploads/pasted-1780336534931-0.png',
    beforeAfter: [
      { before: 'uploads/thiago-antes-1.png', after: 'uploads/thiago-depois-1.png' },
      { before: 'uploads/thiago-antes-2.png', after: 'uploads/thiago-depois-2.png' },
    ] },
  { quote: tx('O que me surpreendeu foi a clareza. Desde o dia 1 eu sabia onde estava, pra onde ia e o que meu corpo precisava. Nunca tive isso antes.',
    "What surprised me was the clarity. From day 1 I knew where I was, where I was going and what my body needed. I'd never had that before."),
    name: 'Vitória',
    detail: tx('26 anos', 'Age 26'),
    avatar: 'uploads/pasted-1780339469257-0.png',
    avatarPos: 'center top',
    beforeAfter: [
      { before: 'uploads/vitoria-costas-antes-1.png', after: 'uploads/vitoria-costas-depois-1.png' },
      { before: 'uploads/vitoria-costas-antes-2.png', after: 'uploads/vitoria-costas-depois-2.png' },
      { before: 'uploads/vitoria-perfil-antes-1.png', after: 'uploads/vitoria-perfil-depois-1.png' },
      { before: 'uploads/vitoria-perfil-antes-2.png', after: 'uploads/vitoria-perfil-depois-2.png' },
    ] },
  { quote: tx('Tive acompanhamento nutricional e ajuda nos treinos junto com a avaliação física, que mostrou exatamente quais partes do meu corpo eu precisava desenvolver. Com tudo integrado, parei de treinar no escuro e finalmente vi o shape mudar.',
    'I had nutritional coaching and training support together with a physical assessment that showed exactly which parts of my body I needed to develop. With everything integrated, I stopped training in the dark and finally saw my physique change.'),
    name: 'João Flávio',
    detail: tx('23 anos', 'Age 23'),
    avatar: 'uploads/joao-perfil.png',
    avatarPos: 'center',
    beforeAfter: [
      { before: 'uploads/pasted-1781049616310-0.png', after: 'uploads/pasted-1781049630401-0.png' },
    ] }];

  return (
    <section id="depoimentos" style={{ background: 'var(--lm-black)', padding: '100px 0' }}>
    <W>
      <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', maxWidth: 520, margin: '0 auto' }}>
          {tx('Resultado fala.', 'Results speak.')} <span style={{ color: 'var(--lm-green)' }}>{tx('Metodologia entrega.', 'Method delivers.')}</span>
        </h2>
      </div>
      <div className="depo-track">
        {DEPOS.map((d, i) => <DepoCard key={i} d={d} idx={i} />)}
      </div>
    </W>
  </section>);

};


// ─── OFERTA ───────────────────────────────────────────────

const PT_ROWS = [
{ label: 'Sessões presenciais/sem', b: '2×', p: '3×', o: '5×' },
{ label: 'Plataforma de treino online', b: '✓', p: '✓', o: '✓' },
{ label: 'Avaliação física periódica', b: '✓', p: '✓', o: '✓' },
{ label: 'Massoterapia integrada', b: 'Opcional', p: '✓', o: '✓' },
{ label: 'Acompanhamento nutricional', b: 'Opcional', p: 'Opcional', o: '✓' },
{ label: 'Suporte estendido', b: '—', p: '✓', o: '✓' }];


const PTPlanTable = () =>
<div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 24, borderRadius: 10, border: '1px solid var(--lm-graphite)' }}>
    <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter',sans-serif", tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '44%' }} />
        <col style={{ width: '18.67%' }} />
        <col style={{ width: '18.67%' }} />
        <col style={{ width: '18.67%' }} />
      </colgroup>
      <thead>
        <tr>
          {[{ l: '', hi: false }, { l: 'Bronze', hi: false }, { l: 'Prata ★', hi: true }, { l: 'Ouro', hi: false }].map((col, ci) =>
        <th key={ci} style={{
          padding: '10px 12px',
          background: ci === 2 ? 'rgba(0,214,122,.1)' : 'var(--lm-graphite)',
          color: ci === 2 ? 'var(--lm-green)' : 'var(--lm-pearl)',
          fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
          textAlign: ci === 0 ? 'left' : 'center',
          borderBottom: '2px solid var(--lm-stone)',
          borderRight: ci < 3 ? '1px solid var(--lm-stone)' : 'none',
          whiteSpace: 'nowrap'
        }}>
              {col.l}
              {ci === 2 && <div style={{ fontSize: 9, color: 'var(--lm-green)', letterSpacing: '0.04em', marginTop: 2, fontWeight: 700 }}>MAIS ESCOLHIDO</div>}
            </th>
        )}
        </tr>
      </thead>
      <tbody>
        {PT_ROWS.map((row, ri) =>
      <tr key={ri}>
            <td style={{
          padding: '10px 12px', fontSize: 12, color: 'var(--t2)', lineHeight: 1.4,
          background: ri % 2 === 0 ? 'var(--lm-black)' : 'var(--lm-charcoal)',
          borderBottom: '1px solid var(--lm-graphite)',
          borderRight: '1px solid var(--lm-graphite)'
        }}>{row.label}</td>
            {[row.b, row.p, row.o].map((v, vi) =>
        <td key={vi} style={{
          padding: '10px 12px', textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap',
          background: vi === 1 ? ri % 2 === 0 ? 'rgba(0,214,122,.05)' : 'rgba(0,214,122,.08)' : ri % 2 === 0 ? 'var(--lm-black)' : 'var(--lm-charcoal)',
          borderBottom: '1px solid var(--lm-graphite)',
          borderLeft: vi === 1 ? '2px solid rgba(0,214,122,.35)' : '1px solid var(--lm-graphite)',
          borderRight: vi === 1 ? '2px solid rgba(0,214,122,.35)' : vi < 2 ? '1px solid var(--lm-graphite)' : 'none',
          color: v === '✓' ? 'var(--lm-green)' : v === '—' ? 'var(--lm-stone)' : v === 'Opcional' ? 'var(--lm-mist)' : 'var(--lm-pearl)',
          fontWeight: v === '✓' ? 700 : 400,
          fontStyle: v === 'Opcional' ? 'italic' : undefined
        }}>{v}</td>
        )}
          </tr>
      )}
      </tbody>
    </table>
    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: 'var(--lm-mist)', padding: '10px 12px', background: 'var(--lm-charcoal)', borderTop: '1px solid var(--lm-graphite)' }}>
      📍 Atendimento presencial: Lago Sul, Lago Norte, Asa Sul, Plano Piloto e Águas Claras
    </p>
  </div>;



const SERVICE_BLOCKS = () => [
  {
    id: 'avaliacao',
    icon: '📊',
    title: tx('Avaliação Física', 'Physical Assessment'),
    sub: tx('Diagnóstico do seu corpo com método e devolutiva clara.',
            'A diagnosis of your body with method and clear feedback.'),
    featured: false,
    wa: tx('Oi, quero agendar uma avaliação física', 'Hi, I want to schedule a physical assessment'),
    items: [
      tx('Avaliação física 1× por mês', 'Physical assessment once a month'),
    ],
  },
  {
    id: 'massoterapia',
    icon: '💆',
    title: tx('Massoterapia', 'Massage Therapy'),
    sub: tx('Recuperação especializada no estúdio Ápice ou no conforto da sua casa.',
            'Specialized recovery at the Ápice studio or in the comfort of your home.'),
    featured: false,
    wa: tx('Oi, quero agendar uma sessão de massoterapia', 'Hi, I want to schedule a massage therapy session'),
    items: [
      tx('Sessões no estúdio Ápice ou a domicílio', 'Sessions at the Ápice studio or at home'),
      tx('Massoterapia 1× por mês', 'Massage therapy once a month'),
    ],
  },
  {
    id: 'online',
    icon: '💻',
    title: tx('Online', 'Online'),
    sub: tx('Mentoria 100% remota, com método, dados e suporte direto.',
            '100% remote coaching, with method, data and direct support.'),
    featured: false,
    wa: tx('Oi, quero ter acesso a consultoria online', 'Hi, I want access to online coaching'),
    items: [
      tx('Consultoria de treinamento online', 'Online training coaching'),
      tx('Dieta', 'Diet plan'),
      tx('Anamnese completa', 'Full anamnesis'),
      tx('Dashboard de evolução', 'Progress dashboard'),
      tx('Materiais bônus: ebooks, guias', 'Bonus materials: ebooks, guides'),
    ],
  },
  {
    id: 'apice',
    apex: true,
    title: 'ÁPICE',
    sub: tx('O ecossistema completo, pensado para o seu resultado por inteiro.',
            'The complete ecosystem, designed for your results as a whole.'),
    featured: true,
    badge: tx('Mais completo', 'Most complete'),
    wa: tx('Oi, quero ter acesso ao plano Ápice', 'Hi, I want access to the Ápice plan'),
    items: [
      tx('Consultoria de treinamento online', 'Online training coaching'),
      tx('Dieta', 'Diet plan'),
      tx('Anamnese completa', 'Full anamnesis'),
      tx('Dashboard de evolução', 'Progress dashboard'),
      tx('Materiais bônus: ebooks, guias', 'Bonus materials: ebooks, guides'),
      tx('Avaliação física 1× por mês', 'Physical assessment once a month'),
    ],
  },
];

const ServiceCard = ({ block, compact = false }) => {
  const [hov, setHov] = React.useState(false);
  const f = block.featured;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: f
          ? 'linear-gradient(180deg, rgba(0,214,122,0.10) 0%, rgba(0,214,122,0.02) 100%)'
          : 'var(--lm-black)',
        borderRadius: 18,
        padding: compact ? '20px 22px' : '30px 26px',
        border: `1.5px solid ${f ? 'var(--lm-green)' : (hov ? 'var(--lm-stone)' : 'var(--lm-graphite)')}`,
        boxShadow: f
          ? '0 0 0 4px rgba(0,214,122,0.06), 0 16px 48px rgba(0,214,122,0.10)'
          : (hov ? '0 8px 28px rgba(0,0,0,0.35)' : 'none'),
        transition: 'all 220ms ease',
        transform: hov && !f ? 'translateY(-3px)' : 'none',
        display: 'flex', flexDirection: 'column', height: '100%',
      }}>
      {f && block.badge && (
        <span style={{
          position: 'absolute', top: -13, right: 22,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--lm-black)', background: 'var(--lm-green)',
          padding: '6px 14px', borderRadius: 999,
          boxShadow: '0 6px 20px rgba(0,214,122,0.35)'
        }}>
          <Ic.zap s={13} c="var(--lm-black)" /> {block.badge}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: compact ? 6 : 10 }}>
        {block.apex
          ? <span style={{ fontSize: 22, lineHeight: 1, color: 'var(--lm-green)', fontWeight: 800 }}>▲</span>
          : <span style={{ fontSize: compact ? 20 : 24, lineHeight: 1 }}>{block.icon}</span>}
        <h3 style={{
          fontFamily: "'Sora',sans-serif", fontWeight: 700,
          fontSize: compact ? 'clamp(17px,2vw,20px)' : 'clamp(20px,2.4vw,24px)',
          color: f ? 'var(--lm-green-glow)' : 'var(--lm-pearl)',
          letterSpacing: block.apex ? '0.04em' : '-0.01em',
          margin: 0, lineHeight: 1.2
        }}>{block.title}</h3>
      </div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: 'var(--lm-mist)', lineHeight: 1.55, marginBottom: compact ? 14 : 22 }}>{block.sub}</p>
      <ul style={{ listStyle: 'none', display: 'grid', gap: 11, margin: compact ? '0 0 16px' : '0 0 24px', padding: 0, flex: 1 }}>
        {block.items.map((it, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ flexShrink: 0, marginTop: 3 }}><Ic.check s={15} c="var(--lm-green)" /></div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.55, color: 'var(--t2)' }}>{it}</span>
          </li>
        ))}
      </ul>
      <Btn size="sm" pulse={f}
        onClick={() => {
          if (getLang() === 'en') { window.apiceCTA(); return; }
          const msg = block.wa || 'Oi, quero saber mais sobre os planos da Ápice';
          window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
        }}
        style={{
          width: '100%', justifyContent: 'center', fontSize: 13,
          borderRadius: 999, padding: compact ? '11px 18px' : '13px 20px',
          ...(f ? {} : { background: 'transparent', color: 'var(--lm-pearl)', border: '1px solid var(--lm-stone)', boxShadow: 'none' })
        }}>
        {tx('Começar agora', 'Start now')}
        <Ic.arr s={14} c={f ? 'var(--lm-black)' : 'var(--lm-pearl)'} />
      </Btn>
    </div>
  );
};



const OfertaSection = () => {
  const blocks = SERVICE_BLOCKS().filter((b) => getLang() === 'en' ? b.id === 'online' : true);
  const single = blocks.length === 1;
  return (
  <section id="servicos" style={{ background: 'var(--lm-charcoal)', padding: '100px 0' }}>
    <W>
      <div className="rv" style={{ textAlign: 'center', marginBottom: 48, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
        <Brow>{tx('Serviços', 'Services')}</Brow>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', marginBottom: 14 }}>
          {tx(
          <>Escolha um serviço. <span style={{ color: 'var(--lm-green)' }}>Ou tenha tudo.</span></>,
          <>Online coaching <span style={{ color: 'var(--lm-green)' }}>that works.</span></>
        )}
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.65, color: 'var(--t2)' }}>
          {tx(
          <>Cada serviço resolve uma parte do seu corpo. O plano <strong style={{ color: 'var(--lm-green-glow)' }}>ÁPICE</strong> conecta todos em um único acompanhamento.</>,
          <>100% remote coaching with method, data and direct support, built around your goals.</>
        )}
        </p>
      </div>
      {single ? (
        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18, maxWidth: 460, margin: '0 auto', alignItems: 'stretch' }}>
          {blocks.map((b) => <ServiceCard key={b.id} block={b} />)}
        </div>
      ) : (
        <div className="svc-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 1040, margin: '0 auto', alignItems: 'stretch' }}>
          <div className="svc-stack" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 18 }}>
            <ServiceCard block={SERVICE_BLOCKS().find((b) => b.id === 'avaliacao')} compact />
            <ServiceCard block={SERVICE_BLOCKS().find((b) => b.id === 'massoterapia')} compact />
          </div>
          <ServiceCard block={SERVICE_BLOCKS().find((b) => b.id === 'online')} />
          <ServiceCard block={SERVICE_BLOCKS().find((b) => b.id === 'apice')} />
        </div>
      )}
    </W>
  </section>
  );
};


// ─── GARANTIA ────────────────────────────────────────────

const GarantiaSection = () =>
<section style={{ background: 'var(--lm-bone)', padding: '100px 0' }}>
    <W>
      <div className="rv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Brow inv>Garantia Incondicional</Brow>
        <div style={{ width: 148, height: 148, borderRadius: '50%', border: '1.5px solid var(--lm-green-deep)', outline: '1px solid rgba(0,166,98,.18)', outlineOffset: 6, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 40, gap: 6, boxShadow: '0 0 48px rgba(0,166,98,.1)' }}>
          <Ic.shield s={38} c="var(--lm-green-deep)" />
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lm-green-deep)', lineHeight: 1.4, textAlign: 'center' }}>GARANTIA<br />7 DIAS<br />INCONDICIONAL</div>
        </div>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.1, color: 'var(--tinv)', letterSpacing: '-0.02em', marginBottom: 20, maxWidth: 640, textWrap: 'balance' }}>
          Eu não vendo promessa. <span style={{ color: 'var(--lm-green-deep)' }}>Vendo método.</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.8vw,17px)', lineHeight: 1.75, color: '#2e2e36', maxWidth: 580, marginBottom: 20 }}>
          Se nos primeiros 7 dias você sentir que o acompanhamento não é o que descrevi nesta página — basta me mandar uma mensagem. Devolvo 100% do seu investimento. Sem letra miúda, sem perguntas constrangedoras, sem burocracia.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, color: '#1a1a1e', marginBottom: 10 }}>O risco é meu. A decisão é sua.</p>
        <p style={{ fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontWeight: 500, fontSize: 19, color: 'var(--lm-green-deep)' }}>— Davi Rodrigues, idealizador da Ápice</p>
      </div>
    </W>
  </section>;


// ─── FAQ ─────────────────────────────────────────────────

const FAQItem = ({ item, open, toggle }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--lm-graphite)' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', background: 'transparent', border: 'none', textAlign: 'left', gap: 20, cursor: 'pointer' }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 'clamp(15px,1.7vw,17px)', color: open || hov ? 'var(--lm-pearl)' : 'var(--t2)', transition: 'color 200ms', lineHeight: 1.4 }}>{item.q}</span>
        <div style={{ flexShrink: 0, transition: 'transform 250ms ease', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>
          <Ic.plus s={18} c="var(--lm-green)" />
        </div>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '400px' : '0', transition: 'max-height 280ms ease', paddingBottom: open ? 24 : 0 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.75, color: 'var(--t2)', maxWidth: '65ch' }}>{item.a}</p>
      </div>
    </div>);

};

const LocationSection = () => {
  const MAPS_URL = 'https://www.google.com/maps/place/doca+aguas+claras/data=!4m2!3m1!1s0x935a339f060136b7:0x794310e164f836ce?sa=X&ved=1t:242&ictx=111';
  const EMBED_URL = 'https://www.google.com/maps?q=doca+aguas+claras+brasilia&z=16&output=embed';
  return (
    <section id="localizacao" style={{ background: 'var(--lm-black)', padding: '100px 0' }}>
      <W>
        <div className="rv" style={{ textAlign: 'center', marginBottom: 48, maxWidth: 640, margin: '0 auto 48px' }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Nosso estúdio em <span style={{ color: 'var(--lm-green)' }}>Águas Claras</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.65, color: 'var(--t2)' }}>
            É aqui que a experiência presencial acontece. Clique no mapa para abrir a rota no Google Maps.
          </p>
        </div>

        <div className="rv d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, alignItems: 'stretch' }}>
          {/* Card de informações */}
          <div style={{ background: 'var(--lm-charcoal)', border: '1px solid var(--lm-graphite)', borderRadius: 16, padding: '32px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: 'rgba(0,214,122,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--lm-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lm-mist)', marginBottom: 4 }}>Endereço</p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 17, color: 'var(--lm-pearl)', lineHeight: 1.4 }}>Doca · Águas Claras</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'var(--t2)', marginTop: 4 }}>Brasília · DF</p>
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--lm-graphite)' }} />
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start' }}>
              <Btn size="sm" pulse style={{ borderRadius: 999, padding: '12px 24px', fontSize: 14, fontWeight: 600 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lm-black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Ver rota no Google Maps
              </Btn>
            </a>
          </div>

          {/* Mapa clicável */}
          <a href={MAPS_URL} target="_blank" rel="noreferrer"
            style={{ position: 'relative', display: 'block', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--lm-graphite)', minHeight: 320, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
            <iframe src={EMBED_URL} title="Mapa — Estúdio Ápice Águas Claras"
              style={{ width: '100%', height: '100%', minHeight: 320, border: 0, filter: 'grayscale(0.2) contrast(1.05)', pointerEvents: 'none', display: 'block' }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            {/* overlay transparente captura o clique e leva ao link */}
            <div style={{ position: 'absolute', inset: 0, cursor: 'pointer', background: 'transparent' }}>
              <div style={{ position: 'absolute', right: 14, bottom: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'rgba(11,11,13,0.82)', border: '1px solid var(--lm-graphite)', backdropFilter: 'blur(6px)' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--lm-pearl)' }}>Abrir no Google Maps</span>
                <Ic.arr s={13} c="var(--lm-green)" />
              </div>
            </div>
          </a>
        </div>
      </W>
    </section>
  );
};

const FAQSection = ({ openIdx, setOpenIdx }) => {
  const FAQ_ITEMS = [
  { q: tx('O que torna a Ápice diferente de uma consultoria comum?',
    'What makes Ápice different from a regular coaching service?'),
    a: tx('A maioria entrega uma planilha de treino e te deixa sozinho. A Ápice conecta treino, nutrição, avaliação física e recuperação em um único sistema, com o Time Ápice acompanhando a sua evolução de perto. Você não contrata um profissional solto, entra em um ecossistema que pensa o seu corpo por inteiro.',
    'Most services hand you a training spreadsheet and leave you on your own. Ápice connects training, nutrition, physical assessment and recovery into a single system, with Team Ápice tracking your progress closely. You don\'t hire a single professional — you join an ecosystem that thinks about your whole body.') },
  { q: tx('Vou receber um treino genérico ou algo feito para mim?',
    'Will I get a generic plan or something built for me?'),
    a: tx('Feito para você, sempre. Cada protocolo nasce da sua anamnese, dos seus objetivos e da sua avaliação física e é ajustado continuamente conforme os seus dados evoluem. Nada de ficha copiada que poderia ser de qualquer pessoa.',
    "Built for you, always. Every protocol comes from your anamnesis, your goals and your physical assessment — and is continuously adjusted as your data evolves. No copy-paste sheet that could belong to anyone.") },
  { q: tx('Preciso de academia ou equipamentos para treinar?',
    'Do I need a gym or equipment to train?'),
    a: tx('Não necessariamente. O treino é montado de acordo com a sua realidade, academia completa, espaço em casa ou poucos equipamentos. O que importa é a estratégia por trás de cada sessão, não a quantidade de máquinas.',
    'Not necessarily. The training is built around your reality — a full gym, a space at home or minimal equipment. What matters is the strategy behind each session, not the number of machines.') },
  { q: tx('Com que frequência meu treino e plano são ajustados?',
    'How often are my training and plan adjusted?'),
    a: tx('De forma contínua. A cada reavaliação revisamos carga, volume e nutrição com base nos seus resultados reais. Você nunca fica preso ao mesmo treino por meses, a periodização evolui junto com você.',
    'Continuously. At each re-assessment we review load, volume and nutrition based on your real results. You never get stuck on the same workout for months — the periodization evolves with you.') },
  { q: tx('E se eu tiver pouca constância ou uma rotina apertada?',
    "What if I struggle with consistency or have a tight schedule?"),
    a: tx('É exatamente para isso que existe acompanhamento. O plano é desenhado para caber na sua rotina, e o Time Ápice está junto para manter você no trilho nos dias difíceis. Constância deixa de depender só da sua força de vontade.',
    "That's exactly what coaching is for. The plan is designed to fit your routine, and Team Ápice is there to keep you on track on the hard days. Consistency stops depending only on your willpower.") },
  { q: tx('Como faço para começar?',
    'How do I get started?'),
    a: tx('Clique em qualquer botão "Quero conhecer os planos". A partir daí entendemos o seu objetivo numa conversa rápida e te apresentamos o plano que mais faz sentido para você entrar para a comunidade Ápice. Simples assim.',
    'Click any "I want to see the plans" button. From there we understand your goal in a quick conversation and present the plan that makes the most sense for you to join the Ápice community. It\'s that simple.') }];

  return (
    <section id="faq" style={{ background: 'var(--lm-black)', padding: '100px 0' }}>
    <W>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em' }}>
            {tx('Dúvidas?', 'Questions?')} <span style={{ color: 'var(--lm-green)' }}>{tx('Respostas.', 'Answers.')}</span>
          </h2>
        </div>
        <div className="rv">
          {FAQ_ITEMS.map((item, i) =>
            <FAQItem key={i} item={item} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />
            )}
        </div>
      </div>
    </W>
  </section>);

};


// ─── CTA FINAL ───────────────────────────────────────────

const CTAFinalSection = () =>
<section style={{ background: 'linear-gradient(180deg,var(--lm-black) 0%,var(--lm-charcoal) 100%)', padding: '120px 0' }}>
    <W>
      <div className="rv" style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,54px)', lineHeight: 1.08, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', marginBottom: 20, textWrap: 'balance' }}>
          {tx(
          <>Você pode continuar somando profissionais soltos. Ou pode entrar num sistema que pensa o seu corpo <span style={{ color: 'var(--lm-green)' }}>por inteiro.</span></>,
          <>You can keep stacking disconnected professionals. Or you can step into a system that thinks about your body <span style={{ color: 'var(--lm-green)' }}>as a whole.</span></>
        )}
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.7, color: 'var(--t2)', marginBottom: 12, maxWidth: 560, margin: '0 auto 48px' }}>
          {tx('Por mais quanto tempo você vai pagar caro pelo barato?',
        'For how much longer will you pay a high price for the cheap option?')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <Btn size="xl" pulse className="cta-final-btn" onClick={() => window.apiceCTA()}>
            <Ic.msg s={22} c="var(--lm-black)" />
            {tx('Quero entrar para a Ápice', 'I want to join Ápice')}
            <Ic.arr s={18} c="var(--lm-black)" />
          </Btn>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'var(--lm-mist)' }}>
          {tx('Atendimento direto com o Time Ápice · Resposta em até 24h · Sem robô, sem funil de vendedor',
        'Direct contact with Team Apex · Reply within 24h · No bots, no sales funnel')}
        </p>
      </div>
    </W>
  </section>;


// ─── PS BLOCK ─────────────────────────────────────────────

const PSSection = () => {
  const PS = [
  'Se você leu até aqui, é porque alguma coisa fez sentido. Provavelmente o cansaço de tentar resolver seu corpo em pedaços. Esse cansaço é o sinal mais honesto de que tá na hora de mudar de modelo.',
  'A Ápice não é pra todo mundo. É pra quem entendeu que corpo de verdade exige método, paciência estratégica e alguém competente conduzindo. Se você é essa pessoa, a porta tá aberta.',
  'Lembra: a garantia é de 7 dias incondicional. O risco é meu. Você entra, testa o sistema por uma semana, e se não for o que prometi — devolvo cada centavo, sem perguntas.',
  'E se você entrar até 30 de abril, leva o bônus exclusivo do mês junto com seu plano. Depois disso, ele expira. Sem prorrogação.'];

  return (
    <section style={{ background: 'var(--lm-charcoal)', padding: '48px 0', borderTop: '1px solid var(--lm-graphite)' }}>
      <W style={{ maxWidth: 700 }}>
        {PS.map((text, i) =>
        <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.8, color: 'var(--lm-mist)', marginBottom: 14 }}>
            <span style={{ color: 'var(--lm-green)', fontWeight: 600 }}>PS{['', '¹', '²', '³'][i]} — </span>{text}
          </p>
        )}
      </W>
    </section>);

};

// ─── FOOTER ───────────────────────────────────────────────

const FooterSection = () =>
<footer style={{ background: 'var(--lm-charcoal)', borderTop: '1px solid var(--lm-graphite)', padding: '64px 0 40px' }}>
    <W>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 90" fill="none" style={{ height: 28, width: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="gfoot" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D67A" />
              <stop offset="100%" stopColor="#3DEDA4" />
            </linearGradient>
          </defs>
          <circle cx="45" cy="45" r="36" stroke="url(#gfoot)" strokeWidth="1.2" fill="none" />
          <circle cx="45" cy="25" r="6.5" fill="none" stroke="url(#gfoot)" strokeWidth="1.2" />
          <line x1="45" y1="31.5" x2="45" y2="52" stroke="url(#gfoot)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="45" y1="36" x2="36" y2="44" stroke="url(#gfoot)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="45" y1="36" x2="54" y2="44" stroke="url(#gfoot)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="45" y1="52" x2="36" y2="60" stroke="url(#gfoot)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="45" y1="52" x2="54" y2="60" stroke="url(#gfoot)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="98" y1="18" x2="98" y2="72" stroke="#2a2a32" strokeWidth="1" />
          <text x="118" y="52" fontFamily="'Raleway','Montserrat',sans-serif" fontWeight="300" fontSize="26" letterSpacing="14" fill="#F4F4F6">ÁPICE</text>
          <text x="119" y="68" fontFamily="'Inter',sans-serif" fontWeight="400" fontSize="8" letterSpacing="5" fill="#00D67A"></text>
        </svg>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.7, color: 'var(--lm-mist)', maxWidth: 280 }}>
            {tx('Ecossistema integrado de treinamento, avaliação física, performance e massoterapia esportiva.',
          'Integrated ecosystem of training, physical assessment, performance and sports.')}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lm-stone)', marginBottom: 16 }}>
            {tx('Serviços', 'Services')}
          </p>
          {(getLang() === 'en'
            ? ['Online']
            : [tx('Online', 'Online'), 'ÁPICE', tx('Avaliação Física', 'Physical Assessment'), tx('Massoterapia', 'Massage Therapy')]
          ).map((s) =>
        <p key={s} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'var(--lm-mist)', marginBottom: 8 }}>{s}</p>
        )}
        </div>
        <div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lm-stone)', marginBottom: 16 }}>
            {tx('O Método', 'Get Started')}
          </p>
          {(getLang() === 'en'
            ? ['100% remote · worldwide', 'Custom plan for your goal', 'Reply within 24h']
            : ['Avaliação física', 'Treino periodizado', 'Massoterapia', 'Acompanhamento nutricional']
          ).map((item) => (
            <p key={item} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'var(--lm-mist)', marginBottom: 6 }}>{item}</p>
          ))}
          <div style={{ marginTop: 20 }}>
            <Btn size="sm" onClick={() => window.open(`${WA_URL}?text=${encodeURIComponent(tx('Oi, quero saber mais sobre os planos da Ápice', 'Hi, I want to know more about Ápice plans'))}`, '_blank', 'noopener')}>
              <Ic.msg s={14} c="var(--lm-black)" /> WhatsApp
            </Btn>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--lm-graphite)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'var(--lm-mist)' }}>© 2026 Ápice Performance System · Team Apex</p>
        <p style={{ fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontSize: 13, color: 'var(--lm-stone)' }}>
          {tx('No ápice do que seu corpo pode alcançar.', 'At the apex of what your body can reach.')}
        </p>
      </div>
    </W>
  </footer>;


// ─── FLOATERS ────────────────────────────────────────────

const FloatingWA = () =>
<a href={WA_URL} target="_blank" rel="noreferrer" className="wa-pulse dsk"
style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 150, width: 48, height: 48, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </a>;


const StickyMobileCTA = () =>
<div className="sticky-cta mob">
    <Btn size="lg" onClick={() => window.apiceCTA()} style={{ width: '100%', justifyContent: 'center' }}>
      <Ic.msg s={18} c="var(--lm-black)" /> {tx('Conhecer os planos →', 'I want access to consulting →')}
    </Btn>
  </div>;


Object.assign(window, { EstatisticasSection, DepoimentosSection, OfertaSection, GarantiaSection, LocationSection, FAQSection, CTAFinalSection, PSSection, FooterSection, FloatingWA, StickyMobileCTA });