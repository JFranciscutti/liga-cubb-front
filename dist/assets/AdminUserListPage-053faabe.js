import{r as s,a as e,F as c,I as H,z as t,j as r,o as F,aD as b,aE as l,L as m,q as u,aF as B,W as L,aG as x,B as A}from"./index-c23903f8.js";import{C as R}from"./CustomBreadcrumbs-a5dcf113.js";import{u as E,d as I,C as d,a as y}from"./styles-bb773ccc.js";import{u as D,H as S,a as U,b as k}from"./useTableQuery-989755fa.js";import"./compressor.esm-3ab290a9.js";import"./Image-dd45a27b.js";import{H as G}from"./HitMultiAutocompleteField-e400a5cc.js";import{H as P}from"./HitTextField-48ffeaee.js";import{R as N}from"./User-a9673eb1.js";import{C as j}from"./Card-9f0c7488.js";import"./Select-2d9d323e.js";import"./Grid-e20c1929.js";import"./Autocomplete-cd9cc086.js";import"./Close-206562f3.js";import"./Chip-98127efc.js";import"./KeyboardArrowRight-cc03e53f.js";const w=({data:a,isLoading:p,onDelete:f})=>{const h=E({defaultValues:{email:"",roles:[]}}),[C,n]=s.useState(null),o=s.useRef(),g=D([{field:"email",headerName:"Email",type:"string"},{field:"roles",headerName:"Roles",type:"array",renderAs:"badge"},{field:"action",headerName:"Actions",type:"actions",renderCell:i=>e(c,{children:e(H,{onClick:v=>{o.current=String(i.id)||"",n(v.currentTarget)},children:e(t,{icon:"eva:more-vertical-fill"})})})}]);return r(F,{sx:{height:600},children:[e(S,{filter:{hf:h,render:r(I,{children:[e(d,{name:"email",render:i=>e(P,{...i,label:"Email"})}),e(d,{name:"roles",render:i=>e(G,{...i,label:"Roles",options:N})}),r(y,{children:[e(U,{}),e(k,{})]})]})},disableRowSelectionOnClick:!0,rows:a,columns:g}),r(b,{open:C,onClose:()=>{n(null),o.current=void 0},arrow:"right-top",children:[r(l,{onClick:()=>{n(null),f(o.current)},sx:{color:"error.main"},children:[e(t,{icon:"eva:trash-2-outline"}),"Eliminar"]}),r(l,{component:m,to:u.dashboard.categorias.edit(o.current),children:[e(t,{icon:"eva:edit-fill"}),"Editar"]})]})]})};function re(){const a=B();return r(c,{children:[e(L,{children:e("title",{children:"Usuarios | LIGA CUBB"})}),r(x,{children:[e(R,{heading:"Listado - Usuarios",links:[{name:"Listado"}],action:e(A,{to:u.dashboard.usuarios.create,component:m,variant:"contained",startIcon:e(t,{icon:"eva:plus-fill"}),children:"Nuevo Usuario"})}),e(j,{children:e(w,{data:[],isLoading:!1,onDelete:p=>a({action:async()=>{}})})})]})]})}export{re as AdminUserListPage,re as default};