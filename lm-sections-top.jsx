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
    tx('Já investiu em várias soluções, mas nenhuma delas conversava entre si.',
       'Invested in several solutions, but none of them talked to each other.'),
    tx('Se esforça muito, mas sente que evolui menos do que deveria.',
       'Puts in a lot of effort, but feels like the progress is smaller than it should be.'),
    tx('Recebe informações diferentes de cada profissional e não sabe qual caminho seguir.',
       'Gets different advice from every professional and never knows which path to follow.'),
    tx('Já tentou criar uma rotina saudável, mas nunca conseguiu mantê-la por muito tempo.',
       'Has tried to build a healthy routine, but never managed to keep it for long.'),
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
              <>Mais que um time. <span style={{ color: 'var(--lm-green)' }}>Um espaço da Ápice.</span></>,
              <>More than a team. <span style={{ color: 'var(--lm-green)' }}>An Apex space.</span></>
            )}
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.75, color: 'var(--t2)', marginBottom: 18, maxWidth: 520 }}>
            {tx(
              'O estúdio Ápice nasceu para resolver o que estava quebrado. Profissionais soltos, com diferentes opiniões e sem metodologia, cuidando do seu corpo em pedaços. Aqui, nosso sistema único refaz a sua análise do zero. Treinadores, nutricionistas, recovery e acompanhamento de desempenho físico operam lado a lado, de forma única, dentro de um método validado.',
              'The Apex studio was born to fix what was broken. Disconnected professionals, with different opinions and no methodology, taking care of your body in pieces. Here, our single system rebuilds your analysis from zero. Coaches, nutritionists, recovery and physical performance tracking operate side by side, as one, within a validated method.'
            )}
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.75, color: 'var(--t2)', maxWidth: 520 }}>
            {tx(
              'O Time Ápice é formado por profissionais que vivem a performance diariamente e que tratam o seu progresso como uma missão pessoal. Sabendo te guiar do zero ao ÁPICE.',
              'Team Apex is made of professionals who live performance every day and who treat your progress as a personal mission. Guiding you from zero to your APEX.'
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
            <img src="uploads/pasted-1787006121677-0.png" alt={tx('Time Ápice', 'Team Apex')}
              style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
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
      title: tx('Protocolo de treino + dieta', 'Training + diet protocol'),
      desc: tx(
        'Acompanhamento online completo com protocolo de treino e planilha alimentar personalizados. Estratégia integrada para potencializar sua performance e resultados, com ajustes contínuos de acordo com sua evolução.',
        'Complete online coaching with a personalized training protocol and meal plan. An integrated strategy to boost your performance and results, with continuous adjustments as you evolve.'
      ) },
    { icon: 'zap',
      title: tx('Plano Ápice', 'Ápice Plan'),
      desc: tx(
        'O combo completo para quem busca máxima evolução. Inclui acompanhamento online de treino e dieta + avaliação física premium. Dados precisos, estratégia integrada e resultados reais.',
        'The complete combo for those seeking maximum progress. Includes online training and diet coaching + premium physical assessment. Precise data, integrated strategy and real results.'
      ) },
    { icon: 'heart', ptOnly: true,
      title: tx('Avaliação física premium', 'Premium physical assessment'),
      desc: tx(
        'Análise completa do seu corpo e desempenho: composição corporal (bioimpedância, dobras e circunferências), avaliação postural, testes de força e desempenho, VO₂ máx, pressão arterial, saturação de oxigênio e muito mais. Relatório completo para orientar seu plano com precisão.',
        'A complete analysis of your body and performance: body composition (bioimpedance, skinfolds and circumferences), postural assessment, strength and performance tests, VO₂ max, blood pressure, oxygen saturation and much more. A full report to guide your plan with precision.'
      ) },
    { icon: 'target', ptOnly: true,
      title: tx('Recovery', 'Recovery'),
      desc: tx(
        'Protocolos de recuperação para otimizar seu desempenho e bem-estar: massoterapia desenvolvida por técnicas de liberação miofascial, massagem terapêutica, eventual terapia e alongamentos específicos.',
        'Recovery protocols to optimize your performance and well-being: massage therapy built on myofascial release techniques, therapeutic massage, occasional therapy and specific stretching.'
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
  'uploads/pasted-1787006837919-0.png',
  'uploads/pasted-1787006846039-0.png',
  'uploads/pasted-1787007194123-0.png',
  'uploads/pasted-1780335063687-0.png',
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
            {tx('Alta performance,', 'High performance,')} <span style={{ color: 'var(--lm-green-deep)' }}>{tx('medida de verdade', 'truly measured')}</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.7vw,17px)', lineHeight: 1.7, color: '#2e2e36', maxWidth: 460, marginBottom: 28 }}>
            {tx(
              'Avaliação física premium, treino e recovery em um único acompanhamento. Cada decisão é guiada por dados reais do seu corpo, não por achismo.',
              'Premium physical assessment, training and recovery in a single program. Every decision is guided by real data from your body, not guesswork.'
            )}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', marginBottom: 28, maxWidth: 460 }}>
            {[
              { ic: 'target', t: tx('Avaliação física premium', 'Premium assessment') },
              { ic: 'zap', t: tx('Treino', 'Training') },
              { ic: 'heart', t: tx('Recovery', 'Recovery') },
              { ic: 'shield', t: tx('Alta performance', 'High performance') },
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