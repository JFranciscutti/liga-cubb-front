import{j as s,a,av as l,au as m,aA as c,F as d,W as u,A as h,T as o,ax as p,ay as i,L as w,a9 as P}from"./index-e0ec8746.js";import{P as f}from"./EmailInboxIcon-d2362d2e.js";import{u as b,o as y,H as g,C as x,b as v,d as F,c as S,a as A}from"./styles-07de506b.js";import{H}from"./HitTextField-e489ad45.js";import"./Select-1cf546fd.js";import"./Grid-e8368c00.js";import"./TextField-619215a7.js";import"./FormControl-e0285977.js";const R=S().shape({email:A().email("Email must be a valid email address").required("Email is required")}),k={email:""};function E({onSubmit:t}){const e=b({resolver:y(R),defaultValues:k});return s(g,{hf:e,onSubmit:t,children:[a(x,{name:"email",control:e.control,render:r=>a(H,{...r,label:"Email address"})}),a(v,{children:a(F,{children:" Send Request"})})]})}function $(){const{enqueueSnackbar:t}=l(),e=m(),r=c();return s(d,{children:[a(u,{children:s("title",{children:[" Reset Password | ",h]})}),a(f,{sx:{mb:5,height:96}}),a(o,{variant:"h3",paragraph:!0,children:"Forgot your password?"}),a(o,{sx:{color:"text.secondary",mb:5},children:"Please enter the email address associated with your account and We will email you a link to reset your password."}),a(E,{onSubmit:async n=>{await r.mutateAsync(n),t("Email sent!"),e(i.auth.resetPassword)}}),s(p,{to:i.auth.login,component:w,color:"inherit",variant:"subtitle2",sx:{mt:3,mx:"auto",alignItems:"center",display:"inline-flex"},children:[a(P,{icon:"eva:chevron-left-fill",width:16}),"Return to sign in"]})]})}export{$ as default};