import{j as s,a as e,ax as l,aw as m,aA as c,F as d,W as u,A as h,T as o,p,q as i,L as w,z as f}from"./index-c23903f8.js";import{P}from"./PlanPremiumIcon-57b4212e.js";import{o as b,c as g,a as x}from"./yup-5bc9912e.js";import{u as y,H as F,C as S,a as v,b as A}from"./styles-bb773ccc.js";import{H}from"./HitTextField-48ffeaee.js";import"./Select-2d9d323e.js";import"./Grid-e20c1929.js";const R=g().shape({email:x().email("Email must be a valid email address").required("Email is required")}),k={email:""};function q({onSubmit:t}){const a=y({resolver:b(R),defaultValues:k});return s(F,{hf:a,onSubmit:t,children:[e(S,{name:"email",control:a.control,render:r=>e(H,{...r,label:"Email address"})}),e(v,{children:e(A,{children:" Send Request"})})]})}function W(){const{enqueueSnackbar:t}=l(),a=m(),r=c();return s(d,{children:[e(u,{children:s("title",{children:[" Reset Password | ",h]})}),e(P,{sx:{mb:5,height:96}}),e(o,{variant:"h3",paragraph:!0,children:"Forgot your password?"}),e(o,{sx:{color:"text.secondary",mb:5},children:"Please enter the email address associated with your account and We will email you a link to reset your password."}),e(q,{onSubmit:async n=>{await r.mutateAsync(n),t("Email sent!"),a(i.auth.resetPassword)}}),s(p,{to:i.auth.login,component:w,color:"inherit",variant:"subtitle2",sx:{mt:3,mx:"auto",alignItems:"center",display:"inline-flex"},children:[e(f,{icon:"eva:chevron-left-fill",width:16}),"Return to sign in"]})]})}export{W as default};