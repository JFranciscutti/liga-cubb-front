import{aD as u,au as f,j as o,F as c,a as r,W as C,aH as h,ay as i,aL as n}from"./index-e0ec8746.js";import{C as g}from"./useSupenseQuery-df6877ce.js";import{h as y}from"./EquipoRepository-3ef6feef.js";import{C as P}from"./CreatePlayoff-02c441cb.js";import{u as q,g as v}from"./CampeonatoRepository-ce2c759f.js";import{C as x}from"./Card-76798bab.js";import"./JugadoresRepository-0cb78d17.js";import"./styles-07de506b.js";import"./Select-1cf546fd.js";import"./Grid-e8368c00.js";import"./compressor.esm-0f4ad7e4.js";import"./Image-07734c82.js";import"./HitSelectField-0476fdb4.js";import"./FormControl-e0285977.js";import"./CategoriaRepository-776d4995.js";const W=()=>{const e=u(),m=f(),{data:s}=q(e.id||""),{data:l,isLoading:E,isError:A,refetch:F}=y(e.id||""),d=v(),p=async t=>{if(t.filter(a=>a.team1===""&&a.team2==="").length>0){n({message:"No se puede guardar una fase sin partidos",variant:"error"});return}await d.mutateAsync({partidos:t.map(a=>({homeTeamId:a.team1||null,awayTeamId:a.team2||null})),cupId:e.id||""}),n({message:"Fase creada con éxito",variant:"success"}),m(-1)};return o(c,{children:[r(C,{children:o("title",{children:[s.name||"Copa"," | LIGA CUBB"]})}),o(h,{children:[r(g,{heading:`Playoff - ${s==null?void 0:s.name}`,links:[{name:"Listado",href:i.dashboard.campeonatos.list},{name:"Administrar",href:i.dashboard.campeonatos.manage(e.id||"")},{name:"Crear playoff"}]}),r(x,{sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:r(P,{equipos:l.teams||[],handleSave:p})})]})]})};export{W as default};
