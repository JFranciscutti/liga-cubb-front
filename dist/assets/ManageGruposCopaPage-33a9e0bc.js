import{r as q,j as n,F as y,a as e,o as d,T as E,aE as j,B as S,I as T,bl as W,b4 as B,aF as P,bp as R,aG as O,q as _}from"./index-c23903f8.js";import{C as z}from"./CustomBreadcrumbs-a5dcf113.js";import{g as H}from"./EquipoRepository-600107ee.js";import{u as U}from"./CampeonatoRepository-8454b4e6.js";import{I as w}from"./Image-dd45a27b.js";import{r as Q,i as J,c as K,A as X,a as Y,d as Z,b as ee}from"./ExpandMore-65be29e9.js";import{E as ae}from"./EditMatchModal-7be0830c.js";import{G as N}from"./Grid-e20c1929.js";import{S as I,F as te}from"./Select-2d9d323e.js";import{C as re}from"./Card-9f0c7488.js";import"./enums-ec95615b.js";import"./useSupenseQuery-b777e0ff.js";import"./JugadoresRepository-576570e9.js";import"./yup-5bc9912e.js";import"./styles-bb773ccc.js";import"./CategoriaRepository-204dc213.js";import"./DialogHeader-eae97665.js";import"./HitMultiSelectField-54314fa9.js";import"./KeyboardArrowRight-cc03e53f.js";import"./Chip-98127efc.js";import"./InputAdornment-742361d8.js";import"./compressor.esm-3ab290a9.js";import"./HitNumberField-bc972176.js";import"./HitSelectField-52ff812e.js";import"./HitTextField-48ffeaee.js";var M={},se=J;Object.defineProperty(M,"__esModule",{value:!0});var L=M.default=void 0,le=se(Q()),ne=K,ie=(0,le.default)((0,ne.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");L=M.default=ie;const oe=({equipos:r,fechas:u,exists:s=!1})=>{const[f,i]=q.useState(!1),c=q.useRef(),[g,m]=q.useState(!1),v=p=>(x,h)=>{i(h?p:!1)};return n(y,{children:[e(d,{className:"w-full py-4 px-2",children:u.map((p,x)=>n(X,{expanded:f===x,onChange:v(x),children:[e(Y,{expandIcon:e(Z,{}),children:e(d,{className:"w-full flex justify-between items-center pr-10",children:e(E,{children:p.title})})}),e(ee,{className:"flex flex-col gap-4",children:p.partidos.map((h,C)=>n(N,{container:!0,className:"flex items-center justify-center gap-2",children:[e(N,{item:!0,xs:s?4:5,children:e(I,{fullWidth:!0,defaultValue:h.equipoLocal.id,disabled:s,children:r.map(o=>e(j,{value:o.id,children:n(d,{className:"flex items-center gap-2",children:[e(d,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(w,{src:o.logoUrl,className:"h-10 w-10 min-w-10"})}),e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap"},children:o.name})]})},o.id))})}),e(E,{children:"VS"}),e(N,{item:!0,xs:s?4:5,children:e(I,{fullWidth:!0,defaultValue:h.equipoVisitante.id,disabled:s,children:r.map(o=>e(j,{value:o.id,children:n(d,{className:"flex items-center gap-2",children:[e(d,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(w,{src:o.logoUrl,className:"h-10 w-10 min-w-10"})}),e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap"},children:o.name})]})},o.id))})}),s&&n(N,{item:!0,xs:3,className:"flex gap-2 justify-end",children:[e(S,{variant:"contained",onClick:()=>{c.current={dateNumber:x,homeTeam:h.equipoLocal,awayTeam:h.equipoVisitante},m(!0)},children:"Editar"}),e(S,{variant:"contained",children:"Ver"})]})]},C))})]},x))}),e(ae,{open:g,match:c.current,handleClose:()=>{m(!1),c.current=void 0},handleSave:()=>{}})]})},ce=r=>{const[u,s]=q.useState([]);q.useEffect(()=>{r.length>0&&f()},[r]);const f=()=>{const i=[];r.forEach((c,g)=>{const m=[...c.equipos],v=m.length;for(let p=0;p<v-1;p++){const x=[];for(let C=0;C<v/2;C++){const o=m[C],G=m[v-1-C];x.push({id:`${g}-${p}-${C}`,equipoLocal:o,equipoVisitante:G})}i.push({id:p+1,title:`Fecha ${p+1}`,groupId:g,partidos:x});const h=m.pop();h&&m.splice(1,0,h)}}),s(i)};return{fechas:u}},de=["2","3","4","6","8","12","16"],A=Array.from({length:18},(r,u)=>(u+1).toString()),ue=({equipos:r})=>{const u=de.filter(a=>r.length%Number(a)===0),[s,f]=q.useState(u[0]),[i,c]=q.useState(A.map((a,t)=>({id:t,label:a,equipos:[]}))),[g,m]=q.useState(null),[v,p]=q.useState(!1),x=a=>{const t=a.target.value;f(t);const l=A.slice(0,parseInt(t)).map((b,F)=>({id:F,label:b,equipos:[]}));c(l),m(null)},h=a=>{g&&(c(t=>t.map(l=>l.id===a?{...l,equipos:[...l.equipos,g]}:l)),m(null))},C=(a,t)=>{c(l=>l.map(b=>b.id===a?{...b,equipos:b.equipos.filter(F=>F!==t)}:b))},o=a=>i.some(t=>t.equipos.includes(a)),G=a=>{const t=i.find(l=>l.id===a);return t?t.equipos.length===r.length/Number(s):!1},k=()=>{const a=A.slice(0,parseInt(s)).map((l,b)=>({id:b,label:l,equipos:[]})),t=[...r];for(;t.length>0;)for(let l=0;l<parseInt(s)&&t.length!==0;l++){const b=t.splice(Math.floor(Math.random()*t.length),1)[0];a[l].equipos.push(b)}c(a)},D=()=>{p(!0)},V=a=>{console.log(a)},$=()=>{const a=r.length/Number(s);return i.every(t=>t.equipos.length===a)};return n(y,{children:[n(N,{container:!0,className:"p-6",gap:4,children:[e(N,{item:!0,xs:12,className:"grid grid-cols-8 gap-6 ",children:r.map(a=>n(d,{className:"flex flex-col gap-1 items-center",children:[e(w,{src:a.logo,className:`w-10 h-10 rounded-full bg-gray-100 cursor-pointer ${o(a)?"cursor-not-allowed opacity-50":g===a?"border-4 border-blue-500 ":""}`,onClick:()=>!o(a)&&m(a)}),o(a)&&e("p",{className:"text-red-500 text-xs",children:"Asignado"})]},a.id))}),n(N,{item:!0,xs:12,className:"flex justify-between w-full items-center",children:[n(d,{className:"flex flex-col justify-center gap-2",children:[e("p",{children:"Cantidad de grupos"}),e(te,{fullWidth:!0,children:e(I,{value:s,onChange:x,children:u.map(a=>e(j,{value:a,children:a},a))})})]}),e(d,{children:e(S,{variant:"contained",onClick:k,children:"Autocompletar al azar"})})]}),e(N,{container:!0,spacing:2,children:i.map(a=>parseInt(s)>=a.id+1&&e(N,{item:!0,xs:12/parseInt(s),children:n(d,{className:"flex flex-col p-4 border rounded-xl gap-4",children:[n("h3",{className:"font-bold text-xl text-center",children:["Grupo ",a.label]}),e("ul",{className:"flex flex-col gap-3",children:a.equipos.map((t,l)=>n("li",{className:"flex items-center justify-between w-full",children:[e(d,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(w,{src:t.logo,className:"h-10 w-10 min-w-10"})}),e("p",{className:"line-clamp-1 ",style:{whiteSpace:"nowrap"},children:t.name}),e(T,{onClick:()=>C(a.id,t),color:"secondary",children:e(L,{})})]},l))}),e(S,{fullWidth:!0,variant:"contained",onClick:()=>h(a.id),disabled:!g||o(g)||G(a.id),children:"Agregar equipo"})]})},a.id))}),e(N,{item:!0,xs:12,className:"flex justify-center",children:e(S,{variant:"contained",onClick:D,fullWidth:!0,sx:{p:2},disabled:!$(),children:"Guardar Grupos"})})]}),e(me,{grupos:i,enabled:v,handleSaveFechas:V})]})},me=({grupos:r,enabled:u=!1,handleSaveFechas:s})=>{const{fechas:f}=ce(r);return u?n(y,{children:[r.map(i=>n(d,{className:"flex flex-col gap-2 ",children:[e(d,{className:"flex bg-slate-100 rounded-sm w-full items-center justify-center",children:n(E,{sx:{color:"black"},children:["Fixture - Grupo ",i.label]})}),e(oe,{equipos:i.equipos,fechas:f.filter(c=>c.groupId===i.id)},i.id)]})),e(d,{children:e(S,{variant:"contained",onClick:()=>s(f),fullWidth:!0,sx:{p:2},children:"Guardar Grupos"})})]}):null},$e=()=>{const r=W(),{themeStretch:u}=B();P();const{data:s,isLoading:f}=U(localStorage.getItem("idCampeonato")||""),{data:i,isLoading:c}=H(r.id||"");return f||c?e(R,{}):e(y,{children:n(O,{maxWidth:u?!1:"lg",children:[e(z,{heading:`${s.name} - Fase de grupos`,links:[{name:"Listado",href:_.dashboard.categorias.list},{name:"Administrar",href:_.dashboard.campeonatos.manage(r.id||"")},{name:"Fase de grupos"}]}),e(re,{children:e(ue,{equipos:i.teams||[]})})]})})};export{$e as default};