import{aw as C,bl as x,j as s,a,q as t,T as i,r as h,b4 as y,bp as v,F as N,aG as S,S as k,B as F,z as P,b1 as z,bm as T,b2 as A}from"./index-c23903f8.js";import{C as D}from"./CustomBreadcrumbs-a5dcf113.js";import{c as E}from"./CategoriaRepository-204dc213.js";import{G as o}from"./Grid-e20c1929.js";import{C as l}from"./Card-9f0c7488.js";import{u as q}from"./CampeonatoRepository-8454b4e6.js";import{D as w}from"./DialogHeader-eae97665.js";import"./enums-ec95615b.js";import"./useSupenseQuery-b777e0ff.js";const B=({id:e})=>{var p;const n=C(),m=x(),{data:c}=E(e);return s(o,{container:!0,spacing:3,children:[a(o,{item:!0,xs:12,children:a(l,{sx:{p:2,cursor:"pointer"},onClick:()=>n(t.dashboard.campeonatos.manageEquiposCategoria(m.idCampeonato||"",m.idCategoria||"")),children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:"Equipos"}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:"Administra los equipos participantes de esta categoría"})]})})}),(p=c.phases)==null?void 0:p.map(r=>{var g,f;return a(o,{item:!0,xs:12,children:a(l,{sx:{p:2,cursor:"pointer"},onClick:()=>{var d;return n((d=u[r.type])==null?void 0:d.navigateTo(r.id))},children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:(g=u[r.type])==null?void 0:g.title}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:(f=u[r.type])==null?void 0:f.subtitle})]})})})})]})},u={general:{title:"Fixture actual",subtitle:"Administra el fixture de la fase regular",navigateTo:e=>t.dashboard.categorias.editFaseRegular(e)},playoff:{title:"Playoff",subtitle:"Administra el fixture de la fase de playoff",navigateTo:e=>t.dashboard.categorias.editFasePlayoff(e)}},W=()=>{var d;const e=x(),n=C(),[m,c]=h.useState(!1),{themeStretch:p}=y(),{data:r,isLoading:g}=q(e.idCampeonato||""),f=((d=r==null?void 0:r.categories)==null?void 0:d.filter(b=>b.id===e.idCategoria)[0].name)||"";return g?a(v,{}):(h.useEffect(()=>{localStorage.setItem("idCampeonato",e.idCampeonato||""),localStorage.setItem("idCategoria",e.idCategoria||"")},[e.idCampeonato]),s(N,{children:[s(S,{maxWidth:p?!1:"lg",children:[a(D,{heading:`Categoria ${f}`,links:[{name:"Campeonatos",href:t.dashboard.campeonatos.list},{name:"Categorías",href:t.dashboard.campeonatos.manage(e.idCampeonato||"")},{name:"Administrar"}],action:a(k,{flexDirection:"row",gap:5,children:a(F,{onClick:()=>c(!0),variant:"contained",startIcon:a(P,{icon:"eva:plus-fill"}),children:"Nueva fase"})})}),a(B,{id:e.idCategoria||""})]}),s(z,{open:m,onClose:()=>c(!1),PaperProps:{style:{width:"100%"}},children:[a(T,{children:a(w,{label:"Crear fase",onClick:()=>c(!1)})}),s(A,{sx:{display:"flex",flexDirection:"column",mb:4,width:"100%",gap:3},children:[a(o,{item:!0,xs:12,children:a(l,{className:"bg-sky-800",sx:{p:2,cursor:"pointer"},onClick:()=>n(t.dashboard.categorias.createFaseRegular(e.idCategoria||"")),children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:"Fase regular"}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:"Torneo regular, todos contra todos."})]})})}),a(o,{item:!0,xs:12,children:a(l,{className:"bg-sky-800",sx:{p:2,cursor:"pointer"},onClick:()=>n(t.dashboard.categorias.createFaseGrupos(e.idCategoria||"")),children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:"Fase de grupos"}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:"Fase de grupos para playoffs"})]})})}),a(o,{item:!0,xs:12,children:a(l,{className:"bg-sky-800",sx:{p:2,cursor:"pointer"},onClick:()=>n(t.dashboard.categorias.createFasePlayoff(e.idCategoria||"")),children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:"Fase Playoff"}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:"Cruces playoff"})]})})}),a(o,{item:!0,xs:12,children:a(l,{className:"bg-sky-800",sx:{p:2,cursor:"pointer"},onClick:()=>{},children:s("div",{className:"flex flex-col gap-2",children:[a(i,{fontSize:18,children:"Fase Cuadrangular"}),a(i,{variant:"subtitle1",className:"line-clamp-1",children:"Cuadrangular de descenso"})]})})}),a(o,{item:!0,xs:12,children:a(l,{className:"bg-sky-800",sx:{p:2,cursor:"pointer"},onClick:()=>{},children:a("div",{className:"flex flex-col gap-2",children:a(i,{fontSize:18,children:"Final del año"})})})})]})]})]}))};export{W as default};