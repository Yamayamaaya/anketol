(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[964],{328:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/doc/TermsOfUse",function(){return n(8379)}])},6874:function(e,t,n){"use strict";var s=n(5893),l=n(9008),r=n.n(l),i=n(7294),c=n(1163),o=n(5610);let u=e=>{let{title:t,children:n,isSetUpOGP:l=!0,isTitleHidden:u=!1,isAuthPageHidden:a=!1,loading:d=!1}=e,{push:x}=(0,c.useRouter)();return(0,i.useEffect)(()=>{a&&!d&&x("/signin")},[a,d,x]),(0,s.jsxs)(s.Fragment,{children:[l&&(0,s.jsxs)(r(),{children:[(0,s.jsx)("title",{children:t}),(0,s.jsx)("meta",{property:"og:title",content:t})]}),(0,s.jsxs)("div",{className:"w-[100vw] flex flex-col items-center",children:[!u&&(0,s.jsx)("h1",{className:"text-2xl my-6 font-bold w-[100vw] text-center",children:t}),d&&(0,s.jsx)(o.$,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"blue.500",size:"xl"}),(!a||!d)&&n]})]})};t.Z=u},6486:function(e,t,n){"use strict";n.d(t,{m:function(){return c}});var s=n(5893);n(7294);var l=n(1798),r=n(8986),i=n.n(r);let c=e=>{let{markdown:t}=e;return(0,s.jsx)("div",{className:"".concat(i().markdownContainer," m-8 md:m-12"),children:(0,s.jsx)(l.U,{components:{ul:e=>{let{node:t,...n}=e;return(0,s.jsx)("ul",{style:{listStyleType:"disc"},...n})},ol:e=>{let{node:t,...n}=e;return(0,s.jsx)("ol",{style:{listStyleType:"decimal"},...n})},li:e=>{let{node:t,...n}=e;return(0,s.jsx)("li",{style:{listStyle:"inherit"},...n})}},children:t})})}},8379:function(e,t,n){"use strict";n.r(t);var s=n(5893),l=n(6486),r=n(7294),i=n(6874);let c=()=>{let[e,t]=(0,r.useState)("");return(0,r.useEffect)(()=>{let e=async()=>{let e=await fetch("/doc/terms-of-use.md"),n=await e.text();t(n)};e()},[]),(0,s.jsx)(i.Z,{title:"利用規約",isTitleHidden:!0,children:(0,s.jsx)(l.m,{markdown:e})})};t.default=c},8986:function(e){e.exports={markdownContainer:"doc_markdownContainer__V5_Zx"}}},function(e){e.O(0,[798,774,888,179],function(){return e(e.s=328)}),_N_E=e.O()}]);