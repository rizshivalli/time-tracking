(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"8hnO":function(h,v,a){h.exports={main:"main___z2rB9",password:"password___ZMOPB",getCaptcha:"getCaptcha___2peIs",submit:"submit___3jW-_",login:"login___1DpoD",success:"success___21deq",warning:"warning___335xL",error:"error___3FrK8","progress-pass":"progress-pass___12Bo_",progress:"progress___1RHrR"}},"InR/":function(h,v,a){"use strict";a.r(v);var k=a("+L6B"),L=a("2/Rp"),ee=a("Q9mQ"),T=a("diRs"),ae=a("5NDa"),c=a("5rEg"),te=a("MXD1"),j=a("CFYs"),f=a("k1fw"),se=a("miYZ"),D=a("tsqr"),p=a("tJVT"),re=a("y8nQ"),O=a("Vl3Y"),u=a("q1tI"),e=a.n(u),i=a("9kvl"),w=a("55Ip"),U=a("8hnO"),o=a.n(U),_=O.a.Item,W={ok:e.a.createElement("div",{className:o.a.success},e.a.createElement(i.a,{id:"teamRegister.strength.strong"})),pass:e.a.createElement("div",{className:o.a.warning},e.a.createElement(i.a,{id:"teamRegister.strength.medium"})),poor:e.a.createElement("div",{className:o.a.error},e.a.createElement(i.a,{id:"teamRegister.strength.short"}))},A={ok:"success",pass:"normal",poor:"exception"},F=function(g){var M=g.submitting,C=g.dispatch,E=g.teamRegister,K=g.location,N=Object(u.useState)(K.query),S=Object(p.a)(N,1),s=S[0];console.log("\u{1F680} ~ file: index.tsx ~ line 56 ~ code",s);var l=Object(i.f)(),V=Object(u.useState)(!1),I=Object(p.a)(V,2),R=I[0],y=I[1],z=Object(u.useState)(!1),b=Object(p.a)(z,2),x=b[0],J=b[1],Q=!1,Y,Z=O.a.useForm(),$=Object(p.a)(Z,1),m=$[0];Object(u.useEffect)(function(){if(!!E){var d=m.getFieldValue("email");if(E.status==="ok")D.default.success("Registration Successfull"),i.d.push({pathname:"/user/register-result",state:{account:d}});else{E.status&&D.default.error(E.status,10);return}return function(){C({type:"teamRegister/reset"})}}},[E]),Object(u.useEffect)(function(){return function(){clearInterval(Y)}},[]);var B=function(){var t=m.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},H=function(t){var r={organisation_members:JSON.parse("[".concat(s.omId,"]"))},n=Object(f.a)(Object(f.a)({},t),r);delete n.organisationName,console.log("\u{1F680} ~ file: index.tsx ~ line 116 ~ onFinish ~ finalValues",n),C({type:"teamRegister/submit",payload:Object(f.a)({},n)})},X=function(t,r){var n=Promise;return r&&r!==m.getFieldValue("password")?n.reject(l.formatMessage({id:"teamRegister.password.twice"})):n.resolve()},G=function(t,r){var n=Promise;return r?(R||y(!!r),J(!x),r.length<6?n.reject(""):(r&&Q&&m.validateFields(["confirm_password"]),n.resolve())):(y(!!r),n.reject(l.formatMessage({id:"teamRegister.password.required"})))},q=function(){var t=m.getFieldValue("password"),r=B();return t&&t.length?e.a.createElement("div",{className:o.a["progress-".concat(r)]},e.a.createElement(j.a,{status:A[r],className:o.a.progress,strokeWidth:6,percent:t.length*10>100?100:t.length*10,showInfo:!1})):null};return e.a.createElement("div",{className:o.a.main},e.a.createElement("h3",null,e.a.createElement(i.a,{id:"teamRegister.register.register"})),e.a.createElement(O.a,{form:m,name:"UserRegister",onFinish:H},e.a.createElement(_,{name:"first_name",initialValue:s==null?void 0:s.first_name,rules:[{required:!0,message:"First Name required"}]},e.a.createElement(c.a,{size:"large",placeholder:"First Name"})),e.a.createElement(_,{name:"last_name",initialValue:s==null?void 0:s.last_name,rules:[{required:!0,message:"Last Name required"}]},e.a.createElement(c.a,{size:"large",placeholder:"Last Name"})),e.a.createElement(_,{name:"organisationName",initialValue:s==null?void 0:s.org_name,rules:[{required:!0,message:"Company required"}]},e.a.createElement(c.a,{disabled:!0,size:"large",placeholder:"Company"})),e.a.createElement(_,{name:"email",initialValue:s==null?void 0:s.email,rules:[{required:!0,message:l.formatMessage({id:"teamRegister.email.required"})},{type:"email",message:l.formatMessage({id:"teamRegister.email.wrong-format"})}]},e.a.createElement(c.a,{disabled:!0,size:"large",placeholder:l.formatMessage({id:"teamRegister.email.placeholder"})})),e.a.createElement(T.a,{getPopupContainer:function(t){return t&&t.parentNode?t.parentNode:t},content:R&&e.a.createElement("div",{style:{padding:"4px 0"}},W[B()],q(),e.a.createElement("div",{style:{marginTop:10}},e.a.createElement(i.a,{id:"teamRegister.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:R},e.a.createElement(_,{name:"password",className:m.getFieldValue("password")&&m.getFieldValue("password").length>0&&o.a.password,rules:[{validator:G}]},e.a.createElement(c.a,{size:"large",type:"password",placeholder:l.formatMessage({id:"teamRegister.password.placeholder"})}))),e.a.createElement(_,{name:"confirm_password",rules:[{required:!0,message:l.formatMessage({id:"teamRegister.confirm-password.required"})},{validator:X}]},e.a.createElement(c.a,{size:"large",type:"password",placeholder:l.formatMessage({id:"teamRegister.confirm-password.placeholder"})})),e.a.createElement(_,null,e.a.createElement(L.a,{size:"large",loading:M,className:o.a.submit,type:"primary",htmlType:"submit"},e.a.createElement(i.a,{id:"teamRegister.register.register"})),e.a.createElement(w.a,{className:o.a.login,to:"/user/login"},e.a.createElement(i.a,{id:"teamRegister.register.sign-in"})))))};v.default=Object(i.b)(function(P){var g=P.teamRegister,M=P.loading;return{teamRegister:g,submitting:M.effects["teamRegister/submit"]}})(F)}}]);