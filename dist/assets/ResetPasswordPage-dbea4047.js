import{j as s,a as e,ax as l,aw as c,aA as d,F as m,W as u,A as h,T as o,p,q as i,L as w,z as P}from"./index-7564c5a3.js";import{P as f}from"./EmailInboxIcon-3df29023.js";import{u as b,o as g,H as x,C as y,b as F,d as S,c as v,a as A}from"./styles-3f44635e.js";import{H}from"./HitTextField-1715ae1e.js";import"./Select-801e906b.js";import"./Grid-e2d030a2.js";const R=v().shape({email:A().email("Email must be a valid email address").required("Email is required")}),k={email:""};function q({onSubmit:t}){const a=b({resolver:g(R),defaultValues:k});return s(x,{hf:a,onSubmit:t,children:[e(y,{name:"email",control:a.control,render:r=>e(H,{...r,label:"Email address"})}),e(F,{children:e(S,{children:" Send Request"})})]})}function N(){const{enqueueSnackbar:t}=l(),a=c(),r=d();return s(m,{children:[e(u,{children:s("title",{children:[" Reset Password | ",h]})}),e(f,{sx:{mb:5,height:96}}),e(o,{variant:"h3",paragraph:!0,children:"Forgot your password?"}),e(o,{sx:{color:"text.secondary",mb:5},children:"Please enter the email address associated with your account and We will email you a link to reset your password."}),e(q,{onSubmit:async n=>{await r.mutateAsync(n),t("Email sent!"),a(i.auth.resetPassword)}}),s(p,{to:i.auth.login,component:w,color:"inherit",variant:"subtitle2",sx:{mt:3,mx:"auto",alignItems:"center",display:"inline-flex"},children:[e(P,{icon:"eva:chevron-left-fill",width:16}),"Return to sign in"]})]})}export{N as default};