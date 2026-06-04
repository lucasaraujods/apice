// lm-app.jsx

const DEADLINE = new Date('2026-04-30T23:59:59');

const getTimeLeft = () => {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff % 86400000 / 3600000),
    m: Math.floor(diff % 3600000 / 60000),
    s: Math.floor(diff % 60000 / 1000)
  };
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineVariant": "A",
  "showCountdown": true,
  "ctaPulse": true
} /*EDITMODE-END*/;

const App = () => {
  useLang(); // subscribe — when language toggles, entire tree re-renders
  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft());
  const [faqOpen, setFaqOpen] = React.useState(null);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [showPanel, setShowPanel] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowPanel(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowPanel(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (key, val) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: val };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
      return next;
    });
  };

  const headline = HEADLINES[tweaks.headlineVariant] || HEADLINES.A;

  return (
    <>
      <NavBar />
      <HeroSection headline={headline} />
      <DorSection />
      <SolucaoSection />
      <TeamSection />
      {getLang() !== 'en' && <BeneficiosSection />}
      <EstatisticasSection />
      <DepoimentosSection />
      <OfertaSection />
      {getLang() !== 'en' && <LocationSection />}
      {getLang() !== 'en' && <FAQSection openIdx={faqOpen} setOpenIdx={setFaqOpen} />}
      <CTAFinalSection />
      <FooterSection />
      <FloatingWA />
      <StickyMobileCTA />
      {getLang() === 'en' && <ApiceForm />}

      {showPanel &&
      <div style={{ position: 'fixed', bottom: 88, right: 24, zIndex: 300, background: 'var(--lm-charcoal)', border: '1px solid var(--lm-graphite)', borderRadius: 14, padding: 22, width: 272, boxShadow: '0 20px 60px rgba(0,0,0,.7)', fontFamily: "'Inter',sans-serif" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--lm-pearl)' }}>Tweaks</span>
            <button onClick={() => {setShowPanel(false);window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');}} style={{ background: 'none', border: 'none', color: 'var(--lm-mist)', fontSize: 20, lineHeight: 1, padding: 0, cursor: 'pointer' }}>×</button>
          </div>

          {/* Headline A/B/C */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--lm-mist)', marginBottom: 10 }}>Variante de Headline (A/B Teste)</p>
            {['A', 'B', 'C'].map((v) =>
          <button key={v} onClick={() => setTweak('headlineVariant', v)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '9px 12px', marginBottom: 6, background: tweaks.headlineVariant === v ? 'var(--lm-green-mute)' : 'var(--lm-black)', border: `1px solid ${tweaks.headlineVariant === v ? 'var(--lm-green)' : 'var(--lm-graphite)'}`, borderRadius: 8, color: tweaks.headlineVariant === v ? 'var(--lm-green-glow)' : 'var(--t2)', fontSize: 12, textAlign: 'left', cursor: 'pointer', transition: 'all 150ms ease', gap: 8 }}>
                <span style={{ fontWeight: 700 }}>Variação {v}</span>
                <span style={{ opacity: .65, fontSize: 11 }}>{HEADLINES[v].tag}</span>
              </button>
          )}
          </div>

          {/* Countdown toggle */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--lm-mist)', marginBottom: 10 }}>Elementos</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 10 }}>
              <div onClick={() => setTweak('showCountdown', !tweaks.showCountdown)}
            style={{ width: 36, height: 20, borderRadius: 10, background: tweaks.showCountdown ? 'var(--lm-green)' : 'var(--lm-stone)', transition: 'background 200ms ease', position: 'relative', flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: 3, left: tweaks.showCountdown ? '18px' : '3px', width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 200ms ease' }} />
              </div>
              <span style={{ fontSize: 13, color: 'var(--lm-pearl)' }}>Contador regressivo</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div onClick={() => setTweak('ctaPulse', !tweaks.ctaPulse)}
            style={{ width: 36, height: 20, borderRadius: 10, background: tweaks.ctaPulse ? 'var(--lm-green)' : 'var(--lm-stone)', transition: 'background 200ms ease', position: 'relative', flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: 3, left: tweaks.ctaPulse ? '18px' : '3px', width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 200ms ease' }} />
              </div>
              <span style={{ fontSize: 13, color: 'var(--lm-pearl)' }}>Animação pulse no CTA</span>
            </label>
          </div>

          <div style={{ borderTop: '1px solid var(--lm-graphite)', paddingTop: 14 }}>
            <p style={{ fontSize: 11, color: 'var(--lm-mist)', lineHeight: 1.5 }}>Deadline: <span style={{ color: 'var(--lm-green)' }}>31/05/2026 · 23:59</span></p>
          </div>
        </div>
      }
    </>);

};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);