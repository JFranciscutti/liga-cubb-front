import{r as d,a as e,bN as b,j as t,F as y,o as u,T as C,B as p,bl as S,W as j,aG as F,q as f,I as h,z as x}from"./index-c23903f8.js";import{C as E}from"./CustomBreadcrumbs-a5dcf113.js";import{I as g}from"./Image-dd45a27b.js";import{E as I}from"./EditMatchModal-7be0830c.js";import{C as w}from"./Card-9f0c7488.js";import{G as n}from"./Grid-e20c1929.js";import{g as q}from"./CategoriaRepository-204dc213.js";import"./yup-5bc9912e.js";import"./styles-bb773ccc.js";import"./Select-2d9d323e.js";import"./DialogHeader-eae97665.js";import"./HitMultiSelectField-54314fa9.js";import"./KeyboardArrowRight-cc03e53f.js";import"./Chip-98127efc.js";import"./InputAdornment-742361d8.js";import"./compressor.esm-3ab290a9.js";import"./HitNumberField-bc972176.js";import"./HitSelectField-52ff812e.js";import"./HitTextField-48ffeaee.js";import"./enums-ec95615b.js";import"./useSupenseQuery-b777e0ff.js";const B=({fecha:l,isLoading:i})=>{const r=d.useRef(),[o,s]=d.useState(!1);return i?e(b,{}):t(y,{children:[e(w,{className:"flex flex-col gap-6 w-full py-4 px-2",children:l.map((a,c)=>t(n,{container:!0,className:"flex items-center gap-2 justify-between",children:[t(n,{item:!0,xs:9,className:"flex items-center justify-between w-full",children:[t(n,{item:!0,className:"flex items-center gap-2",style:{flex:1},children:[e(u,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(g,{src:a.equipoLocal.logoUrl,className:"h-10 w-10 min-w-10"})}),e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap"},children:a.equipoLocal.name})]}),e(n,{item:!0,className:"flex items-center justify-center",style:{flexShrink:0,minWidth:"50px"},children:e(C,{children:"VS"})}),t(n,{item:!0,className:"flex items-center gap-2",style:{flex:1,justifyContent:"flex-end"},children:[e("p",{className:"line-clamp-1",style:{whiteSpace:"nowrap",textAlign:"right"},children:a.equipoVisitante.name}),e(u,{className:"flex items-center justify-center h-10 min-w-10 rounded-full bg-gray-50",children:e(g,{src:a.equipoVisitante.logoUrl,className:"h-10 w-10 min-w-10"})})]})]}),t(n,{item:!0,xs:2,className:"flex gap-2 justify-end",children:[e(p,{variant:"contained",onClick:()=>{r.current={homeTeam:a.equipoLocal.id,awayTeam:a.equipoVisitante.id},s(!0)},children:"Editar"}),e(p,{variant:"contained",children:"Ver"})]})]},c))}),e(I,{open:o,match:r.current,handleClose:()=>{s(!1),r.current=void 0},handleSave:()=>{}})]})},L=B;function Z(){const l=S(),[i,r]=d.useState(1),{data:o,isLoading:s,isError:a}=q(l.id||"",i),c=localStorage.getItem("idCampeonato")||"",N=localStorage.getItem("idCategoria")||"";return t(y,{children:[e(j,{children:e("title",{children:"Equipos | LIGA CUBB"})}),t(F,{children:[e(E,{heading:"Fixture - Categoria",links:[{name:"Listado",href:f.dashboard.categorias.list},{name:"Administrar",href:f.dashboard.campeonatos.manageCategoria(c,N)},{name:"Fixture"}]}),t(w,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[t(u,{className:"flex w-full p-4 justify-between items-center",children:[e(h,{disabled:i===1,onClick:()=>r(m=>m-1),children:e(x,{icon:"ion:caret-back"})}),t(C,{className:"font-bold",children:["Fecha ",i]}),e(h,{disabled:i===15,onClick:()=>r(m=>m+1),children:e(x,{icon:"ion:caret-forward"})})]}),e(L,{fecha:o||[],isLoading:s})]})]})]})}export{Z as default};