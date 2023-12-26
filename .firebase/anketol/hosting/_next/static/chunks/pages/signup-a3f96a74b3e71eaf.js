(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[616],{7741:function(e,t,n){"use strict";n.d(t,{zx:function(){return g}});var a=n(7294),r=n(6734),l=n(7976),i=n(4520),s=n(8387),o=n(5610),c=(...e)=>e.filter(Boolean).join(" "),u=e=>e?"":void 0,[m,d]=(0,s.k)({strict:!1,name:"ButtonGroupContext"});function p(e){let{children:t,className:n,...r}=e,i=(0,a.isValidElement)(t)?(0,a.cloneElement)(t,{"aria-hidden":!0,focusable:!1}):t,s=c("chakra-button__icon",n);return a.createElement(l.m$.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...r,className:s},i)}function f(e){let{label:t,placement:n,spacing:r="0.5rem",children:i=a.createElement(o.$,{color:"currentColor",width:"1em",height:"1em"}),className:s,__css:u,...m}=e,d=c("chakra-button__spinner",s),p="start"===n?"marginEnd":"marginStart",f=(0,a.useMemo)(()=>({display:"flex",alignItems:"center",position:t?"relative":"absolute",[p]:t?r:0,fontSize:"1em",lineHeight:"normal",...u}),[u,t,p,r]);return a.createElement(l.m$.div,{className:d,...m,__css:f},i)}p.displayName="ButtonIcon",f.displayName="ButtonSpinner";var g=(0,l.Gp)((e,t)=>{let n=d(),s=(0,l.mq)("Button",{...n,...e}),{isDisabled:o=null==n?void 0:n.isDisabled,isLoading:m,isActive:p,children:g,leftIcon:y,rightIcon:b,loadingText:_,iconSpacing:x="0.5rem",type:E,spinner:v,spinnerPlacement:N="start",className:w,as:j,...k}=(0,i.Lr)(e),S=(0,a.useMemo)(()=>{let e={...null==s?void 0:s._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...s,...!!n&&{_focus:e}}},[s,n]),{ref:B,type:$}=function(e){let[t,n]=(0,a.useState)(!e),r=(0,a.useCallback)(e=>{e&&n("BUTTON"===e.tagName)},[]);return{ref:r,type:t?"button":void 0}}(j),C={rightIcon:b,leftIcon:y,iconSpacing:x,children:g};return a.createElement(l.m$.button,{disabled:o||m,ref:(0,r.qq)(t,B),as:j,type:E??$,"data-active":u(p),"data-loading":u(m),__css:S,className:c("chakra-button",w),...k},m&&"start"===N&&a.createElement(f,{className:"chakra-button__spinner--start",label:_,placement:"start",spacing:x},v),m?_||a.createElement(l.m$.span,{opacity:0},a.createElement(h,{...C})):a.createElement(h,{...C}),m&&"end"===N&&a.createElement(f,{className:"chakra-button__spinner--end",label:_,placement:"end",spacing:x},v))});function h(e){let{leftIcon:t,rightIcon:n,children:r,iconSpacing:l}=e;return a.createElement(a.Fragment,null,t&&a.createElement(p,{marginEnd:l},t),r,n&&a.createElement(p,{marginStart:l},n))}g.displayName="Button",(0,l.Gp)(function(e,t){let{size:n,colorScheme:r,variant:i,className:s,spacing:o="0.5rem",isAttached:u,isDisabled:d,...p}=e,f=c("chakra-button__group",s),g=(0,a.useMemo)(()=>({size:n,colorScheme:r,variant:i,isDisabled:d}),[n,r,i,d]),h={display:"inline-flex"};return h=u?{...h,"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}}:{...h,"& > *:not(style) ~ *:not(style)":{marginStart:o}},a.createElement(m,{value:g},a.createElement(l.m$.div,{ref:t,role:"group",__css:h,className:f,"data-attached":u?"":void 0,...p}))}).displayName="ButtonGroup",(0,l.Gp)((e,t)=>{let{icon:n,children:r,isRound:l,"aria-label":i,...s}=e,o=n||r,c=(0,a.isValidElement)(o)?(0,a.cloneElement)(o,{"aria-hidden":!0,focusable:!1}):null;return a.createElement(g,{padding:"0",borderRadius:l?"full":void 0,ref:t,"aria-label":i,...s},c)}).displayName="IconButton"},8575:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup",function(){return n(8844)}])},8844:function(e,t,n){"use strict";n.r(t),n.d(t,{Page:function(){return m}});var a=n(5893),r=n(4221),l=n(7741),i=n(3966),s=n(5675),o=n.n(s),c=n(3944),u=n(9926);let m=()=>{let e=(0,r.pm)(),{push:t}=(0,u.t)(),n=async()=>{try{let n=await (0,i.qj)();(null==n?void 0:n.user)&&(await (0,i.yy)(n.user),e({title:"サインアップしました。",status:"success",position:"top"}),t(e=>e.$url()))}catch(a){console.error("Firebase Authentication Error",a),e({title:"エラーが発生しました。",status:"error",position:"top"})}};return(0,a.jsxs)("div",{className:"w-[100%] flex items-center overflow-y-hidden",children:[(0,a.jsx)("div",{className:"w-2/5 h-screen flex items-center justify-center bg-cover bg-center",style:{backgroundImage:'url("/theme.png")'}}),(0,a.jsxs)("div",{className:"w-3/5 h-full flex flex-col items-center justify-center",children:[(0,a.jsx)("h3",{className:"text-xl mb-3",children:"アンケートを、もっと手軽に"}),(0,a.jsx)(o(),{src:"/logo.svg",width:"400",height:"50",alt:"アンケトル",className:"mb-20"}),(0,a.jsxs)(l.zx,{onClick:n,className:"flex items-center gap-2",children:[(0,a.jsx)("img",{src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",width:"20",height:"20"}),(0,a.jsx)("p",{children:"Googleでサインアップ"})]}),(0,a.jsx)(c.F,{href:e=>e.signin.$url(),children:(0,a.jsx)("a",{className:"mt-4 text-sm text-gray-500 underline",children:"アカウントをお持ちの方はこちらから"})})]})]})};t.default=m}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8575)}),_N_E=e.O()}]);