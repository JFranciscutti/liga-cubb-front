var u=Object.defineProperty;var m=(t,e,a)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var n=(t,e,a)=>(m(t,typeof e!="symbol"?e+"":e,a),a);import{b5 as c,b0 as p,b6 as s}from"./index-c23903f8.js";import{u as r}from"./useSupenseQuery-b777e0ff.js";const l=t=>t;class y{constructor(){n(this,"keys",{all:()=>["campeonatos"],one:e=>["campeonatos",e]});n(this,"getAll",async()=>{const{data:e}=await s.get("tournament/all");return e.map(l)});n(this,"get",async e=>{const{data:a}=await s.get(`tournament?tournamentId=${e}`);return a});n(this,"create",e=>s.post("tournament",e));n(this,"edit",async e=>s.put("campeonatos/"+e.id,{name:e.name}));n(this,"remove",async e=>s.delete("campeonatos/"+e))}}const o=new y,g=()=>r({queryKey:o.keys.all(),queryFn:o.getAll}),q=t=>r({queryKey:o.keys.one(t),queryFn:()=>o.get(t)}),Q=()=>{const t=c();return p({mutationFn:o.create,onSuccess:()=>{t.invalidateQueries(o.keys.all())}})};export{g as a,Q as b,q as u};