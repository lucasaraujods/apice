// apice-form.jsx — Multi-step lead form modal

// =====================================================================
// 🔗 INTEGRAÇÃO COM GOOGLE SHEETS
// ---------------------------------------------------------------------
// 1. Crie uma Planilha Google nova (https://sheets.new).
// 2. Menu Extensões → Apps Script. Apague o conteúdo e cole o script
//    que está em /SHEETS_INTEGRATION.md (gerado neste projeto).
// 3. Clique em "Implantar" → "Nova implantação" → tipo "App da Web".
//    - Executar como: Eu mesmo
//    - Quem tem acesso: Qualquer pessoa
// 4. Copie a URL gerada (termina com /exec) e cole abaixo:
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz3AcvKUTu9tvUN1kJCZq9XclvzRrvBVd0WppnubOHHAaW6d27iShmiXa7cNDRFV6Z7kA/exec';
// =====================================================================

const COUNTRIES = [
  {c:'BR',n:'Brasil',d:'+55',f:'🇧🇷'},
  {c:'US',n:'Estados Unidos',d:'+1',f:'🇺🇸'},
  {c:'PT',n:'Portugal',d:'+351',f:'🇵🇹'},
  {c:'ES',n:'Espanha',d:'+34',f:'🇪🇸'},
  {c:'AR',n:'Argentina',d:'+54',f:'🇦🇷'},
  {c:'MX',n:'México',d:'+52',f:'🇲🇽'},
  {c:'CO',n:'Colômbia',d:'+57',f:'🇨🇴'},
  {c:'CL',n:'Chile',d:'+56',f:'🇨🇱'},
  {c:'PE',n:'Peru',d:'+51',f:'🇵🇪'},
  {c:'UY',n:'Uruguai',d:'+598',f:'🇺🇾'},
  {c:'PY',n:'Paraguai',d:'+595',f:'🇵🇾'},
  {c:'BO',n:'Bolívia',d:'+591',f:'🇧🇴'},
  {c:'EC',n:'Equador',d:'+593',f:'🇪🇨'},
  {c:'VE',n:'Venezuela',d:'+58',f:'🇻🇪'},
  {c:'CA',n:'Canadá',d:'+1',f:'🇨🇦'},
  {c:'GB',n:'Reino Unido',d:'+44',f:'🇬🇧'},
  {c:'FR',n:'França',d:'+33',f:'🇫🇷'},
  {c:'DE',n:'Alemanha',d:'+49',f:'🇩🇪'},
  {c:'IT',n:'Itália',d:'+39',f:'🇮🇹'},
  {c:'NL',n:'Holanda',d:'+31',f:'🇳🇱'},
  {c:'BE',n:'Bélgica',d:'+32',f:'🇧🇪'},
  {c:'CH',n:'Suíça',d:'+41',f:'🇨🇭'},
  {c:'AT',n:'Áustria',d:'+43',f:'🇦🇹'},
  {c:'IE',n:'Irlanda',d:'+353',f:'🇮🇪'},
  {c:'SE',n:'Suécia',d:'+46',f:'🇸🇪'},
  {c:'NO',n:'Noruega',d:'+47',f:'🇳🇴'},
  {c:'DK',n:'Dinamarca',d:'+45',f:'🇩🇰'},
  {c:'FI',n:'Finlândia',d:'+358',f:'🇫🇮'},
  {c:'PL',n:'Polônia',d:'+48',f:'🇵🇱'},
  {c:'CZ',n:'Tchéquia',d:'+420',f:'🇨🇿'},
  {c:'GR',n:'Grécia',d:'+30',f:'🇬🇷'},
  {c:'TR',n:'Turquia',d:'+90',f:'🇹🇷'},
  {c:'RU',n:'Rússia',d:'+7',f:'🇷🇺'},
  {c:'UA',n:'Ucrânia',d:'+380',f:'🇺🇦'},
  {c:'JP',n:'Japão',d:'+81',f:'🇯🇵'},
  {c:'CN',n:'China',d:'+86',f:'🇨🇳'},
  {c:'KR',n:'Coreia do Sul',d:'+82',f:'🇰🇷'},
  {c:'IN',n:'Índia',d:'+91',f:'🇮🇳'},
  {c:'AU',n:'Austrália',d:'+61',f:'🇦🇺'},
  {c:'NZ',n:'Nova Zelândia',d:'+64',f:'🇳🇿'},
  {c:'ZA',n:'África do Sul',d:'+27',f:'🇿🇦'},
  {c:'AE',n:'Emirados Árabes',d:'+971',f:'🇦🇪'},
  {c:'SA',n:'Arábia Saudita',d:'+966',f:'🇸🇦'},
  {c:'IL',n:'Israel',d:'+972',f:'🇮🇱'},
  {c:'EG',n:'Egito',d:'+20',f:'🇪🇬'},
  {c:'MA',n:'Marrocos',d:'+212',f:'🇲🇦'},
  {c:'NG',n:'Nigéria',d:'+234',f:'🇳🇬'},
  {c:'KE',n:'Quênia',d:'+254',f:'🇰🇪'},
  {c:'AO',n:'Angola',d:'+244',f:'🇦🇴'},
  {c:'MZ',n:'Moçambique',d:'+258',f:'🇲🇿'},
  {c:'CV',n:'Cabo Verde',d:'+238',f:'🇨🇻'},
  {c:'SG',n:'Singapura',d:'+65',f:'🇸🇬'},
  {c:'MY',n:'Malásia',d:'+60',f:'🇲🇾'},
  {c:'TH',n:'Tailândia',d:'+66',f:'🇹🇭'},
  {c:'PH',n:'Filipinas',d:'+63',f:'🇵🇭'},
  {c:'ID',n:'Indonésia',d:'+62',f:'🇮🇩'},
  {c:'VN',n:'Vietnã',d:'+84',f:'🇻🇳'},
];

const EMAIL_RX = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|icloud|live|me|msn|aol|protonmail|proton|zoho|fastmail|gmx|mail|uol|bol|terra|ig|globo|r7|edu|usp|unb|ufmg|ufrj|unicamp|gov|com|net|org|co|io|app|dev|tech|me|pt|br|us|uk|fr|de|es|it)\.[a-zA-Z]{2,}$/;
const SIMPLE_EMAIL_RX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const STEP_LABELS = () => [tx('Identificação','Identification'), tx('Contexto','Context'), tx('Consultoria','Coaching')];

const COMMITMENT_OPTIONS = () => [
  { v:'Sim, quero entrar para a Ápice',
    l: tx('Sim, quero entrar para a Ápice','Yes, I want to join Ápice'),
    d: tx('Estou pronto para investir tempo e energia agora','I am ready to invest time and energy now') },
  { v:'Tenho interesse, mas preciso entender mais sobre a Ápice',
    l: tx('Tenho interesse, mas preciso entender mais','I am interested, but I need to understand more'),
    d: tx('Quero conversar antes de decidir','I want to chat before deciding') },
  { v:'Ainda estou avaliando se esse é o momento certo',
    l: tx('Ainda estou avaliando o momento','Still evaluating the right moment'),
    d: tx('Posso ouvir mais e decidir depois','I can hear more and decide later') },
];

const FORM_MODALITIES = () => [
  {
    id: 'online',
    icon: '💻',
    title: tx('Consultoria Online','Online Consulting'),
    sub: tx('Acompanhamento 100% remoto','100% remote coaching'),
    plans: [
      {
        tier: 'Premium',
        accent: false,
        items: [
          tx('Treino personalizado com treinadores','Personalized training with coaches'),
          tx('Avaliação online (medidas + funcional)','Online assessment (measurements + functional)'),
          tx('Acesso ao grupo exclusivo de alunos','Access to the exclusive student group'),
          tx('Suporte integrado ao time','Integrated team support'),
        ],
      },
      {
        tier: 'Elite',
        accent: true,
        items: [
          tx('Treino personalizado com treinadores','Personalized training with coaches'),
          tx('Avaliação física online (medidas + funcional)','Online physical assessment (measurements + functional)'),
          tx('Dashboard de progressão física','Physical progress dashboard'),
          tx('Acompanhamento nutricional','Nutritional coaching'),
          tx('Acesso ao grupo exclusivo de alunos','Access to the exclusive student group'),
          tx('Suporte integrado ao time','Integrated team support'),
        ],
      },
    ],
  },
  {
    id: 'semipresencial',
    icon: '🤝',
    title: tx('Semipresencial','Hybrid'),
    sub: tx('Online + avaliação no estúdio','Online + in-studio assessment'),
    plans: [
      {
        tier: 'Premium',
        accent: false,
        items: [
          tx('Treino personalizado com treinadores','Personalized training with coaches'),
          tx('Avaliação presencial (medidas + funcional)','In-person assessment (measurements + functional)'),
          tx('Acesso ao grupo exclusivo de alunos','Access to the exclusive student group'),
          tx('Suporte integrado ao time','Integrated team support'),
        ],
      },
      {
        tier: 'Elite',
        accent: true,
        items: [
          tx('Treino personalizado com treinadores','Personalized training with coaches'),
          tx('Avaliação física presencial (medidas + funcional)','In-person physical assessment (measurements + functional)'),
          tx('Dashboard de progressão física','Physical progress dashboard'),
          tx('Acompanhamento nutricional','Nutritional coaching'),
          tx('Acesso ao grupo exclusivo de alunos','Access to the exclusive student group'),
        ],
      },
    ],
  },
  {
    id: 'presencial',
    icon: '🏋️',
    title: tx('Presencial','In-Person'),
    sub: tx('Personal training na agenda','Personal training on schedule'),
    plans: [
      {
        tier: 'Premium',
        accent: false,
        items: [
          tx('1× a 2× aulas presenciais por semana','1× to 2× in-person sessions per week'),
          tx('Plataforma de treino online','Online training platform'),
          tx('Periodização contínua','Continuous periodization'),
          tx('Acesso ao grupo exclusivo de alunos','Access to the exclusive student group'),
          tx('Suporte integrado ao time','Integrated team support'),
        ],
      },
      {
        tier: 'Elite',
        accent: true,
        items: [
          tx('2× a 5× aulas presenciais por semana','2× to 5× in-person sessions per week'),
          tx('Plataforma de treino online','Online training platform'),
          tx('Periodização contínua','Continuous periodization'),
          tx('Avaliação física a cada 1 mês (composição corporal, força, VO₂)','Physical assessment every month (body composition, strength, VO₂)'),
          tx('Massoterapia esportiva inclusa','Sports massage included'),
          tx('Acompanhamento nutricional','Nutritional coaching'),
          tx('Ajustes de periodização baseados em dados reais','Periodization adjustments based on real data'),
          tx('Suporte integrado ao time','Integrated team support'),
        ],
      },
    ],
  },
];

const Timeline = ({ step, total }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, marginBottom:32, padding:'0 8px' }}>
    {Array.from({length:total}).map((_,i)=>{
      const n = i+1;
      const done = n < step;
      const active = n === step;
      return (
        <React.Fragment key={i}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, minWidth:0 }}>
            <div style={{
              width: active?40:32, height: active?40:32, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              background: done?'var(--lm-green)' : active?'var(--lm-green-mute)' : 'var(--lm-charcoal)',
              border: `1.5px solid ${done||active?'var(--lm-green)':'var(--lm-graphite)'}`,
              color: done?'var(--lm-black)' : active?'var(--lm-green-glow)' : 'var(--tm)',
              fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize: active?15:13,
              transition:'all 280ms ease',
              boxShadow: active?'0 0 0 6px rgba(0,214,122,0.10)':'none'
            }}>
              {done ? '✓' : n}
            </div>
            <span style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase',
              color: active?'var(--lm-green)':done?'var(--t2)':'var(--tm)',
              fontWeight: active?600:400, whiteSpace:'nowrap' }}>
              {STEP_LABELS()[i]}
            </span>
          </div>
          {n < total && (
            <div style={{ flex:1, height:2, margin:'0 6px', marginBottom:24, minWidth:32, maxWidth:120,
              background: done?'var(--lm-green)':'var(--lm-graphite)',
              transition:'background 280ms ease' }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const Field = ({ label, error, children }) => (
  <div style={{ marginBottom:18 }}>
    <label style={{ display:'block', fontSize:12, fontWeight:600, letterSpacing:'0.05em',
      textTransform:'uppercase', color:'var(--lm-mist)', marginBottom:8 }}>{label}</label>
    {children}
    {error && <p style={{ marginTop:6, fontSize:12, color:'var(--lm-alert)', display:'flex', alignItems:'center', gap:6 }}>
      <span style={{ display:'inline-block', width:14, height:14, borderRadius:'50%', background:'var(--lm-alert)', color:'#fff', fontSize:10, textAlign:'center', lineHeight:'14px', fontWeight:700 }}>!</span>
      {error}
    </p>}
  </div>
);

const inputStyle = (err) => ({
  width:'100%', padding:'14px 16px', background:'var(--lm-black)',
  border: `1px solid ${err?'var(--lm-alert)':'var(--lm-graphite)'}`,
  borderRadius:10, color:'var(--lm-pearl)', fontSize:15, fontFamily:'inherit',
  outline:'none', transition:'border-color 180ms ease',
});

const PhoneField = ({ country, setCountry, phone, setPhone, error }) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const filtered = COUNTRIES.filter(c =>
    c.n.toLowerCase().includes(search.toLowerCase()) ||
    c.d.includes(search) ||
    c.c.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Field label={tx('WhatsApp / Telefone','WhatsApp / Phone')} error={error}>
      <div style={{ display:'flex', gap:8, position:'relative' }}>
        <button type="button" onClick={()=>setOpen(!open)}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 14px',
            background:'var(--lm-black)', border:`1px solid ${error?'var(--lm-alert)':'var(--lm-graphite)'}`,
            borderRadius:10, color:'var(--lm-pearl)', fontSize:15, minWidth:120, justifyContent:'space-between' }}>
          <span style={{ fontSize:18 }}>{country.f}</span>
          <span style={{ color:'var(--t2)', fontSize:14 }}>{country.d}</span>
          <span style={{ color:'var(--lm-mist)', fontSize:10 }}>▼</span>
        </button>
        <input type="tel" value={phone} onChange={e=>setPhone(e.target.value.replace(/[^\d\s()-]/g,''))}
          placeholder={tx('(11) 91234-5678','(555) 123-4567')} style={inputStyle(error)} />
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, width:340, maxHeight:340,
            background:'var(--lm-charcoal)', border:'1px solid var(--lm-graphite)', borderRadius:12,
            zIndex:10, overflow:'hidden', boxShadow:'0 12px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ padding:10, borderBottom:'1px solid var(--lm-graphite)' }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} autoFocus
                placeholder={tx('Buscar país, DDI ou código...','Search country, code or dial code...')}
                style={{ width:'100%', padding:'10px 12px', background:'var(--lm-black)',
                  border:'1px solid var(--lm-graphite)', borderRadius:8, color:'var(--lm-pearl)',
                  fontSize:13, fontFamily:'inherit', outline:'none' }} />
            </div>
            <div style={{ overflowY:'auto', maxHeight:270 }}>
              {filtered.map(c=>(
                <button key={c.c} type="button"
                  onClick={()=>{setCountry(c); setOpen(false); setSearch('');}}
                  style={{ display:'flex', alignItems:'center', gap:12, width:'100%', padding:'10px 14px',
                    background: country.c===c.c?'var(--lm-green-mute)':'transparent',
                    border:'none', color:'var(--lm-pearl)', fontSize:14, textAlign:'left',
                    cursor:'pointer', transition:'background 120ms' }}
                  onMouseEnter={e=>e.currentTarget.style.background = country.c===c.c?'var(--lm-green-mute)':'rgba(255,255,255,0.04)'}
                  onMouseLeave={e=>e.currentTarget.style.background = country.c===c.c?'var(--lm-green-mute)':'transparent'}>
                  <span style={{ fontSize:18 }}>{c.f}</span>
                  <span style={{ flex:1 }}>{c.n}</span>
                  <span style={{ color:'var(--t2)', fontSize:13 }}>{c.d}</span>
                </button>
              ))}
              {filtered.length===0 && <div style={{ padding:20, textAlign:'center', color:'var(--tm)', fontSize:13 }}>{tx('Nenhum país encontrado','No country found')}</div>}
            </div>
          </div>
        )}
      </div>
    </Field>
  );
};

const MONTHS_PT = () => getLang() === 'en'
  ? ['January','February','March','April','May','June','July','August','September','October','November','December']
  : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const WEEKDAYS_PT = () => getLang() === 'en'
  ? ['S','M','T','W','T','F','S']
  : ['D','S','T','Q','Q','S','S'];

const DatePicker = ({ value, onChange, error }) => {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => {
    if (value) { const d = new Date(value+'T00:00:00'); return { y: d.getFullYear(), m: d.getMonth() }; }
    return { y: 1995, m: 0 };
  });
  const [mode, setMode] = React.useState('day'); // day | month | year
  const ref = React.useRef(null);
  const today = new Date(); today.setHours(0,0,0,0);
  const sel = value ? new Date(value+'T00:00:00') : null;

  React.useEffect(()=>{
    const h = (e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if(open) document.addEventListener('mousedown',h);
    return ()=>document.removeEventListener('mousedown',h);
  },[open]);

  const display = value ? value.split('-').reverse().join('/') : '';
  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m+1, 0).getDate();
  const daysPrev = new Date(view.y, view.m, 0).getDate();

  const cells = [];
  for (let i=firstDay-1; i>=0; i--) cells.push({d:daysPrev-i, cur:false, m:view.m-1});
  for (let i=1; i<=daysInMonth; i++) cells.push({d:i, cur:true, m:view.m});
  while (cells.length<42) cells.push({d:cells.length-firstDay-daysInMonth+1, cur:false, m:view.m+1});

  const navMonth = (delta) => {
    let m = view.m+delta, y = view.y;
    if (m<0) { m=11; y--; } else if (m>11) { m=0; y++; }
    if (y < 1925 || y > today.getFullYear()) return;
    setView({y,m});
  };

  const navYearChunk = (delta) => {
    const newY = view.y + delta;
    if (newY < 1925 - 11 || newY > today.getFullYear()) return;
    setView(v=>({...v, y:newY}));
  };

  const pick = (cell) => {
    let m = cell.m, y = view.y;
    if (m<0) { m=11; y--; } else if (m>11) { m=0; y++; }
    const dt = new Date(y, m, cell.d);
    if (dt > today) return;
    const iso = `${y}-${String(m+1).padStart(2,'0')}-${String(cell.d).padStart(2,'0')}`;
    onChange(iso);
    setOpen(false);
  };

  const yearStart = Math.floor(view.y/12)*12;

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button type="button" onClick={()=>setOpen(!open)}
        style={{ ...inputStyle(error), display:'flex', alignItems:'center', justifyContent:'space-between',
          textAlign:'left', cursor:'pointer', maxWidth:240,
          color: value?'var(--lm-pearl)':'var(--tm)' }}>
        <span>{display || tx('DD / MM / AAAA', 'DD / MM / YYYY')}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lm-green)" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="16" rx="2"/>
          <path d="M3 9h18M8 3v4M16 3v4"/>
        </svg>
      </button>

      {open && (
        <div style={{ position:'absolute', bottom:'calc(100% + 8px)', left:0, width:300, zIndex:20,
          background:'linear-gradient(180deg,#17171b 0%,#121215 100%)',
          border:'1px solid var(--lm-graphite)', borderRadius:14, padding:14,
          boxShadow:'0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,214,122,0.06)',
          animation:'slideUp 200ms ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <button type="button" onClick={()=>{ if(mode==='day')navMonth(-1); else if(mode==='year')navYearChunk(-12); }}
              style={{ width:30, height:30, borderRadius:8, background:'transparent', border:'1px solid var(--lm-graphite)', color:'var(--lm-pearl)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
            <button type="button" onClick={()=>setMode(mode==='day'?'month':mode==='month'?'year':'day')}
              style={{ flex:1, margin:'0 8px', padding:'7px 10px', background:'transparent', border:'none',
                color:'var(--lm-pearl)', fontFamily:"'Sora',sans-serif", fontWeight:600, fontSize:14, cursor:'pointer',
                borderRadius:8, transition:'background 120ms' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              {mode==='day' && `${MONTHS_PT()[view.m]} ${view.y}`}
              {mode==='month' && view.y}
              {mode==='year' && `${yearStart} – ${yearStart+11}`}
            </button>
            <button type="button" onClick={()=>{ if(mode==='day')navMonth(1); else if(mode==='year')navYearChunk(12); }}
              style={{ width:30, height:30, borderRadius:8, background:'transparent', border:'1px solid var(--lm-graphite)', color:'var(--lm-pearl)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
          </div>

          {mode==='day' && <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, marginBottom:6 }}>
              {WEEKDAYS_PT().map((d,i)=><div key={i} style={{ textAlign:'center', fontSize:10, fontWeight:600, color:'var(--tm)', letterSpacing:'0.1em', padding:'4px 0' }}>{d}</div>)}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
              {cells.map((cell,i)=>{
                const cellDate = new Date(view.y, cell.m, cell.d);
                const isFuture = cellDate > today;
                const isToday = cellDate.getTime() === today.getTime();
                const isSel = sel && cellDate.getTime() === sel.getTime();
                return (
                  <button key={i} type="button" onClick={()=>pick(cell)} disabled={isFuture}
                    style={{ aspectRatio:'1', borderRadius:8, border:'none',
                      background: isSel?'var(--lm-green)':isToday?'rgba(0,214,122,0.10)':'transparent',
                      color: isSel?'var(--lm-black)':!cell.cur?'var(--lm-stone)':isFuture?'var(--lm-stone)':isToday?'var(--lm-green-glow)':'var(--lm-pearl)',
                      fontSize:13, fontWeight:isSel||isToday?700:500, fontFamily:'inherit',
                      cursor:isFuture?'not-allowed':'pointer', transition:'all 120ms',
                      opacity:isFuture?0.4:1 }}
                    onMouseEnter={e=>{if(!isSel&&!isFuture)e.currentTarget.style.background='rgba(255,255,255,0.06)';}}
                    onMouseLeave={e=>{if(!isSel)e.currentTarget.style.background=isToday?'rgba(0,214,122,0.10)':'transparent';}}>
                    {cell.d}
                  </button>
                );
              })}
            </div>
          </>}

          {mode==='month' && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
              {MONTHS_PT().map((mn,i)=>(
                <button key={i} type="button" onClick={()=>{setView(v=>({...v,m:i})); setMode('day');}}
                  style={{ padding:'14px 6px', borderRadius:8,
                    background: view.m===i?'var(--lm-green-mute)':'transparent',
                    border:`1px solid ${view.m===i?'var(--lm-green)':'transparent'}`,
                    color: view.m===i?'var(--lm-green-glow)':'var(--lm-pearl)',
                    fontSize:13, fontFamily:'inherit', cursor:'pointer', transition:'all 120ms' }}>
                  {mn.slice(0,3)}
                </button>
              ))}
            </div>
          )}

          {mode==='year' && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
              {Array.from({length:12}).map((_,i)=>{
                const yr = yearStart+i;
                const isFut = yr > today.getFullYear() || yr < 1925;
                return (
                  <button key={i} type="button" disabled={isFut}
                    onClick={()=>{setView(v=>({...v,y:yr})); setMode('month');}}
                    style={{ padding:'14px 6px', borderRadius:8,
                      background: view.y===yr?'var(--lm-green-mute)':'transparent',
                      border:`1px solid ${view.y===yr?'var(--lm-green)':'transparent'}`,
                      color: isFut?'var(--lm-stone)':view.y===yr?'var(--lm-green-glow)':'var(--lm-pearl)',
                      fontSize:13, fontFamily:'inherit', cursor:isFut?'not-allowed':'pointer', opacity:isFut?0.35:1, transition:'all 120ms' }}>
                    {yr}
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, paddingTop:10, borderTop:'1px solid var(--lm-graphite)' }}>
            <button type="button" onClick={()=>{onChange(''); setOpen(false);}}
              style={{ background:'transparent', border:'none', color:'var(--tm)', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>{tx('Limpar','Clear')}</button>
            <button type="button" onClick={()=>{ const t=today; setView({y:t.getFullYear(), m:t.getMonth()}); setMode('day'); }}
              style={{ background:'transparent', border:'none', color:'var(--lm-green)', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>{tx('Hoje','Today')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

const RadioGrid = ({ value, setValue, options, cols=2 }) => (
  <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:8 }}>
    {options.map(o=>(
      <button key={o.v} type="button" onClick={()=>setValue(o.v)}
        style={{ padding:'14px 12px', background: value===o.v?'var(--lm-green-mute)':'var(--lm-black)',
          border:`1px solid ${value===o.v?'var(--lm-green)':'var(--lm-graphite)'}`,
          borderRadius:10, color: value===o.v?'var(--lm-green-glow)':'var(--lm-pearl)',
          fontSize:13, fontFamily:'inherit', textAlign:'left', cursor:'pointer',
          transition:'all 160ms', fontWeight: value===o.v?600:400 }}>
        {o.l}
      </button>
    ))}
  </div>
);

const TRAINING_BUCKETS = () => [
  {v:'Nunca treinou', l: tx('Nunca treinou','Never trained'), d: tx('Vou começar agora','Starting now')},
  {v:'0–6 meses',     l:'0–6 ' + tx('meses','months'),         d: tx('Iniciante','Beginner')},
  {v:'6–12 meses',    l:'6–12 ' + tx('meses','months'),        d: tx('Em adaptação','Adapting')},
  {v:'1–2 anos',      l:'1–2 ' + tx('anos','years'),           d: tx('Intermediário','Intermediate')},
  {v:'2 anos ou mais',l:'2 ' + tx('anos+','years+'),           d: tx('Experiente','Experienced')},
];

const TrainingBuckets = ({ value, setValue, error }) => (
  <Field label={tx('Há quanto tempo você treina?','How long have you been training?')} error={error}>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:6 }}>
      {TRAINING_BUCKETS().map(b=>(
        <button key={b.v} type="button" onClick={()=>setValue(b.v)}
          style={{ padding:'12px 6px', background: value===b.v?'var(--lm-green-mute)':'var(--lm-black)',
            border:`1px solid ${value===b.v?'var(--lm-green)':'var(--lm-graphite)'}`,
            borderRadius:10, color: value===b.v?'var(--lm-green-glow)':'var(--lm-pearl)',
            fontSize:12, fontFamily:'inherit', textAlign:'center', cursor:'pointer',
            transition:'all 160ms', display:'flex', flexDirection:'column', gap:4, lineHeight:1.25 }}>
          <span style={{ fontWeight: value===b.v?700:600, fontSize:12 }}>{b.l}</span>
          <span style={{ fontSize:10, opacity:0.7, fontWeight:400 }}>{b.d}</span>
        </button>
      ))}
    </div>
  </Field>
);

const ApiceForm = () => {
  useLang(); // re-render when language toggles
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [data, setData] = React.useState({
    name:'', email:'', phone:'',
    birthdate:'', modality:'', tier:'', plan:'', commitment:'', training:'',
    goal:'', history:'', expectation:'',
  });
  const [country, setCountry] = React.useState(COUNTRIES[0]);
  const [errors, setErrors] = React.useState({});

  React.useEffect(()=>{
    const handler = ()=>{ setOpen(true); setStep(1); setSubmitted(false); setErrors({}); };
    window.addEventListener('apice:openForm', handler);
    return ()=>window.removeEventListener('apice:openForm', handler);
  },[]);

  React.useEffect(()=>{
    document.body.style.overflow = open ? 'hidden' : '';
    return ()=>{ document.body.style.overflow = ''; };
  },[open]);

  // In EN, only Online Consulting is offered — auto-select it so the user
  // jumps straight to the Premium/Elite tier picker.
  React.useEffect(()=>{
    if (open && getLang() === 'en' && data.modality !== 'online') {
      setData(d => ({ ...d, modality: 'online' }));
    }
  }, [open, getLang()]);

  const set = (k,v)=>setData(d=>({...d,[k]:v}));

  const validateStep1 = () => {
    const e = {};
    if (!data.name.trim() || data.name.trim().length<2) e.name = tx('Digite seu nome completo','Enter your full name');
    if (!data.email.trim()) e.email = tx('Digite seu e-mail','Enter your email');
    else if (!SIMPLE_EMAIL_RX.test(data.email)) e.email = tx('E-mail inválido. Use um formato como nome@gmail.com','Invalid email. Use a format like name@gmail.com');
    else if (!EMAIL_RX.test(data.email)) e.email = tx('Use um e-mail válido (Gmail, Hotmail, Outlook, etc.)','Use a valid email (Gmail, Hotmail, Outlook, etc.)');
    if (!data.phone.trim() || data.phone.replace(/\D/g,'').length < 6) e.phone = tx('Digite um número válido','Enter a valid phone number');
    if (!data.birthdate) e.birthdate = tx('Selecione sua data de nascimento','Select your date of birth');
    else {
      const b = new Date(data.birthdate);
      const now = new Date();
      let age = now.getFullYear() - b.getFullYear();
      const m = now.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
      if (isNaN(age) || age<14 || age>100) e.birthdate = tx('Data inválida (idade entre 14 e 100)','Invalid date (age between 14 and 100)');
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!data.training) e.training = tx('Selecione há quanto tempo você treina','Select how long you have been training');
    if (!data.goal) e.goal = tx('Selecione um objetivo','Select a goal');
    if (!data.history.trim() || data.history.trim().length<5) e.history = tx('Conte um pouco do seu histórico','Tell us a bit about your background');
    if (!data.expectation.trim() || data.expectation.trim().length<5) e.expectation = tx('Conte sua expectativa','Tell us your expectation');
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const validateStep3 = () => {
    const e = {};
    if (!data.modality) e.modality = tx('Escolha uma modalidade (online, semipresencial ou presencial)','Choose a format (online, hybrid or in-person)');
    if (!data.tier) e.tier = tx('Escolha um nível (Premium ou Elite)','Choose a tier (Premium or Elite)');
    if (!data.commitment) e.commitment = tx('Selecione uma opção sobre seu compromisso','Select an option about your commitment');
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => {
    const ok = step===1?validateStep1():step===2?validateStep2():validateStep3();
    if (!ok) return;
    if (step<3) { setStep(step+1); setErrors({}); }
    else submit();
  };

  const submit = () => {
    const fullPhone = `${country.d} ${data.phone}`;
    // Formata data de nascimento como DD/MM/AAAA para a planilha
    const birthBR = data.birthdate ? data.birthdate.split('-').reverse().join('/') : '';
    // Combina modalidade + nível para a coluna "consultoria"
    // (sempre em PT para manter a planilha consistente)
    const MOD_PT_TITLES = { online: 'Consultoria Online', semipresencial: 'Semipresencial', presencial: 'Presencial' };
    const consultoria = data.modality && data.tier ? `${MOD_PT_TITLES[data.modality] || data.modality} — ${data.tier}` : '';

    // Payload na MESMA ORDEM das colunas da planilha "Página1":
    // A:nome | B:email | C:nùmero | D:data de nascimento |
    // E:ha quanto tempo treina | F:objetivo principal | G:historico |
    // H:o que voce esperar mudar nos proximos 6 meses |
    // I:consultoria | J:Você está disposto a investir seu tempo...
    const payload = {
      nome: data.name,
      email: data.email,
      numero: fullPhone,
      data_nascimento: birthBR,
      tempo_treino: data.training,
      objetivo: data.goal,
      historico: data.history,
      expectativa: data.expectation,
      consultoria: consultoria,
      compromisso: data.commitment,
    };

    // 1) Envia para a Planilha Google (Apps Script)
    if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
      try {
        fetch(SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Apps Script aceita; não precisamos ler a resposta
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        }).catch(err => console.warn('[Ápice] Falha ao enviar para planilha:', err));
      } catch (err) {
        console.warn('[Ápice] Erro ao iniciar envio para planilha:', err);
      }
    } else {
      console.warn('[Ápice] SHEET_WEBHOOK_URL não configurada. Os dados NÃO foram salvos na planilha.');
    }

    // 2) Mostra tela de confirmação (sem redirecionamento)
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div onClick={(e)=>{if(e.target===e.currentTarget)setOpen(false);}}
      style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.82)',
        backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center',
        padding:'24px 16px', overflowY:'auto', fontFamily:"'Inter',sans-serif",
        animation:'fadeIn 220ms ease' }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .apice-no-spin::-webkit-outer-spin-button,.apice-no-spin::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
        .apice-no-spin{-moz-appearance:textfield}
        .apice-date::-webkit-calendar-picker-indicator{filter:invert(0.7) sepia(1) saturate(5) hue-rotate(95deg);cursor:pointer;opacity:0.8}
        .apice-date::-webkit-calendar-picker-indicator:hover{opacity:1}
        .apice-form-card{animation:slideUp 320ms ease}
        .apice-form-card input:focus,.apice-form-card textarea:focus,.apice-form-card select:focus{border-color:var(--lm-green)!important}
        .apice-form-card input::placeholder,.apice-form-card textarea::placeholder{color:var(--tm)}
      `}</style>
      <div className="apice-form-card" style={{ width:'100%', maxWidth:580, background:'var(--lm-charcoal)',
        border:'1px solid var(--lm-graphite)', borderRadius:20, padding:'32px 28px',
        boxShadow:'0 24px 80px rgba(0,0,0,0.7)', maxHeight:'92vh', overflowY:'auto', position:'relative' }}>

        <button onClick={()=>setOpen(false)} aria-label={tx('Fechar','Close')}
          style={{ position:'absolute', top:16, right:16, width:36, height:36, borderRadius:'50%',
            background:'transparent', border:'1px solid var(--lm-graphite)', color:'var(--lm-mist)',
            fontSize:18, lineHeight:1, cursor:'pointer', transition:'all 160ms' }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--lm-graphite)';e.currentTarget.style.color='var(--lm-pearl)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--lm-mist)';}}>×</button>

        {submitted ? (
          <div style={{ textAlign:'center', padding:'32px 8px' }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--lm-green)',
              display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px',
              fontSize:36, color:'var(--lm-black)', fontWeight:700 }}>✓</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:700,
              color:'var(--lm-pearl)', marginBottom:10 }}>{tx('Aplicação enviada!','Application submitted!')}</h3>
            <p style={{ color:'var(--t2)', fontSize:15, lineHeight:1.6, maxWidth:420, margin:'0 auto' }}>
              {tx('Um personal da equipe da Ápice entrará em contato com você para finalizar o atendimento com o nosso time.','A trainer from the Ápice team will reach out to you to complete your onboarding with our team.')}
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase',
                color:'var(--lm-green)', fontWeight:600, marginBottom:6 }}>{tx('Aplicação · Ápice','Application · Ápice')}</p>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3vw,28px)', fontWeight:700,
                color:'var(--lm-pearl)', lineHeight:1.2, letterSpacing:'-0.02em' }}>
                {step===1 && tx("Vamos começar pelo básico","Let's start with the basics")}
                {step===2 && tx('Conte um pouco sobre você','Tell us a bit about yourself')}
                {step===3 && tx('Escolha sua modalidade','Choose your format')}
              </h2>
              <p style={{ color:'var(--tm)', fontSize:13, marginTop:6 }}>{tx(`Etapa ${step} de 3 · Leva menos de 2 min`,`Step ${step} of 3 · Takes less than 2 min`)}</p>
            </div>

            <Timeline step={step} total={3} />

            {step===1 && <>
              <Field label={tx('Nome completo','Full name')} error={errors.name}>
                <input value={data.name} onChange={e=>set('name',e.target.value)}
                  placeholder={tx('Como você quer ser chamado(a)','How do you want to be called')} style={inputStyle(errors.name)} />
              </Field>
              <Field label={tx('E-mail','Email')} error={errors.email}>
                <input type="email" value={data.email} onChange={e=>set('email',e.target.value)}
                  placeholder="your@email.com" style={inputStyle(errors.email)} />
              </Field>
              <PhoneField country={country} setCountry={setCountry}
                phone={data.phone} setPhone={v=>set('phone',v)} error={errors.phone} />
              <Field label={tx('Data de nascimento','Date of birth')} error={errors.birthdate}>
                <DatePicker value={data.birthdate} onChange={v=>set('birthdate',v)} error={errors.birthdate} />
              </Field>
            </>}

            {step===2 && <>
              <TrainingBuckets value={data.training} setValue={v=>set('training',v)} error={errors.training} />
              <Field label={tx('Objetivo principal','Main goal')} error={errors.goal}>
                <RadioGrid value={data.goal} setValue={v=>set('goal',v)} cols={2}
                  options={[
                    {v:'Hipertrofia / Estética',         l: tx('Hipertrofia · estética','Hypertrophy · aesthetics')},
                    {v:'Emagrecimento / Composição corporal', l: tx('Emagrecimento','Fat loss')},
                    {v:'Performance esportiva',         l: tx('Performance','Performance')},
                    {v:'Saúde / Recuperação / Dor',       l: tx('Saúde · recuperação','Health · recovery')},
                  ]} />
              </Field>
              <Field label={tx('Histórico — você já fez consultoria, personal ou fisio?','Background — have you done coaching, personal training or physiotherapy before?')} error={errors.history}>
                <textarea value={data.history} onChange={e=>set('history',e.target.value)}
                  placeholder={tx('Conte rapidamente o que já tentou e o que funcionou ou não...','Briefly tell us what you have tried and what worked or did not...')}
                  rows={3} style={{...inputStyle(errors.history), resize:'vertical', minHeight:80}} />
              </Field>
              <Field label={tx('O que você espera mudar nos próximos 6 meses?','What do you expect to change in the next 6 months?')} error={errors.expectation}>
                <textarea value={data.expectation} onChange={e=>set('expectation',e.target.value)}
                  placeholder={tx('Seja específico — peso, dor, performance, autoestima, etc.','Be specific — weight, pain, performance, self-image, etc.')}
                  rows={3} style={{...inputStyle(errors.expectation), resize:'vertical', minHeight:80}} />
              </Field>
            </>}

            {step===3 && <>
              <p style={{ color:'var(--t2)', fontSize:14, lineHeight:1.6, marginBottom:18 }}>
                {tx(
                  <>Escolha primeiro o <strong style={{color:'var(--lm-pearl)'}}>formato</strong> da consultoria e, em seguida, o <strong style={{color:'var(--lm-pearl)'}}>nível</strong> de acompanhamento. Você pode trocar conversando com a equipe da Ápice posteriormente.</>,
                  <>Choose the <strong style={{color:'var(--lm-pearl)'}}>tier</strong> of online consulting that fits you. You can switch later by talking to the Ápice team.</>
                )}
              </p>

              {/* ── MODALIDADE (apenas em PT — em EN só existe Online) ── */}
              {getLang() !== 'en' && <>
              <p style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--lm-mist)', fontWeight:600, marginBottom:10 }}>
                {tx('1. Formato','1. Format')}
              </p>
              {errors.modality && (
                <p style={{ marginBottom:12, fontSize:13, color:'var(--lm-alert)', display:'flex', alignItems:'center', gap:8, background:'rgba(229,97,76,0.08)', border:'1px solid rgba(229,97,76,0.3)', padding:'10px 12px', borderRadius:10 }}>
                  <span style={{ display:'inline-block', width:16, height:16, borderRadius:'50%', background:'var(--lm-alert)', color:'#fff', fontSize:11, textAlign:'center', lineHeight:'16px', fontWeight:700, flexShrink:0 }}>!</span>
                  {errors.modality}
                </p>
              )}
              <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap:8, marginBottom:24 }}>
                {FORM_MODALITIES().map(m => {
                  const active = data.modality === m.id;
                  return (
                    <button key={m.id} type="button"
                      onClick={()=>{ set('modality', m.id); set('tier', ''); }}
                      style={{
                        display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                        padding:'14px 8px',
                        background: active ? 'linear-gradient(180deg,rgba(0,214,122,0.10),rgba(0,214,122,0.02))' : 'var(--lm-black)',
                        border:`1.5px solid ${active ? 'var(--lm-green)' : 'var(--lm-graphite)'}`,
                        borderRadius:12, cursor:'pointer',
                        boxShadow: active ? '0 0 0 4px rgba(0,214,122,0.10)' : 'none',
                        transition:'all 200ms ease', fontFamily:'inherit', textAlign:'center'
                      }}>
                      <span style={{ fontSize:22, lineHeight:1 }}>{m.icon}</span>
                      <span style={{
                        fontFamily:"'Sora',sans-serif", fontWeight: active?700:600,
                        fontSize:13, color: active?'var(--lm-green-glow)':'var(--lm-pearl)',
                        letterSpacing:'-0.005em', lineHeight:1.2
                      }}>{m.title}</span>
                      <span style={{ fontSize:10, color:'var(--tm)', lineHeight:1.3 }}>{m.sub}</span>
                    </button>
                  );
                })}
              </div>
              </>}

              {/* ── NÍVEL ── */}
              {data.modality && (() => {
                const mod = FORM_MODALITIES().find(m => m.id === data.modality);
                return (
                  <>
                    {errors.tier && (
                      <p style={{ marginBottom:12, fontSize:13, color:'var(--lm-alert)', display:'flex', alignItems:'center', gap:8, background:'rgba(229,97,76,0.08)', border:'1px solid rgba(229,97,76,0.3)', padding:'10px 12px', borderRadius:10 }}>
                        <span style={{ display:'inline-block', width:16, height:16, borderRadius:'50%', background:'var(--lm-alert)', color:'#fff', fontSize:11, textAlign:'center', lineHeight:'16px', fontWeight:700, flexShrink:0 }}>!</span>
                        {errors.tier}
                      </p>
                    )}
                    <div style={{ display:'grid', gap:14 }}>
                      {mod.plans.map(p => {
                        const active = data.tier === p.tier;
                        return (
                          <button key={p.tier} type="button" onClick={()=>set('tier', p.tier)}
                            style={{ display:'block', textAlign:'left', width:'100%', padding:'18px 18px',
                              background: active?'linear-gradient(180deg,rgba(0,214,122,0.10),rgba(0,214,122,0.02))':'var(--lm-black)',
                              border:`1.5px solid ${active?'var(--lm-green)':'var(--lm-graphite)'}`,
                              borderRadius:14, cursor:'pointer', transition:'all 200ms ease',
                              boxShadow: active?'0 0 0 4px rgba(0,214,122,0.10)':'none',
                              position:'relative', fontFamily:'inherit' }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:8 }}>
                              <div>
                                <span style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color: active?'var(--lm-green)':'var(--tm)', fontWeight:600 }}>
                                  {p.accent ? tx('🥇 Mais completo','🥇 Most complete') : tx('🥈 Essencial','🥈 Essential')}
                                </span>
                                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, color:'var(--lm-pearl)', marginTop:4, letterSpacing:'-0.01em' }}>{p.tier}</h3>
                              </div>
                              <div style={{ width:24, height:24, borderRadius:'50%', border:`2px solid ${active?'var(--lm-green)':'var(--lm-stone)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:4, background: active?'var(--lm-green)':'transparent', transition:'all 200ms' }}>
                                {active && <span style={{ color:'var(--lm-black)', fontSize:14, fontWeight:700, lineHeight:1 }}>✓</span>}
                              </div>
                            </div>
                            <ul style={{ listStyle:'none', display:'grid', gap:6, marginTop:12, paddingTop:12, borderTop:`1px solid ${active?'rgba(0,214,122,0.18)':'var(--lm-graphite)'}` }}>
                              {p.items.map((it,i)=>(
                                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'var(--lm-pearl)' }}>
                                  <span style={{ color:'var(--lm-green)', marginTop:1, flexShrink:0 }}>✓</span>
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}

              <div style={{ marginTop:28, paddingTop:22, borderTop:'1px solid var(--lm-graphite)' }}>
                <h4 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:'var(--lm-pearl)', letterSpacing:'-0.01em', marginBottom:6 }}>
                  {tx('Você está disposto a investir seu tempo para realmente alcançar seu ápice de performance?','Are you willing to invest your time to truly reach your performance apex?')}
                </h4>
                <p style={{ color:'var(--tm)', fontSize:12, marginBottom:14 }}>{tx('Escolha apenas uma opção','Choose only one option')}</p>
                {errors.commitment && (
                  <p style={{ marginBottom:12, fontSize:13, color:'var(--lm-alert)', display:'flex', alignItems:'center', gap:8, background:'rgba(229,97,76,0.08)', border:'1px solid rgba(229,97,76,0.3)', padding:'10px 12px', borderRadius:10 }}>
                    <span style={{ display:'inline-block', width:16, height:16, borderRadius:'50%', background:'var(--lm-alert)', color:'#fff', fontSize:11, textAlign:'center', lineHeight:'16px', fontWeight:700, flexShrink:0 }}>!</span>
                    {errors.commitment}
                  </p>
                )}
                <div style={{ display:'grid', gap:8 }}>
                  {COMMITMENT_OPTIONS().map(o=>{
                    const active = data.commitment===o.v;
                    return (
                      <button key={o.v} type="button" onClick={()=>set('commitment', o.v)}
                        style={{ display:'flex', alignItems:'center', gap:12, width:'100%', padding:'14px 14px',
                          background: active?'var(--lm-green-mute)':'var(--lm-black)',
                          border:`1px solid ${active?'var(--lm-green)':'var(--lm-graphite)'}`,
                          borderRadius:10, cursor:'pointer', transition:'all 160ms', fontFamily:'inherit', textAlign:'left' }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${active?'var(--lm-green)':'var(--lm-stone)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background: active?'var(--lm-green)':'transparent', transition:'all 160ms' }}>
                          {active && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--lm-black)' }}></span>}
                        </div>
                        <div style={{ flex:1, lineHeight:1.3 }}>
                          <div style={{ color: active?'var(--lm-green-glow)':'var(--lm-pearl)', fontSize:13, fontWeight:active?700:600 }}>{o.l}</div>
                          <div style={{ color:'var(--tm)', fontSize:11, marginTop:2 }}>{o.d}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>}

            <div style={{ display:'flex', gap:10, marginTop:24 }}>
              {step>1 && (
                <button onClick={()=>{setStep(step-1); setErrors({});}}
                  style={{ padding:'14px 22px', background:'transparent',
                    border:'1px solid var(--lm-graphite)', borderRadius:10,
                    color:'var(--lm-pearl)', fontSize:14, fontWeight:600, fontFamily:'inherit',
                    cursor:'pointer', transition:'all 160ms' }}>{tx('← Voltar','← Back')}</button>
              )}
              <button onClick={next}
                style={{ flex:1, padding:'14px 22px', background:'var(--lm-green)',
                  border:'none', borderRadius:10, color:'var(--lm-black)', fontSize:15,
                  fontWeight:700, fontFamily:'inherit', cursor:'pointer',
                  boxShadow:'0 4px 20px rgba(0,214,122,0.32)', transition:'all 160ms' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                {step===3 ? tx('Enviar aplicação →','Submit application →') : tx('Continuar →','Continue →')}
              </button>
            </div>

            <p style={{ marginTop:18, fontSize:11, color:'var(--tm)', textAlign:'center', lineHeight:1.5 }}>
              {tx('Seus dados são confidenciais. Usamos apenas para o processo de seleção da consultoria.','Your data is confidential. We only use it for the consulting selection process.')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

window.ApiceForm = ApiceForm;
window.openApiceForm = () => window.dispatchEvent(new CustomEvent('apice:openForm'));
