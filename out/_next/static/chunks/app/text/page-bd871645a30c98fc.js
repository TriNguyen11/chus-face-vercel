(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[280],{2825:function(e,t,n){Promise.resolve().then(n.bind(n,1465))},442:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var o=n(7437),s=n(2265),a=n(9972);let i=[{value:"EN",icon:"us-flag.png"},{value:"VN",icon:"vn-flag.png"}];function l(e){var t;let{background:n}=e,[l,r]=(0,s.useState)("");return(0,s.useEffect)(()=>{let e=localStorage.getItem("lang");r(null!=e?e:"EN")},[]),(0,o.jsxs)(a.R,{as:"div",value:l,onChange:r,children:[(0,o.jsxs)(a.R.Button,{className:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}("inline-flex px-4 py-2 items-center gap-4"),children:[(0,o.jsx)("img",{src:null===(t=i.filter(e=>e.value===l)[0])||void 0===t?void 0:t.icon,className:"object-contain w-6 h-auto"}),(0,o.jsx)("p",{className:"text-slate-400",children:l}),(0,o.jsx)("svg",{fill:"rgb(148 163 184)",width:24,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,o.jsx)("path",{d:"M7,10L12,15L17,10H7Z"})})]}),(0,o.jsx)(a.R.Options,{className:"px-4 py-2 items-center bg-white gap-4 shadow",children:i.map((e,t)=>(0,o.jsx)(a.R.Option,{value:e.value,disabled:e.value===l,className:"hover:bg-gray-100",children:(0,o.jsxs)("button",{type:"button",className:"flex items-center w-full gap-4",children:[(0,o.jsx)("img",{src:e.icon,className:"object-center w-6"}),e.value]})},t))})]})}},1465:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return B}});var o=n(7437),s=n(2692),a=n.n(s),i=n(2265),l=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,o,s="";if("string"==typeof t||"number"==typeof t)s+=t;else if("object"==typeof t){if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(o=e(t[n]))&&(s&&(s+=" "),s+=o);else for(n in t)t[n]&&(s&&(s+=" "),s+=n)}return s}(e))&&(o&&(o+=" "),o+=t);return o};let r=e=>"number"==typeof e&&!isNaN(e),c=e=>"string"==typeof e,u=e=>"function"==typeof e,d=e=>c(e)||u(e)?e:null,m=e=>(0,i.isValidElement)(e)||c(e)||u(e)||r(e);function p(e){let{enter:t,exit:n,appendPosition:o=!1,collapse:s=!0,collapseDuration:a=300}=e;return function(e){let{children:l,position:r,preventExitTransition:c,done:u,nodeRef:d,isIn:m}=e,p=o?`${t}--${r}`:t,f=o?`${n}--${r}`:n,h=(0,i.useRef)(0);return(0,i.useLayoutEffect)(()=>{let e=d.current,t=p.split(" "),n=o=>{o.target===d.current&&(e.dispatchEvent(new Event("d")),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===h.current&&"animationcancel"!==o.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)},[]),(0,i.useEffect)(()=>{let e=d.current,t=()=>{e.removeEventListener("animationend",t),s?function(e,t,n){void 0===n&&(n=300);let{scrollHeight:o,style:s}=e;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(t,n)})})}(e,u,a):u()};m||(c?t():(h.current=1,e.className+=` ${f}`,e.addEventListener("animationend",t)))},[m]),i.createElement(i.Fragment,null,l)}}function f(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}let h={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){let n=this.list.get(e).filter(e=>e!==t);return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){let t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{let n=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)})}},g=e=>{let{theme:t,type:n,...o}=e;return i.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${n})`,...o})},x={info:function(e){return i.createElement(g,{...e},i.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return i.createElement(g,{...e},i.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return i.createElement(g,{...e},i.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return i.createElement(g,{...e},i.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return i.createElement("div",{className:"Toastify__spinner"})}};function v(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function y(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function b(e){let{closeToast:t,theme:n,ariaLabel:o="close"}=e;return i.createElement("button",{className:`Toastify__close-button Toastify__close-button--${n}`,type:"button",onClick:e=>{e.stopPropagation(),t(e)},"aria-label":o},i.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},i.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function w(e){let{delay:t,isRunning:n,closeToast:o,type:s="default",hide:a,className:r,style:c,controlledProgress:d,progress:m,rtl:p,isIn:f,theme:h}=e,g=a||d&&0===m,x={...c,animationDuration:`${t}ms`,animationPlayState:n?"running":"paused",opacity:g?0:1};d&&(x.transform=`scaleX(${m})`);let v=l("Toastify__progress-bar",d?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${h}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":p}),y=u(r)?r({rtl:p,type:s,defaultClassName:v}):l(v,r);return i.createElement("div",{role:"progressbar","aria-hidden":g?"true":"false","aria-label":"notification timer",className:y,style:x,[d&&m>=1?"onTransitionEnd":"onAnimationEnd"]:d&&m<1?null:()=>{f&&o()}})}let T=e=>{let{isRunning:t,preventExitTransition:n,toastRef:o,eventHandlers:s}=function(e){let[t,n]=(0,i.useState)(!1),[o,s]=(0,i.useState)(!1),a=(0,i.useRef)(null),l=(0,i.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,r=(0,i.useRef)(e),{autoClose:c,pauseOnHover:d,closeToast:m,onClick:p,closeOnClick:f}=e;function h(t){if(e.draggable){"touchstart"===t.nativeEvent.type&&t.nativeEvent.preventDefault(),l.didMove=!1,document.addEventListener("mousemove",w),document.addEventListener("mouseup",T),document.addEventListener("touchmove",w),document.addEventListener("touchend",T);let n=a.current;l.canCloseOnClick=!0,l.canDrag=!0,l.boundingRect=n.getBoundingClientRect(),n.style.transition="",l.x=v(t.nativeEvent),l.y=y(t.nativeEvent),"x"===e.draggableDirection?(l.start=l.x,l.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(l.start=l.y,l.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent/100))}}function g(t){if(l.boundingRect){let{top:n,bottom:o,left:s,right:a}=l.boundingRect;"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&l.x>=s&&l.x<=a&&l.y>=n&&l.y<=o?b():x()}}function x(){n(!0)}function b(){n(!1)}function w(n){let o=a.current;l.canDrag&&o&&(l.didMove=!0,t&&b(),l.x=v(n),l.y=y(n),l.delta="x"===e.draggableDirection?l.x-l.start:l.y-l.start,l.start!==l.x&&(l.canCloseOnClick=!1),o.style.transform=`translate${e.draggableDirection}(${l.delta}px)`,o.style.opacity=""+(1-Math.abs(l.delta/l.removalDistance)))}function T(){document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",T),document.removeEventListener("touchmove",w),document.removeEventListener("touchend",T);let t=a.current;if(l.canDrag&&l.didMove&&t){if(l.canDrag=!1,Math.abs(l.delta)>l.removalDistance)return s(!0),void e.closeToast();t.style.transition="transform 0.2s, opacity 0.2s",t.style.transform=`translate${e.draggableDirection}(0)`,t.style.opacity="1"}}(0,i.useEffect)(()=>{r.current=e}),(0,i.useEffect)(()=>(a.current&&a.current.addEventListener("d",x,{once:!0}),u(e.onOpen)&&e.onOpen((0,i.isValidElement)(e.children)&&e.children.props),()=>{let e=r.current;u(e.onClose)&&e.onClose((0,i.isValidElement)(e.children)&&e.children.props)}),[]),(0,i.useEffect)(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||b(),window.addEventListener("focus",x),window.addEventListener("blur",b)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",x),window.removeEventListener("blur",b))}),[e.pauseOnFocusLoss]);let E={onMouseDown:h,onTouchStart:h,onMouseUp:g,onTouchEnd:g};return c&&d&&(E.onMouseEnter=b,E.onMouseLeave=x),f&&(E.onClick=e=>{p&&p(e),l.canCloseOnClick&&m()}),{playToast:x,pauseToast:b,isRunning:t,preventExitTransition:o,toastRef:a,eventHandlers:E}}(e),{closeButton:a,children:r,autoClose:c,onClick:d,type:m,hideProgressBar:p,closeToast:f,transition:h,position:g,className:x,style:T,bodyClassName:E,bodyStyle:C,progressClassName:N,progressStyle:k,updateId:_,role:j,progress:I,rtl:O,toastId:L,deleteToast:R,isIn:A,isLoading:S,iconOut:z,closeOnClick:P,theme:B}=e,M=l("Toastify__toast",`Toastify__toast-theme--${B}`,`Toastify__toast--${m}`,{"Toastify__toast--rtl":O},{"Toastify__toast--close-on-click":P}),D=u(x)?x({rtl:O,position:g,type:m,defaultClassName:M}):l(M,x),$=!!I||!c,F={closeToast:f,type:m,theme:B},q=null;return!1===a||(q=u(a)?a(F):(0,i.isValidElement)(a)?(0,i.cloneElement)(a,F):b(F)),i.createElement(h,{isIn:A,done:R,position:g,preventExitTransition:n,nodeRef:o},i.createElement("div",{id:L,onClick:d,className:D,...s,style:T,ref:o},i.createElement("div",{...A&&{role:j},className:u(E)?E({type:m}):l("Toastify__toast-body",E),style:C},null!=z&&i.createElement("div",{className:l("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!S})},z),i.createElement("div",null,r)),q,i.createElement(w,{..._&&!$?{key:`pb-${_}`}:{},rtl:O,theme:B,delay:c,isRunning:t,isIn:A,closeToast:f,hide:p,type:m,style:k,className:N,controlledProgress:$,progress:I||0})))},E=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},C=p(E("bounce",!0)),N=(p(E("slide",!0)),p(E("zoom")),p(E("flip")),(0,i.forwardRef)((e,t)=>{let{getToastToRender:n,containerRef:o,isToastActive:s}=function(e){let[,t]=(0,i.useReducer)(e=>e+1,0),[n,o]=(0,i.useState)([]),s=(0,i.useRef)(null),a=(0,i.useRef)(new Map).current,l=e=>-1!==n.indexOf(e),p=(0,i.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:l,getToast:e=>a.get(e)}).current;function g(e){let{containerId:t}=e,{limit:n}=p.props;!n||t&&p.containerId!==t||(p.count-=p.queue.length,p.queue=[])}function v(e){o(t=>null==e?[]:t.filter(t=>t!==e))}function y(){let{toastContent:e,toastProps:t,staleId:n}=p.queue.shift();w(e,t,n)}function b(e,n){var o,l;let{delay:g,staleId:b,...T}=n;if(!m(e)||!s.current||p.props.enableMultiContainer&&T.containerId!==p.props.containerId||a.has(T.toastId)&&null==T.updateId)return;let{toastId:E,updateId:C,data:N}=T,{props:k}=p,_=()=>v(E),j=null==C;j&&p.count++;let I={...k,style:k.toastStyle,key:p.toastKey++,...Object.fromEntries(Object.entries(T).filter(e=>{let[t,n]=e;return null!=n})),toastId:E,updateId:C,data:N,closeToast:_,isIn:!1,className:d(T.className||k.toastClassName),bodyClassName:d(T.bodyClassName||k.bodyClassName),progressClassName:d(T.progressClassName||k.progressClassName),autoClose:!T.isLoading&&(o=T.autoClose,l=k.autoClose,!1===o||r(o)&&o>0?o:l),deleteToast(){let e=f(a.get(E),"removed");a.delete(E),h.emit(4,e);let n=p.queue.length;if(p.count=null==E?p.count-p.displayedToast:p.count-1,p.count<0&&(p.count=0),n>0){let e=null==E?p.props.limit:1;if(1===n||1===e)p.displayedToast++,y();else{let t=e>n?n:e;p.displayedToast=t;for(let e=0;e<t;e++)y()}}else t()}};I.iconOut=function(e){let{theme:t,type:n,isLoading:o,icon:s}=e,a=null,l={theme:t,type:n};return!1===s||(u(s)?a=s(l):(0,i.isValidElement)(s)?a=(0,i.cloneElement)(s,l):c(s)||r(s)?a=s:o?a=x.spinner():n in x&&(a=x[n](l))),a}(I),u(T.onOpen)&&(I.onOpen=T.onOpen),u(T.onClose)&&(I.onClose=T.onClose),I.closeButton=k.closeButton,!1===T.closeButton||m(T.closeButton)?I.closeButton=T.closeButton:!0===T.closeButton&&(I.closeButton=!m(k.closeButton)||k.closeButton);let O=e;(0,i.isValidElement)(e)&&!c(e.type)?O=(0,i.cloneElement)(e,{closeToast:_,toastProps:I,data:N}):u(e)&&(O=e({closeToast:_,toastProps:I,data:N})),k.limit&&k.limit>0&&p.count>k.limit&&j?p.queue.push({toastContent:O,toastProps:I,staleId:b}):r(g)?setTimeout(()=>{w(O,I,b)},g):w(O,I,b)}function w(e,t,n){let{toastId:s}=t;n&&a.delete(n);let i={content:e,props:t};a.set(s,i),o(e=>[...e,s].filter(e=>e!==n)),h.emit(4,f(i,null==i.props.updateId?"added":"updated"))}return(0,i.useEffect)(()=>(p.containerId=e.containerId,h.cancelEmit(3).on(0,b).on(1,e=>s.current&&v(e)).on(5,g).emit(2,p),()=>{a.clear(),h.emit(3,p)}),[]),(0,i.useEffect)(()=>{p.props=e,p.isToastActive=l,p.displayedToast=n.length}),{getToastToRender:function(t){let n=new Map,o=Array.from(a.values());return e.newestOnTop&&o.reverse(),o.forEach(e=>{let{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)}),Array.from(n,e=>t(e[0],e[1]))},containerRef:s,isToastActive:l}}(e),{className:a,style:p,rtl:g,containerId:v}=e;return(0,i.useEffect)(()=>{t&&(t.current=o.current)},[]),i.createElement("div",{ref:o,className:"Toastify",id:v},n((e,t)=>{let n=t.length?{...p}:{...p,pointerEvents:"none"};return i.createElement("div",{className:function(e){let t=l("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":g});return u(a)?a({position:e,rtl:g,defaultClassName:t}):l(t,d(a))}(e),style:n,key:`container-${e}`},t.map((e,n)=>{let{content:o,props:a}=e;return i.createElement(T,{...a,isIn:s(a.toastId),style:{...a.style,"--nth":n+1,"--len":t.length},key:`toast-${a.key}`},o)}))}))}));N.displayName="ToastContainer",N.defaultProps={position:"top-right",transition:C,autoClose:5e3,closeButton:b,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let k,_=new Map,j=[],I=1;function O(e,t){return _.size>0?h.emit(0,e,t):j.push({content:e,options:t}),t.toastId}function L(e,t){return{...t,type:t&&t.type||e,toastId:t&&(c(t.toastId)||r(t.toastId))?t.toastId:""+I++}}function R(e){return(t,n)=>O(t,L(e,n))}function A(e,t){return O(e,L("default",t))}A.loading=(e,t)=>O(e,L("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),A.promise=function(e,t,n){let o,{pending:s,error:a,success:i}=t;s&&(o=c(s)?A.loading(s,n):A.loading(s.render,{...n,...s}));let l={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},r=(e,t,s)=>{if(null==t)return void A.dismiss(o);let a={type:e,...l,...n,data:s},i=c(t)?{render:t}:t;return o?A.update(o,{...a,...i}):A(i.render,{...a,...i}),s},d=u(e)?e():e;return d.then(e=>r("success",i,e)).catch(e=>r("error",a,e)),d},A.success=R("success"),A.info=R("info"),A.error=R("error"),A.warning=R("warning"),A.warn=A.warning,A.dark=(e,t)=>O(e,L("default",{theme:"dark",...t})),A.dismiss=e=>{_.size>0?h.emit(1,e):j=j.filter(t=>null!=e&&t.options.toastId!==e)},A.clearWaitingQueue=function(e){return void 0===e&&(e={}),h.emit(5,e)},A.isActive=e=>{let t=!1;return _.forEach(n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)}),t},A.update=function(e,t){void 0===t&&(t={}),setTimeout(()=>{let n=function(e,t){let{containerId:n}=t,o=_.get(n||k);return o&&o.getToast(e)}(e,t);if(n){let{props:o,content:s}=n,a={delay:100,...o,...t,toastId:t.toastId||e,updateId:""+I++};a.toastId!==e&&(a.staleId=e);let i=a.render||s;delete a.render,O(i,a)}},0)},A.done=e=>{A.update(e,{progress:1})},A.onChange=e=>(h.on(4,e),()=>{h.off(4,e)}),A.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},A.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},h.on(2,e=>{k=e.containerId||e,_.set(k,e),j.forEach(e=>{h.emit(0,e.content,e.options)}),j=[]}).on(3,e=>{_.delete(e.containerId||e),0===_.size&&h.off(0).off(1).off(5)}),n(6518);var S=n(442);let z=["M","W","A"],P=["m","w"];var B=()=>{let[e,t]=(0,i.useState)("Chus"),[n,s]=(0,i.useState)("Craft with love, Shop with taste"),[l,r]=(0,i.useState)(!1),[c,u]=(0,i.useState)(0),d=async()=>{r(!0),await new Promise(e=>setTimeout(e,500)),a()(document.getElementById("ImageDownload"),{backgroundColor:"rgba(0,0,0,0)"}).then(e=>{r(!1);let t=document.createElement("a");t.download="my-text-img",t.href=e.toDataURL("image/jpeg",1),t.click()})};return window.mobileAndTabletCheck=function(){var e;let t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t},(0,i.useEffect)(()=>{},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"absolute top-2 left-2 z-10",children:(0,o.jsx)(S.Z,{})}),(0,o.jsxs)("div",{className:"relative flex flex-col justify-center container-md md:m-auto my-10 h-[100vh] w-[100vw]",children:[(0,o.jsx)("section",{className:"text-center space-y-4 max-[415px]:py-0",children:(0,o.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-center md:my-20",children:[(0,o.jsx)("p",{className:"text-[30px] mt-4 ml-[-20%] sm:ml-0",children:"Play With"}),(0,o.jsxs)("span",{className:"font-bold relative text-[40px] md:text-[50px]",children:["Your Name",(0,o.jsx)("img",{className:"w-6 self-start absolute top-0 right-[-20px]",src:"hat.png"})]})]})}),(0,o.jsxs)("section",{className:"px-4 md:p-0 grid grid-cols-1 md:grid-cols-2 justify-center gap-4",children:[(0,o.jsxs)("section",{className:"flex flex-col justify-center md:px-10",children:[(0,o.jsx)("input",{onChange:e=>{let n=0;if(e.target.value.length<=10){e.target.value.split("").map(e=>{z.includes(e)&&(n+=.75),P.includes(e)?n+=.55:n+=.4}),u(n);let o=setTimeout(()=>(t(e.target.value),clearTimeout(o)),50)}},minLength:"4",maxLength:"10",type:"text",className:"p-6 sm:p-8 border border-slate-400 text-slate-400 text-xs rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full text-2xl sm:text-4xl text-center sm:text-left placeholder:text-slate-400",placeholder:"Chus"}),(0,o.jsx)("p",{className:"text-slate-400 text-xs text-center md:text-left p-2",children:"From 4-10 Characters"}),(0,o.jsx)("input",{onChange:e=>{if(e.target.value.length<=35){let t=setTimeout(()=>(s(e.target.value),clearTimeout(t)),50)}},minLength:"10",maxLength:"35",max:35,type:"text",className:"p-3 sm:p-4 border border-slate-400 text-slate-400 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full text-lg sm:text-2xl text-center sm:text-left placeholder:text-slate-400",placeholder:"Craft with love, Shop with taste"}),(0,o.jsx)("p",{className:"text-slate-400 text-xs text-center md:text-left p-2",children:"From 10-35 Characters"}),(0,o.jsxs)("div",{className:"hidden md:flex flex-col justify-center items-center relative",children:[(0,o.jsx)("div",{className:"mt-20",children:(0,o.jsxs)("span",{className:"font-bold text-xl sm:text-7xl relative",children:["nguy\xean",(0,o.jsx)("img",{className:"w-6 self-start absolute -top-10 -right-16 ",src:"hat.png"})]})}),(0,o.jsx)("p",{className:"text-black mt-3",children:"Craft with love, Shop with taste"})]})]}),(0,o.jsx)("div",{className:"mx-auto ",children:(0,o.jsxs)("div",{id:"ImageDownload",style:{backgroundSize:"100%",border:0},className:"w-[90vw] h-[90vw] md:p-0 md:w-[45vw] lg:w-[38vw] md:h-[45vw] lg:h-[38vw] flex flex-col flex-wrap justify-center items-center col-span-7 box-content shadow bg-nguyen",children:[e&&(0,o.jsxs)("p",{id:"name",className:"font-bold md:text-5xl lg:text-[65px] xl:text-[65px] text-white relative",style:{fontSize:(window.innerWidth>768?window.innerWidth>1024?80-1.8*c:50-1*c:44-1.5*c)+"px"},children:[(0,o.jsx)("img",{className:"".concat(l&&window.mobileAndTabletCheck()?"w-4":"w-6"," self-start absolute ").concat(l?window.mobileAndTabletCheck()?"top-[10px]":"top-2":window.mobileAndTabletCheck()?"-top-3":"-top-5"," ").concat(l?window.mobileAndTabletCheck()?"-right-[32px]":"-right-[40px]":"-right-8"),src:"hat.png"}),e]}),(0,o.jsx)("div",{id:"slogan",className:"text-white max-w-[90%] text-center\n                 ".concat(l?window.mobileAndTabletCheck()?"-mt-0":"md:mt-4 mt-0":" md:mt-2 -mt-2 ","\n                ").concat(l?window.mobileAndTabletCheck()?"text-[12px]":"md:text-[22px] text-[14px]":"md:text-[24px] text-[12px] min-[500px]:text-[14px] max-[800px]:text-[14px]"),children:n&&""!==n.trim()?n:"Craft with love, Shop with taste"})]})})]}),(0,o.jsxs)("section",{className:"hidden sm:flex flex-col items-center pt-10 space-y-5",children:[(0,o.jsx)("button",{disabled:e.length<4||n.length<10,onClick:d,type:"button",className:"w-52 text-white ".concat(e.length<4||n.length<10?"bg-gray-400":"bg-[#45AAF8]"," hover:").concat(e.length<4||n.length<10?"bg-gray-500":"bg-blue-800"," focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"),style:{boxShadow:"(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"},children:"Save & Download"}),(0,o.jsx)("a",{href:"/",children:(0,o.jsx)("button",{type:"button",className:"w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2",style:{boxShadow:"(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"},children:"Home"})})]}),(0,o.jsxs)("section",{className:"sm:hidden flex flex-col items-center py-5 space-y-4",children:[(0,o.jsx)("button",{disabled:e.length<4||n.length<10,onClick:d,type:"button",className:"w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2",style:{boxShadow:"(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"},children:"Download"}),(0,o.jsx)("a",{href:"/",children:(0,o.jsx)("button",{type:"button",className:"w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2",style:{boxShadow:"(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"},children:"Back & Not Save"})})]})]}),(0,o.jsx)(N,{position:"top-right",autoClose:2e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"colored"})]})}},6518:function(){},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=n(2265),s=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,l=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var o,a={},c=null,u=null;for(o in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,o)&&!r.hasOwnProperty(o)&&(a[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===a[o]&&(a[o]=t[o]);return{$$typeof:s,type:e,key:c,ref:u,props:a,_owner:l.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},7437:function(e,t,n){"use strict";e.exports=n(622)}},function(e){e.O(0,[337,972,971,596,744],function(){return e(e.s=2825)}),_N_E=e.O()}]);