// lm-components.jsx — shared UI primitives

const Ic = {
  check: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  x: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  shield: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  msg: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  plus: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  clock: ({s=16,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  arr: ({s=16,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  star: ({s=13,c='#00D67A'})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  target: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  heart: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  compass: ({s=20,c='currentColor'})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
};

const ImgPH = ({h=300,label='foto',style={}}) => (
  <div style={{width:'100%',height:h,background:'repeating-linear-gradient(135deg,#161619 0,#161619 10px,#1d1d21 10px,#1d1d21 20px)',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,border:'1px solid #23232A',color:'#52525a',fontFamily:'monospace',fontSize:11,textAlign:'center',padding:20,flexShrink:0,...style}}>
    [ {label} ]
  </div>
);

const Brow = ({children,inv=false}) => (
  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
    <div style={{width:24,height:2,background:inv?'var(--lm-green-deep)':'var(--lm-green)',flexShrink:0}}/>
    <span style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:inv?'var(--lm-green-deep)':'var(--lm-green)'}}>{children}</span>
  </div>
);

const Btn = ({children,size='md',variant='primary',onClick,pulse=false,style={},className=''}) => {
  const [hov,setHov] = React.useState(false);
  const sz = {xl:{p:'22px 48px',fs:20},lg:{p:'20px 40px',fs:18},md:{p:'18px 32px',fs:16},sm:{p:'10px 20px',fs:14}};
  const s = sz[size]||sz.md;
  const cls = [pulse?'pulse':'',className].filter(Boolean).join(' ');
  if (variant==='secondary') return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className={cls}
      style={{background:'transparent',color:hov?'var(--lm-green)':'var(--lm-pearl)',border:`1px solid ${hov?'var(--lm-green)':'var(--lm-graphite)'}`,padding:s.p,borderRadius:8,fontWeight:500,fontSize:s.fs,transition:'all 200ms ease',display:'flex',alignItems:'center',gap:8,...style}}>
      {children}
    </button>
  );
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className={cls}
      style={{background:hov?'var(--lm-green-deep)':'var(--lm-green)',color:'var(--lm-black)',border:'none',padding:s.p,borderRadius:8,fontWeight:600,fontSize:s.fs,transition:'all 200ms ease',transform:hov?'translateY(-2px)':'none',boxShadow:hov?'0 8px 32px rgba(0,214,122,.42)':'0 4px 24px rgba(0,214,122,.28),0 0 0 1px rgba(0,214,122,.14)',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',textAlign:'center',justifyContent:'center',...style}}>
      {children}
    </button>
  );
};

const Pill = ({children,v='green'}) => {
  const vs = {
    green:{background:'var(--lm-green)',color:'var(--lm-black)'},
    bonus:{background:'var(--lm-green-mute)',color:'var(--lm-green-glow)',border:'1px solid var(--lm-green)'},
    alert:{background:'rgba(229,97,76,.1)',color:'var(--lm-alert)',border:'1px solid var(--lm-alert)'},
  };
  return <span style={{...vs[v]||vs.green,padding:'6px 12px',borderRadius:999,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:"'Inter',sans-serif",display:'inline-block'}}>{children}</span>;
};

const W = ({children,style={}}) => (
  <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',...style}}>{children}</div>
);

const useCountUp = (target,dur=1200) => {
  const [n,setN] = React.useState(0);
  const started = React.useRef(false);
  const ref = React.useRef(null);
  React.useEffect(()=>{
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true;
        const t0=Date.now();
        const tick=()=>{
          const p=Math.min((Date.now()-t0)/dur,1);
          setN(Math.floor((1-Math.pow(1-p,3))*target));
          if(p<1)requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },{threshold:.4});
    if(ref.current)io.observe(ref.current);
    return()=>io.disconnect();
  },[target,dur]);
  return [n,ref];
};

const WA_URL = 'https://wa.me/5561996642909';
Object.assign(window,{Ic,ImgPH,Brow,Btn,Pill,W,useCountUp,WA_URL});
