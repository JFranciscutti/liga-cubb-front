import{j as a,a as e,au as l,av as d,aC as m,F as u,W as h,A as f,T as r,ax as n,ay as s,L as y,a9 as b}from"./index-e0ec8746.js";import{E as p}from"./EmailInboxIcon-d2362d2e.js";import{u as v,o as g,H as x,C,b as F,d as S,c as A,a as H}from"./styles-07de506b.js";import{H as V}from"./HitNumberField-d5d983f8.js";import"./Select-1cf546fd.js";import"./Grid-e8368c00.js";import"./TextField-619215a7.js";import"./FormControl-e0285977.js";const k=A().shape({code:H().required("Code is required")}),P={code:""};function I({onSubmit:i}){const o=v({mode:"onBlur",resolver:g(k),defaultValues:P});return a(x,{hf:o,onSubmit:i,children:[e(C,{name:"code",control:o.control,render:t=>e(V,{...t,label:"Code"})}),e(F,{children:e(S,{children:"Verify"})})]})}function R(){const i=l(),{enqueueSnackbar:o}=d(),t=m();return a(u,{children:[e(h,{children:a("title",{children:[" Verify Code | ",f]})}),e(p,{sx:{mb:5,height:96}}),e(r,{variant:"h3",paragraph:!0,children:"Please check your email!"}),e(r,{sx:{color:"text.secondary",mb:5},children:"We have emailed a 6-digit confirmation code, please enter the code in below box to verify your email."}),e(I,{onSubmit:async c=>{await t.mutateAsync(c),o({message:"Code verified!"}),i(s.auth.login)}}),a(r,{variant:"body2",sx:{my:3},children:["Don’t have a code?  ",e(n,{variant:"subtitle2",children:"Resend code"})]}),a(n,{to:s.auth.login,component:y,color:"inherit",variant:"subtitle2",sx:{mx:"auto",alignItems:"center",display:"inline-flex"},children:[e(b,{icon:"eva:chevron-left-fill",width:16}),"Return to sign in"]})]})}export{R as default};