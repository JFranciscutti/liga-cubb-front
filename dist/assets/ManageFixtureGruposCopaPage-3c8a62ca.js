import{aD as i,bn as m,a,bo as d,F as u,aH as p,q as s}from"./index-7564c5a3.js";import{C as c}from"./useSupenseQuery-2f1fe18d.js";import{u as g}from"./EquipoRepository-b3f38c97.js";import{u as l}from"./CampeonatoRepository-1824db64.js";import"./enums-ec95615b.js";import"./JugadoresRepository-8e4c7c21.js";const q=()=>{const e=i(),{themeStretch:t}=m(),{data:o,isLoading:r}=l(e.id||""),{data:f,isLoading:n}=g();return r||n?a(d,{}):a(u,{children:a(p,{maxWidth:t?!1:"lg",children:a(c,{heading:`${o.name} - Fixture de fase de grupos`,links:[{name:"Campeonatos",href:s.dashboard.campeonatos.list},{name:o.name,href:s.dashboard.campeonatos.manage(e.id)},{name:"Fixture de fase de grupos"}]})})})};export{q as default};