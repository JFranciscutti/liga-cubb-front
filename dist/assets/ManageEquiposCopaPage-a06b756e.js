import{bl as d,b4 as f,aF as g,r as h,a,bp as C,j as i,F as q,aG as b,q as r,B as E,z as y,b1 as D,bm as S,b2 as x,bn as L}from"./index-c23903f8.js";import{D as A}from"./DialogHeader-eae97665.js";import{C as P}from"./CustomBreadcrumbs-a5dcf113.js";import{E as k}from"./EquipoDataGrid-2fd658b1.js";import{f as v,g as B}from"./EquipoRepository-600107ee.js";import{u as F}from"./CampeonatoRepository-8454b4e6.js";import{N as j}from"./NuevoEquipoForm-cf7d32f3.js";import{C as w}from"./Card-9f0c7488.js";import"./styles-bb773ccc.js";import"./Select-2d9d323e.js";import"./Grid-e20c1929.js";import"./useTableQuery-989755fa.js";import"./Autocomplete-cd9cc086.js";import"./Close-206562f3.js";import"./Chip-98127efc.js";import"./KeyboardArrowRight-cc03e53f.js";import"./compressor.esm-3ab290a9.js";import"./Image-dd45a27b.js";import"./HitTextField-48ffeaee.js";import"./enums-ec95615b.js";import"./useSupenseQuery-b777e0ff.js";import"./JugadoresRepository-576570e9.js";import"./yup-5bc9912e.js";const ra=()=>{const o=d(),{themeStretch:n}=f(),m=g(),[p,e]=h.useState(!1),c=v(),{data:l,isLoading:I,isError:M,refetch:N}=B(o.id||""),{data:s,isLoading:u}=F(o.id||"");return u?a(C,{}):i(q,{children:[i(b,{maxWidth:n?!1:"lg",children:[a(P,{heading:`${s.name} - Lista de equipos`,links:[{name:"Campeonatos",href:r.dashboard.campeonatos.list},{name:s.name,href:r.dashboard.campeonatos.manage(o.id)},{name:"Administrar equipos"}],action:a(E,{onClick:()=>e(!0),variant:"contained",startIcon:a(y,{icon:"eva:plus-fill"}),children:"Agregar equipo"})}),a(w,{children:a(k,{data:l.teams||[],isLoading:!1,onDelete:t=>m({action:async()=>{}})})})]}),i(D,{open:p,onClose:()=>e(!1),PaperProps:{style:{width:"100%"}},children:[a(S,{children:a(A,{label:"Nuevo equipo",onClick:()=>e(!1)})}),a(x,{sx:{mb:4,width:"100%"},children:a(j,{onSubmit:async t=>await c.mutateAsync({logo:t.image,name:t.name,cupId:o.id},{onSuccess:async()=>{L({variant:"success",message:"Equipo creado correctamente"}),e(!1)}})})})]})]})};export{ra as default};