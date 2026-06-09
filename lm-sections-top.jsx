// lm-sections-top.jsx

const HEADLINES = {
  A: { tag: 'Tráfego Frio',   top: () => tx('O SEU CORPO', 'YOUR BODY'),         accent: () => tx('no seu Ápice', 'at its Apex') },
  B: { tag: 'Tráfego Quente', top: () => tx('TREINE DE VERDADE', 'TRAIN FOR REAL'), accent: () => tx('com método premium', 'with a premium method') },
  C: { tag: 'Alto Ticket',    top: () => tx('PERFORMANCE REAL', 'REAL PERFORMANCE'), accent: () => tx('sem ficha genérica', 'no cookie-cutter plan') }
};

const NavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 24px', height: 64, background: scrolled ? 'rgba(11,11,13,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--lm-graphite)' : 'none', transition: 'all 300ms ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 90" fill="none" style={{height:36,width:'auto',display:'block'}}>
          <defs>
            <linearGradient id="gnav" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D67A"/>
              <stop offset="100%" stopColor="#3DEDA4"/>
            </linearGradient>
          </defs>
          <circle cx="45" cy="45" r="36" stroke="url(#gnav)" strokeWidth="1.2" fill="none"/>
          <circle cx="45" cy="25" r="6.5" fill="none" stroke="url(#gnav)" strokeWidth="1.2"/>
          <line x1="45" y1="31.5" x2="45" y2="52" stroke="url(#gnav)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="45" y1="36" x2="36" y2="44" stroke="url(#gnav)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="45" y1="36" x2="54" y2="44" stroke="url(#gnav)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="45" y1="52" x2="36" y2="60" stroke="url(#gnav)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="45" y1="52" x2="54" y2="60" stroke="url(#gnav)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="98" y1="18" x2="98" y2="72" stroke="#2a2a32" strokeWidth="1"/>
          <text x="118" y="52" fontFamily="'Raleway','Montserrat',sans-serif" fontWeight="300" fontSize="26" letterSpacing="14" fill="#F4F4F6">ÁPICE</text>
          <text x="119" y="68" fontFamily="'Inter',sans-serif" fontWeight="400" fontSize="8" letterSpacing="5" fill="#00D67A">{getLang() === 'en' ? 'BODY · METHOD · RESULT' : ''}</text>
        </svg>
      </div>
      <div className="dsk" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {[[tx('Método','Method'), '#metodo'], [tx('Serviços','Services'), '#servicos'], [tx('Depoimentos','Reviews'), '#depoimentos'], ...(getLang() !== 'en' ? [['FAQ', '#faq']] : [])].map(([l, href]) =>
        <a key={href} href={href} style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--lm-mist)', transition: 'color 200ms' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lm-pearl)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lm-mist)'}>{l}</a>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LangToggle />
        <Btn size="sm" onClick={() => window.apiceCTA()} className="dsk">
          {tx('Quero ter acesso a consultoria', 'I want access to coaching')}
        </Btn>
      </div>
    </nav>);

};

const HeroSection = ({ headline }) => (
  <section id="hero" style={{
    background: 'radial-gradient(ellipse at 50% 40%, #0f1a14 0%, var(--lm-black) 55%)',
    padding: '120px 0 80px', minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', textAlign: 'center'
  }}>
    {/* soft green glow behind headline */}
    <div style={{ position: 'absolute', top: '38%', left: '50%', width: 620, height: 620, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,214,122,.10) 0%,transparent 65%)', pointerEvents: 'none' }} />
    {/* faint grid hint at bottom */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 280, background: 'linear-gradient(180deg, transparent 0%, rgba(0,214,122,.04) 100%)', pointerEvents: 'none' }} />

    <W style={{ width: '100%', position: 'relative', zIndex: 1 }}>
      <div className="rv" style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

        {/* Logo monogram + Wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none" style={{ width: 'clamp(64px,9vw,84px)', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="gHero" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00D67A"/>
                <stop offset="100%" stopColor="#3DEDA4"/>
              </linearGradient>
            </defs>
            <circle cx="45" cy="45" r="36" stroke="url(#gHero)" strokeWidth="1.6" fill="none"/>
            <circle cx="45" cy="25" r="6.5" fill="none" stroke="url(#gHero)" strokeWidth="1.6"/>
            <line x1="45" y1="31.5" x2="45" y2="52" stroke="url(#gHero)" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="45" y1="36" x2="36" y2="44" stroke="url(#gHero)" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="45" y1="36" x2="54" y2="44" stroke="url(#gHero)" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="45" y1="52" x2="36" y2="60" stroke="url(#gHero)" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="45" y1="52" x2="54" y2="60" stroke="url(#gHero)" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <div style={{ fontFamily: "'Raleway','Montserrat',sans-serif", fontWeight: 300, fontSize: 'clamp(22px,3vw,28px)', letterSpacing: '0.42em', color: 'var(--lm-pearl)', textIndent: '0.42em' }}>
            ÁPICE
          </div>
        </div>

        {/* Pill badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 18px 8px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'var(--lm-pearl)',
          backdropFilter: 'blur(8px)'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lm-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="12" cy="12" r="1" fill="var(--lm-green)"/>
          </svg>
          <span>Performance Premium</span>
        </div>

        {/* Headline */}
        <h1 style={{ margin: 0, color: 'var(--lm-pearl)', textWrap: 'balance' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Sora',sans-serif", fontWeight: 800,
            fontSize: 'clamp(44px,9vw,96px)', letterSpacing: '-0.03em',
            lineHeight: 1.02
          }}>
            {headline.top()}
          </span>
          <span style={{
            display: 'block', marginTop: 10,
            fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(40px,8vw,84px)', letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--lm-green-glow)'
          }}>
            {headline.accent()}
          </span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.6,
          color: 'var(--t2)', maxWidth: 560, margin: 0
        }}>
          {tx(
            'Treinamento, avaliação física, recuperação e nutrição em um único acompanhamento, conduzido sob um ecossistema que enxerga seu corpo como um todo.',
            'Training, physical assessment and nutrition in a single program, delivered through an ecosystem that sees your body as a whole.'
          )}
        </p>

        {/* CTA */}
        <div style={{ marginTop: 8 }}>
          <Btn size="sm" pulse onClick={() => window.apiceCTA()}
            style={{ borderRadius: 999, padding: '12px 26px', fontSize: 14, fontWeight: 600 }}>
            {tx('Quero conhecer os planos', 'I want to see the plans')}
            <Ic.arr s={14} c="var(--lm-black)" />
          </Btn>
        </div>

        {/* Social proof line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          {[0,1,2,3,4].map(i => <Ic.star key={i} s={13} c="var(--lm-green)" />)}
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'var(--lm-mist)', marginLeft: 6 }}>
            {tx('+300 alunos acompanhados', '+300 clients coached')}
          </span>
        </div>

      </div>
    </W>
  </section>
);


const ObjetivoSection = () => (
  <section style={{ background: 'var(--lm-black)', padding: '80px 24px', position: 'relative' }}>
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}>
      {/* Badge with dumbbell */}
      <div className="rv" style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--lm-charcoal)',
        border: '1px solid var(--lm-graphite)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--lm-pearl)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 6.5l11 11"/>
          <path d="M21 21l-1-1"/>
          <path d="M3 3l1 1"/>
          <path d="M18 22l4-4"/>
          <path d="M2 6l4-4"/>
          <path d="M3 10l7-7"/>
          <path d="M14 21l7-7"/>
        </svg>
      </div>

      {/* Headline */}
      <h2 className="rv d1" style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(19px,5vw,48px)', lineHeight: 1.2,
        color: 'var(--lm-pearl)', letterSpacing: '-0.02em',
        margin: 0
      }}>
        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
          {tx('Acesso completo ao ecossistema', 'Full access to the ecosystem online')}
        </span>
        {getLang() !== 'en' && (
          <span style={{ display: 'block' }}>de forma online ou presencial</span>
        )}
      </h2>

      {/* Subheading */}
      <p className="rv d2" style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(14px,2vw,18px)', lineHeight: 1.5,
        color: 'var(--t2)', margin: 0, maxWidth: 540
      }}>
        {tx('Planos de treinos personalizados e individualizados', 'Personalized and individualized training plans')}
      </p>
    </div>
  </section>
);

const CountdownSection = ({ timeLeft, show }) => {
  if (!show) return null;
  return (
    <div style={{ background: 'var(--lm-charcoal)', borderTop: '2px solid var(--lm-green)', borderBottom: '1px solid var(--lm-graphite)', padding: '16px 24px' }}>
      <W style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ic.clock s={14} c="var(--lm-mist)" />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lm-mist)' }}>BÔNUS DE MAIO EXPIRA EM</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[['dias', timeLeft.d], ['h', timeLeft.h], ['min', timeLeft.m], ['s', timeLeft.s]].map(([label, val], i) =>
          <React.Fragment key={label}>
              {i > 0 && <span style={{ color: 'var(--lm-stone)', fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1, margin: '0 2px' }}>:</span>}
              <div style={{ textAlign: 'center', minWidth: 34 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 'clamp(16px,3vw,26px)', color: 'var(--lm-green)', lineHeight: 1 }}>{String(val).padStart(2, '0')}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: 'var(--lm-stone)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{label}</div>
              </div>
            </React.Fragment>
          )}
        </div>
        <Pill v="bonus">Bônus de Maio</Pill>
      </W>
    </div>);

};

const DorSection = () => {
  const DOR_ITEMS = [
    tx('Pagou consultoria online e recebeu uma planilha que poderia ser de qualquer pessoa.',
       'Paid for online coaching and got a spreadsheet that could belong to anyone.'),
    tx('Treinou com personal genérico que repete o mesmo treino há 6 meses.',
       'Trained with a generic coach who has repeated the same workout for 6 months.'),
    tx('Fez avaliação física e saiu do consultório com dobras anotadas, mas sem direção real.',
       'Got a physical assessment and walked out with measurements written down, but no real direction.'),
    tx('Já gastou mais do que devia em soluções soltas que nunca conversaram entre si.',
       'Spent more than you should on disconnected solutions that never talked to each other.'),
  ];
  return (
  <section id="dor" style={{ background: 'var(--lm-charcoal)', padding: '100px 0' }}>
    <W>
      <div className="rv" style={{ maxWidth: 680, margin: '0 auto 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          {tx('A frustração não é sua.', "The frustration isn't yours.")} <span style={{ color: 'var(--lm-green)' }}>{tx('É do modelo.', "It's the program's.")}</span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.7, color: 'var(--t2)' }}>
          {tx(
            'Você não precisa de mais um profissional. Você precisa de um sistema que conecta os profissionais certos em torno do seu corpo.',
            "You don't need another professional. You need a system that connects the right professionals around your body."
          )}
        </p>
      </div>
      <div className="dor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 760, margin: '0 auto' }}>
        {DOR_ITEMS.map((item, i) =>
      <div key={i} className={`rv d${i % 4 + 1}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', background: 'var(--lm-black)', borderRadius: 10, border: '1px solid var(--lm-graphite)' }}>
            <div style={{ flexShrink: 0, marginTop: 2, opacity: .75 }}><Ic.x s={17} c="var(--lm-alert)" /></div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.6, color: 'var(--t2)' }}>{item}</span>
          </div>
      )}
      </div>
    </W>
  </section>
  );
};


const SolCard = ({ item, delay }) => {
  const [hov, setHov] = React.useState(false);
  const IC = Ic[item.icon];
  return (
    <div className={`rv d${delay}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ background: 'var(--lm-charcoal)', borderRadius: 16, padding: 32, border: `1px solid ${hov ? 'var(--lm-green)' : 'var(--lm-graphite)'}`, transition: 'all 300ms ease', transform: hov ? 'translateY(-4px)' : 'none', boxShadow: hov ? '0 16px 48px rgba(0,0,0,.4)' : 'none' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,214,122,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <IC s={24} c="var(--lm-green)" />
      </div>
      <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 19, color: 'var(--lm-pearl)', marginBottom: 10, lineHeight: 1.3 }}>{item.title}</h3>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.7, color: 'var(--t2)' }}>{item.desc}</p>
    </div>);

};

const TeamSection = () => (
  <section id="time" style={{ background: 'var(--lm-charcoal)', padding: '100px 0' }}>
    <W>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'center' }}>
        {/* Texto */}
        <div className="rv">
          <Brow>{tx('Quem é a Ápice', 'Who is Apex')}</Brow>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', marginBottom: 22, textWrap: 'balance' }}>
            {tx(
              <>Mais que um time. <span style={{ color: 'var(--lm-green)' }}>Um Time Ápice.</span></>,
              <>More than a team. <span style={{ color: 'var(--lm-green)' }}>Team Apex.</span></>
            )}
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.75, color: 'var(--t2)', marginBottom: 18, maxWidth: 520 }}>
            {tx(
              'A Ápice nasceu para resolver o que estava quebrado: profissionais soltos cuidando do seu corpo em pedaços. Aqui, treinadores, avaliação física e nutrição operam como um sistema único, pensando o seu resultado por inteiro.',
              'Apex was born to fix what was broken: disconnected professionals taking care of your body in pieces. Here, coaches, physical assessment and nutrition operate as a single system thinking about your results as a whole.'
            )}
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.75, color: 'var(--t2)', maxWidth: 520 }}>
            {tx(
              'O Time Ápice é formado por profissionais que vivem performance todos os dias e que tratam o seu progresso como missão pessoal.',
              'Team Apex is made of professionals who live performance every day and who treat your progress as a personal mission.'
            )}
          </p>
          <div style={{ marginTop: 28 }}>
            <Btn size="sm" pulse onClick={() => window.apiceCTA()} style={{ borderRadius: 999, padding: '12px 26px', fontSize: 14, fontWeight: 600 }}>
              {tx('Fazer parte do Time Ápice', 'Join Team Apex')}
              <Ic.arr s={14} c="var(--lm-black)" />
            </Btn>
          </div>
        </div>
        {/* Imagem do time */}
        <div className="rv d2" style={{ position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--lm-graphite)', maxWidth: 440, margin: '0 auto', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <img src="uploads/pasted-1781045608765-0.png" alt={tx('Time Ápice', 'Team Apex')}
              style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(11,11,13,0.85) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 22, bottom: 20, right: 22 }}>
              <p style={{ fontFamily: "'Raleway','Montserrat',sans-serif", fontWeight: 300, fontSize: 18, letterSpacing: '0.4em', color: 'var(--lm-pearl)', textIndent: '0.4em' }}>ÁPICE</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--lm-green)', marginTop: 4 }}>{tx('Time Ápice', 'Team Apex')}</p>
            </div>
          </div>
        </div>
      </div>
    </W>
  </section>
);

const SolucaoSection = () => {
  const SOL_ITEMS = [
    { icon: 'target', enOnly: true,
      title: tx('Anamnese Online', 'Online Anamnesis'),
      desc: tx(
        'Sua avaliação começa pelo celular: medidas e composição estimadas por fotos e parâmetros de mudança física, acompanhadas mês a mês. Você vê a evolução sem sair de casa.',
        'Your assessment starts on your phone: measurements and composition estimated from photos and physical-change parameters, tracked month over month. You see your progress without leaving home.'
      ) },
    { icon: 'shield', ptOnly: true,
      title: tx('Plano nutricional', 'Nutrition plan'),
      desc: tx(
        'Estratégia alimentar pensada para o seu objetivo e a sua rotina, integrada ao treino. Sem dieta genérica: o que você come trabalha a favor do seu resultado.',
        'A nutrition strategy designed for your goal and routine, integrated with training. No generic diet: what you eat works in favor of your result.'
      ) },
    { icon: 'zap',
      title: tx('Treino', 'Training'),
      desc: tx(
        'Protocolo periodizado, ajustado continuamente aos seus dados. Sem ficha genérica, sem estagnação. Cada sessão conta porque foi pensada.',
        'A periodized protocol continuously adjusted to your data. No cookie-cutter sheets, no plateaus. Every session counts because it was thought through.'
      ) },
    { icon: 'heart', ptOnly: true,
      title: tx('Massoterapia', 'Massage Therapy'),
      desc: tx(
        'Massoterapia esportiva parte do protocolo, não de fora dele. Resultado vem do treino e da recuperação juntos, não de um separado do outro.',
        'Sports massage as part of the protocol, not an add-on. Results come from training and recovery together — not from one without the other.'
      ) },
    { icon: 'target', ptOnly: true,
      title: tx('Avaliação física', 'Physical assessment'),
      desc: tx(
        'Medidas, composição corporal e indicadores de força acompanhados periodicamente. Você enxerga a evolução em dados, não em achismo.',
        'Measurements, body composition and strength indicators tracked periodically. You see your progress in data — not guesswork.'
      ) },
    { icon: 'compass', enOnly: true,
      title: tx('Direção quando precisa', 'Direction when you need it'),
      desc: tx(
        'Se algo foge da minha alçada, você não fica perdido. Te encaminho ao profissional certo. Um sistema inteligente sabe os próprios limites.',
        "If anything is outside my scope, you don't get lost. I refer you to the right professional. A smart system knows its own limits."
      ) },
  ].filter(item => !(getLang() === 'en' && item.ptOnly) && !(getLang() !== 'en' && item.enOnly));
  return (
  <section id="metodo" style={{ background: 'var(--lm-black)', padding: '100px 0' }}>
    <W>
      <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', lineHeight: 1.1, color: 'var(--lm-pearl)', letterSpacing: '-0.02em', maxWidth: 620, margin: '0 auto', textWrap: 'balance' }}>
          {tx('Em vez de 4 profissionais soltos,', 'Instead of 4 disconnected professionals,')} <span style={{ color: 'var(--lm-green)' }}>{tx('um sistema integrado', 'one integrated system')}</span>
        </h2>
      </div>
      <div className={`metodo-grid ${SOL_ITEMS.length === 3 ? 'cols-3' : 'cols-2'}`}>
        {SOL_ITEMS.map((item, i) => <SolCard key={i} item={item} delay={i % 4 + 1} />)}
      </div>
    </W>
  </section>
  );
};


const BEN_IMAGES = [
  'uploads/pasted-1780335063687-0.png',
  'uploads/pasted-1780335076433-0.png',
  'uploads/pasted-1780335112181-0.png',
];

const BenefitsCarousel = () => {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = BEN_IMAGES.length;
  const go = (i) => setIdx((i + n) % n);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(p => (p + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div className="rv d2"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}>
      {/* Track */}
      <div style={{ display: 'flex', transition: 'transform 600ms cubic-bezier(.4,0,.2,1)', transform: `translateX(-${idx * 100}%)` }}>
        {BEN_IMAGES.map((src, i) => (
          <img key={i} src={src} alt={tx('Time Ápice em ação','Team Ápice in action') + ` ${i + 1}`}
            style={{ width: '100%', flexShrink: 0, aspectRatio: '4 / 5', objectFit: 'cover', display: 'block' }} />
        ))}
      </div>

      {/* Arrows */}
      <button type="button" aria-label={tx('Anterior','Previous')} onClick={() => go(idx - 1)}
        style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(11,11,13,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', fontSize: 18, lineHeight: 1 }}>‹</button>
      <button type="button" aria-label={tx('Próximo','Next')} onClick={() => go(idx + 1)}
        style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(11,11,13,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', fontSize: 18, lineHeight: 1 }}>›</button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
        {BEN_IMAGES.map((_, i) => (
          <button key={i} type="button" aria-label={`${i + 1}`} onClick={() => setIdx(i)}
            style={{ width: i === idx ? 26 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', background: i === idx ? 'var(--lm-green)' : 'rgba(255,255,255,0.55)', transition: 'all 280ms ease', padding: 0 }} />
        ))}
      </div>
    </div>
  );
};

const BeneficiosSection = () => {
  return (
  <section id="beneficios" style={{ background: 'var(--lm-bone)', padding: '100px 0' }}>
    <W>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, alignItems: 'center' }}>
        <div className="rv">
          <Brow inv>{tx('Ecossistema Ápice', 'Ápice Ecosystem')}</Brow>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,42px)', lineHeight: 1.1, color: 'var(--tinv)', letterSpacing: '-0.02em', marginBottom: 20, textWrap: 'balance' }}>
            {tx('Quatro frentes,', 'Four fronts,')} <span style={{ color: 'var(--lm-green-deep)' }}>{tx('um só resultado', 'one single result')}</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.7, color: '#2e2e36', maxWidth: 460, marginBottom: 28 }}>
            {tx(
              'Nutrição, treino, massoterapia e avaliação física trabalhando juntos, em um único acompanhamento que enxerga o seu corpo por inteiro.',
              'Nutrition, training, massage therapy and physical assessment working together, in a single program that sees your body as a whole.'
            )}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', marginBottom: 28, maxWidth: 460 }}>
            {[
              { ic: 'shield', t: tx('Nutrição', 'Nutrition') },
              { ic: 'zap', t: tx('Treino', 'Training') },
              { ic: 'heart', t: tx('Massoterapia', 'Massage therapy') },
              { ic: 'target', t: tx('Avaliação física', 'Physical assessment') },
            ].map((p, i) => {
              const IC = Ic[p.ic];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: 'rgba(0,140,80,0.10)', border: '1px solid rgba(0,140,80,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IC s={18} c="var(--lm-green-deep)" />
                  </span>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--tinv)', letterSpacing: '-0.01em' }}>{p.t}</span>
                </div>
              );
            })}
          </div>
          <a href="#servicos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--lm-green-deep)', textDecoration: 'none' }}>
            {tx('Ver nos serviços', 'See in services')} <Ic.arr s={14} c="var(--lm-green-deep)" />
          </a>
        </div>
        <BenefitsCarousel />
      </div>
    </W>
  </section>
  );
};


Object.assign(window, { NavBar, HeroSection, ObjetivoSection, TeamSection, CountdownSection, DorSection, SolucaoSection, BeneficiosSection, HEADLINES });