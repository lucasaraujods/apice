// lm-i18n.jsx — internationalization (PT-BR ↔ EN)
// Usage in components:
//   useLang();                          // subscribe to language changes (call once near top)
//   tx('Olá', 'Hello')                  // returns the right string for the current language
//   <LangToggle />                      // pill-style PT/EN toggle button

const LANG_LISTENERS = new Set();

// Decide o idioma inicial nesta ordem de prioridade:
//   1. URL  ->  ?lang=en  |  ?lang=pt   (também aceita #en / #/en e caminho /en)
//   2. Idioma salvo de uma visita anterior (localStorage)
//   3. Português (padrão)
const __readLangFromURL = () => {
  try {
    const p = new URLSearchParams(window.location.search);
    const q = (p.get('lang') || p.get('idioma') || '').toLowerCase();
    if (q === 'en' || q === 'ingles' || q === 'english') return 'en';
    if (q === 'pt' || q === 'portugues' || q === 'pt-br') return 'pt';
    const h = (window.location.hash || '').toLowerCase().replace(/[^a-z]/g, '');
    if (h === 'en') return 'en';
    if (h === 'pt') return 'pt';
    const path = (window.location.pathname || '').toLowerCase();
    if (/(^|\/)en(\/|$)/.test(path)) return 'en';
  } catch (e) {}
  return null;
};

let __lang =
  __readLangFromURL() ||
  (typeof localStorage !== 'undefined' && localStorage.getItem('apice_lang')) ||
  'pt';

const getLang = () => __lang;
const setLang = (l) => {
  if (l !== 'pt' && l !== 'en') return;
  __lang = l;
  try { localStorage.setItem('apice_lang', l); } catch (e) {}
  // update <html lang="..."> for accessibility/SEO
  try { document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'pt-BR'); } catch(e){}
  // keep the URL shareable: EN -> ?lang=en, PT -> remove the param
  try {
    const url = new URL(window.location.href);
    if (l === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', url);
  } catch (e) {}
  LANG_LISTENERS.forEach(fn => { try { fn(l); } catch(e){} });
};

const useLang = () => {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    const cb = () => force();
    LANG_LISTENERS.add(cb);
    return () => { LANG_LISTENERS.delete(cb); };
  }, []);
  return [__lang, setLang];
};

// Translation helper.  Pass the PT version first, EN second.
//   tx('Olá', 'Hello')   → 'Olá' or 'Hello' depending on current lang.
const tx = (pt, en) => __lang === 'en' ? en : pt;

// Pill-style segmented language toggle (PT · EN).  Place inside the NavBar.
const LangToggle = ({ style = {} }) => {
  const [lang, set] = useLang();
  const baseBtn = {
    background: 'transparent', border: 'none',
    color: 'var(--lm-mist)',
    fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '6px 12px', borderRadius: 999,
    cursor: 'pointer', transition: 'color 180ms ease, background 180ms ease',
    lineHeight: 1
  };
  const activeBtn = {
    ...baseBtn,
    background: 'var(--lm-green)',
    color: 'var(--lm-black)',
  };
  return (
    <div
      role="group"
      aria-label="Language switcher"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 2,
        padding: 3,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--lm-graphite)',
        borderRadius: 999,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      <button
        type="button"
        aria-pressed={lang === 'pt'}
        onClick={() => set('pt')}
        style={lang === 'pt' ? activeBtn : baseBtn}
      >
        PT
      </button>
      <button
        type="button"
        aria-pressed={lang === 'en'}
        onClick={() => set('en')}
        style={lang === 'en' ? activeBtn : baseBtn}
      >
        EN
      </button>
    </div>
  );
};

// CTA router: EN opens the lead form; PT scrolls smoothly to the services section.
const apiceCTA = () => {
  if (getLang() === 'en') {
    if (typeof window.openApiceForm === 'function') window.openApiceForm();
    return;
  }
  const el = document.getElementById('servicos');
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

Object.assign(window, { useLang, getLang, setLang, tx, LangToggle, apiceCTA });
// Set initial <html lang>
try { document.documentElement.setAttribute('lang', __lang === 'en' ? 'en' : 'pt-BR'); } catch(e){}
