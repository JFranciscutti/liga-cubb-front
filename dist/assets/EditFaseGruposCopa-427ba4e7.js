import{b3 as B,a as e,F,j as s,aI as $,aJ as M,aK as A,T as g,D as j,o as m,S as C,I as N,z as q,r as L,aD as E,bN as R,B as P,W as V,aH as O,q as S}from"./index-7564c5a3.js";import{C as J}from"./useSupenseQuery-2f1fe18d.js";import{e as Q,f as z,u as W}from"./CampeonatoRepository-1824db64.js";import{I as v}from"./Image-6bd31657.js";import{c as K,a as n,j as H,i as y,u as U,o as X,k as I,H as Z,C as d,b as _,d as ee}from"./styles-3f44635e.js";import{D as ae}from"./DialogHeader-b66d443c.js";import{H as G,a as re,c as le}from"./canchas-f9c46237.js";import"./compressor.esm-bc452357.js";import{H as D}from"./HitNumberField-dd450b14.js";import{H as x}from"./HitSelectField-dd9c2783.js";import{H as se}from"./HitTextField-1715ae1e.js";import{G as a}from"./Grid-e2d030a2.js";import{C as Y}from"./Card-33a9d174.js";import"./Select-801e906b.js";import"./KeyboardArrowRight-15df010f.js";import"./InputAdornment-1d356a85.js";const ie=K().shape({date:n().required(),dateNumber:H().required(),homeTeam:n().required(),awayTeam:n().required(),field:n().required(),linemenTeam:n().required(),scorer:n().required(),comments:n().optional(),homeTeamGoals:H().required().min(0),awayTeamGoals:H().required().min(0),homeTeamPlayerGoals:y().of(n()).required(),awayTeamPlayerGoals:y().of(n()).required(),homeTeamYellowCards:y().of(n()).required(),awayTeamYellowCards:y().of(n()).required(),homeTeamRedCards:y().of(n()).required(),awayTeamRedCards:y().of(n()).required()}),k={date:B(),dateNumber:0,homeTeam:"",awayTeam:"",field:"",linemenTeam:"",scorer:"",comments:"",homeTeamGoals:"0",awayTeamGoals:"0",homeTeamPlayerGoals:[{playerId:"",goals:0}],awayTeamPlayerGoals:[{playerId:"",goals:0}],homeTeamYellowCards:[],homeTeamRedCards:[],awayTeamYellowCards:[],awayTeamRedCards:[]},oe=({open:b,match:i,handleClose:u,handleSave:T})=>{const{data:t}=Q(i==null?void 0:i.homeTeam,i==null?void 0:i.awayTeam,(i==null?void 0:i.phaseId)||"",!!(i!=null&&i.homeTeam)&&!!i.awayTeam),r=U({resolver:X(ie),defaultValues:k,values:k,mode:"onBlur"}),o=I({control:r.control,name:"homeTeamPlayerGoals"}),c=I({control:r.control,name:"awayTeamPlayerGoals"}),w=async l=>{T(l)};return t?s($,{open:b,onClose:u,PaperProps:{style:{width:"100%"}},children:[e(M,{children:e(ae,{label:`Editar partido - Fecha ${t.dateNumber}`,onClick:u})}),e(A,{sx:{width:"100%",height:"100%"},children:e(a,{container:!0,sx:{py:5,px:2},children:s(Z,{hf:r,onSubmit:w,children:[s(a,{container:!0,spacing:2,justifyContent:"center",children:[s(a,{item:!0,xs:12,className:"flex justify-between",children:[s(a,{item:!0,xs:4,className:"flex gap-2",children:[e(a,{item:!0,children:e(v,{src:t.homeTeam.logo})}),e(g,{variant:"h6",align:"center",children:t.homeTeam.name})]}),e(a,{item:!0,xs:1,children:e(g,{variant:"h6",align:"center",children:"VS"})}),s(a,{item:!0,xs:4,className:"flex flex-row-reverse gap-2",children:[e(a,{item:!0,children:e(v,{src:t.awayTeam.logo})}),e(g,{variant:"h6",align:"center",children:t.awayTeam.name})]})]}),e(a,{item:!0,xs:12,children:e(j,{sx:{bgcolor:"gray"}})}),s(a,{item:!0,xs:12,className:"flex flex-col gap-5",children:[e(m,{className:"flex w-full justify-center",children:e(g,{className:"font-bold",children:"Goles local"})}),o.fields.map((l,h)=>s(C,{spacing:2,direction:"row",children:[e(d,{name:`homeTeamPlayerGoals.${h}.playerId`,control:r.control,rules:{required:!0},render:f=>e(x,{...f,label:"Jugador",floatingLabel:!1,options:t.homeTeam.players.map(p=>({value:p.membershipNumber,label:p.name+" "+p.lastName}))||[]})}),e(d,{name:`homeTeamPlayerGoals.${h}.goals`,control:r.control,rules:{required:!0},render:f=>e(D,{...f,label:"Goles",floatingLabel:!1})}),s(C,{alignSelf:"flex-end",children:[e(N,{disabled:o.fields.length===1,onClick:()=>o.remove(h),children:e(q,{style:{width:22,height:22},icon:"ic:outline-delete"})}),e(m,{className:"flex justify-end w-full",children:e(N,{onClick:()=>o.append({playerId:"",goals:0}),children:e(q,{style:{width:22,height:22},icon:"material-symbols:add-box-outline-rounded"})})})]})]},l.id))]}),e(a,{item:!0,xs:12,children:e(j,{sx:{bgcolor:"gray"}})}),s(a,{item:!0,xs:12,className:"flex flex-col gap-5",children:[e(m,{className:"flex w-full justify-center",children:e(g,{className:"font-bold",children:"Goles visitante"})}),c.fields.map((l,h)=>s(C,{spacing:2,direction:"row",children:[e(d,{name:`awayTeamPlayerGoals.${h}.playerId`,control:r.control,rules:{required:!0},render:f=>e(x,{...f,label:"Jugador",floatingLabel:!1,options:t.awayTeam.players.map(p=>({value:p.membershipNumber,label:p.name+" "+p.lastName}))||[]})}),e(d,{name:`awayTeamPlayerGoals.${h}.goals`,control:r.control,rules:{required:!0},render:f=>e(D,{...f,label:"Goles",floatingLabel:!1})}),s(C,{alignSelf:"flex-end",children:[e(N,{disabled:c.fields.length===1,onClick:()=>c.remove(h),children:e(q,{style:{width:22,height:22},icon:"ic:outline-delete"})}),e(m,{className:"flex justify-end w-full",children:e(N,{onClick:()=>c.append({playerId:"",goals:0}),children:e(q,{style:{width:22,height:22},icon:"material-symbols:add-box-outline-rounded"})})})]})]},l.id))]}),e(a,{item:!0,xs:12,children:e(j,{sx:{bgcolor:"gray"}})}),e(a,{item:!0,xs:6,children:e(d,{name:"homeTeamYellowCards",control:r.control,rules:{required:!0},render:l=>e(G,{...l,label:"Tarjetas amarillas - Local",floatingLabel:!1,options:[]})})}),e(a,{item:!0,xs:6,children:e(d,{name:"awayTeamYellowCards",control:r.control,rules:{required:!0},render:l=>e(G,{...l,label:"Tarjetas amarillas - Visitante",floatingLabel:!1,options:[]})})}),e(a,{item:!0,xs:6,children:e(d,{name:"homeTeamRedCards",control:r.control,rules:{required:!0},render:l=>e(G,{...l,label:"Tarjetas rojas - Local",floatingLabel:!1,options:[]})})}),e(a,{item:!0,xs:6,children:e(d,{name:"awayTeamRedCards",control:r.control,rules:{required:!0},render:l=>e(G,{...l,label:"Tarjetas rojas - Visitante",floatingLabel:!1,options:[]})})}),e(a,{item:!0,xs:12,children:e(j,{sx:{bgcolor:"gray"}})}),e(a,{item:!0,xs:12,children:e(d,{name:"date",control:r.control,rules:{required:!0},render:l=>e(re,{...l,label:"Fecha y hora de inicio",floatingLabel:!1,disablePast:!0,format:"DD/MM/YYYY - HH:mm"})})}),e(a,{item:!0,xs:12,children:e(d,{name:"field",control:r.control,rules:{required:!0},render:l=>e(x,{...l,label:"Cancha",floatingLabel:!1,options:le.canchas||[]})})}),e(a,{item:!0,xs:6,children:e(d,{name:"linemenTeam",control:r.control,rules:{required:!0},render:l=>e(x,{...l,label:"Equipo linea",floatingLabel:!1,options:[{value:"ajsdjas",label:"ajsdjas"},{value:"jajdsfjas",label:"jajdsfjas"}]})})}),e(a,{item:!0,xs:6,children:e(d,{name:"scorer",control:r.control,rules:{required:!0},render:l=>e(x,{...l,label:"Equipo planillero",floatingLabel:!1,options:[{value:"ajsdjas",label:"ajsdjas"},{value:"jajdsfjas",label:"jajdsfjas"}]})})}),e(a,{item:!0,xs:12,children:e(d,{name:"comments",control:r.control,rules:{required:!0},render:l=>e(se,{...l,label:"Comentarios",floatingLabel:!1,multiline:!0})})})]}),e(_,{children:e(ee,{children:"Actualizar información"})})]})})})]}):e(F,{})},te=({partidos:b,isLoading:i})=>{const u=L.useRef(),{idFase:T}=E(),[t,r]=L.useState(!1);return i?e(R,{}):s(F,{children:[e(Y,{className:"flex flex-col gap-6 w-full py-4 px-2",children:b.map((o,c)=>s(a,{container:!0,className:"flex items-center gap-2 justify-between",children:[s(a,{item:!0,xs:9,className:"flex items-center justify-between w-full",children:[s(a,{item:!0,className:"flex items-center gap-2",style:{flex:1},children:[e(m,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(v,{src:o.homeTeam.logo,className:"h-10 w-10 min-w-10"})}),e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap"},children:o.homeTeam.name})]}),e(a,{item:!0,className:"flex items-center justify-center",style:{flexShrink:0,minWidth:"50px"},children:e(g,{children:"VS"})}),s(a,{item:!0,className:"flex items-center gap-2",style:{flex:1,justifyContent:"flex-end"},children:[e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap",textAlign:"right"},children:o.awayTeam.name}),e(m,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(v,{src:o.awayTeam.logo,className:"h-10 w-10 min-w-10"})})]})]}),s(a,{item:!0,xs:2,className:"flex gap-2 justify-end",children:[e(P,{variant:"contained",onClick:()=>{u.current={homeTeam:o.homeTeam.id,awayTeam:o.awayTeam.id,phaseId:T||""},r(!0)},children:"Editar"}),e(P,{variant:"contained",children:"Ver"})]})]},c))}),e(oe,{open:t,match:u.current,handleClose:()=>{r(!1),u.current=void 0},handleSave:o=>{console.log(o)}})]})},Ne=()=>{const b=E(),{data:i,isLoading:u,isError:T}=z(b.idFase||""),t=localStorage.getItem("idCampeonato")||"",{data:r}=W(t);return s(F,{children:[e(V,{children:e("title",{children:"Fase de Grupos | LIGA CUBB"})}),s(O,{children:[e(J,{heading:`Fase de Grupos - ${r==null?void 0:r.name}`,links:[{name:"Listado",href:S.dashboard.categorias.list},{name:"Administrar",href:S.dashboard.campeonatos.manage(t)},{name:"Fase de Grupos"}]}),e(Y,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2},children:i.map((o,c)=>s(F,{children:[s(m,{children:["Grupo ",o.name]},c),e(m,{children:o.teams.map(w=>e(m,{children:w.name},w.id))}),e(te,{partidos:o.matches,isLoading:!1})]}))})]})]})};export{Ne as default};