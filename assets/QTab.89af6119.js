import{D as Ee,E as ee,an as Te,v as w,t as g,x as U,I as G,K as ze,ao as De,y as m,ap as fe,Z as Oe,aq as Qe,ar as X,R as We,H as ne,as as je,O as Fe,u as ae,at as Ve,J as be,au as he,w as N,M as He,av as Ke,aw as Ne,z as Ue}from"./index.ef1247e3.js";import{m as Ge,n as te,b as ge,r as Xe}from"./QTable.1fe82a6e.js";let Je=0;const Ze=["click","keydown"],Ye={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Je++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function pe(e,S,s,r){const o=Ee(Te,ee);if(o===ee)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ee;const{proxy:I}=ne(),_=w(null),x=w(null),d=w(null),f=g(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),q=g(()=>o.currentModel.value===e.name),z=g(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(q.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(r!==void 0?r.linkClass.value:"")),M=g(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=g(()=>e.disable===!0||o.hasFocus.value===!0||q.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function L(l,T){if(T!==!0&&_.value!==null&&_.value.focus(),e.disable===!0){r!==void 0&&r.hasRouterLink.value===!0&&fe(l);return}if(r===void 0){o.updateModel({name:e.name}),s("click",l);return}if(r.hasRouterLink.value===!0){const C=(b={})=>{let R;const k=b.to===void 0||je(b.to,e.to)===!0?o.avoidRouteWatcher=Ge():null;return r.navigateToRouterLink(l,{...b,returnRouterError:!0}).catch(E=>{R=E}).then(E=>{if(k===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,R===void 0&&(E===void 0||E.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),b.returnRouterError===!0)return R!==void 0?Promise.reject(R):E})};s("click",l,C),l.defaultPrevented!==!0&&C();return}s("click",l)}function A(l){Oe(l,[13,32])?L(l,!0):Qe(l)!==!0&&l.keyCode>=35&&l.keyCode<=40&&l.altKey!==!0&&l.metaKey!==!0&&o.onKbdNavigate(l.keyCode,I.$el)===!0&&fe(l),s("keydown",l)}function W(){const l=o.tabProps.value.narrowIndicator,T=[],C=m("div",{ref:d,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&T.push(m(X,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&T.push(m("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&T.push(e.alertIcon!==void 0?m(X,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):m("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),l===!0&&T.push(C);const b=[m("div",{class:"q-focus-helper",tabindex:-1,ref:_}),m("div",{class:M.value},We(S.default,T))];return l===!1&&b.push(C),b}const D={name:g(()=>e.name),rootRef:x,tabIndicatorRef:d,routeData:r};U(()=>{o.unregisterTab(D)}),G(()=>{o.registerTab(D)});function j(l,T){const C={ref:x,class:z.value,tabindex:y.value,role:"tab","aria-selected":q.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:L,onKeydown:A,...T};return ze(m(l,C,W()),[[De,f.value]])}return{renderTab:j,$tabs:o}}function et(){const e=w(!Fe.value);return e.value===!1&&G(()=>{e.value=!0}),e}const we=typeof ResizeObserver<"u",me=we===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var tt=ae({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:S}){let s=null,r,o={width:-1,height:-1};function I(d){d===!0||e.debounce===0||e.debounce==="0"?_():s===null&&(s=setTimeout(_,e.debounce))}function _(){if(s!==null&&(clearTimeout(s),s=null),r){const{offsetWidth:d,offsetHeight:f}=r;(d!==o.width||f!==o.height)&&(o={width:d,height:f},S("resize",o))}}const{proxy:x}=ne();if(we===!0){let d;const f=q=>{r=x.$el.parentNode,r?(d=new ResizeObserver(I),d.observe(r),_()):q!==!0&&be(()=>{f(!0)})};return G(()=>{f()}),U(()=>{s!==null&&clearTimeout(s),d!==void 0&&(d.disconnect!==void 0?d.disconnect():r&&d.unobserve(r))}),Ve}else{let q=function(){s!==null&&(clearTimeout(s),s=null),f!==void 0&&(f.removeEventListener!==void 0&&f.removeEventListener("resize",I,he.passive),f=void 0)},z=function(){q(),r&&r.contentDocument&&(f=r.contentDocument.defaultView,f.addEventListener("resize",I,he.passive),_())};const d=et();let f;return G(()=>{be(()=>{r=x.$el,r&&z()})}),U(q),x.trigger=I,()=>{if(d.value===!0)return m("object",{style:me.style,tabindex:-1,type:"text/html",data:me.url,"aria-hidden":"true",onLoad:z})}}}});function nt(e,S,s){const r=s===!0?["left","right"]:["top","bottom"];return`absolute-${S===!0?r[0]:r[1]}${e?` text-${e}`:""}`}const at=["left","center","right","justify"];var rt=ae({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>at.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:S,emit:s}){const{proxy:r}=ne(),{$q:o}=r,{registerTick:I}=te(),{registerTick:_}=te(),{registerTick:x}=te(),{registerTimeout:d,removeTimeout:f}=ge(),{registerTimeout:q,removeTimeout:z}=ge(),M=w(null),y=w(null),L=w(e.modelValue),A=w(!1),W=w(!0),D=w(!1),j=w(!1),l=[],T=w(0),C=w(!1);let b=null,R=null,k;const E=g(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:nt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ye=g(()=>{const t=T.value,n=L.value;for(let a=0;a<t;a++)if(l[a].name.value===n)return!0;return!1}),Ce=g(()=>`q-tabs__content--align-${A.value===!0?"left":j.value===!0?"justify":e.align}`),qe=g(()=>`q-tabs row no-wrap items-center q-tabs--${A.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),Re=g(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Ce.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),F=g(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),V=g(()=>e.vertical!==!0&&o.lang.rtl===!0),J=g(()=>Xe===!1&&V.value===!0);N(V,Q),N(()=>e.modelValue,t=>{Z({name:t,setCurrent:!0,skipEmit:!0})}),N(()=>e.outsideArrows,H);function Z({name:t,setCurrent:n,skipEmit:a}){L.value!==t&&(a!==!0&&e["onUpdate:modelValue"]!==void 0&&s("update:modelValue",t),(n===!0||e["onUpdate:modelValue"]===void 0)&&(_e(L.value,t),L.value=t))}function H(){I(()=>{oe({width:M.value.offsetWidth,height:M.value.offsetHeight})})}function oe(t){if(F.value===void 0||y.value===null)return;const n=t[F.value.container],a=Math.min(y.value[F.value.scroll],Array.prototype.reduce.call(y.value.children,(v,u)=>v+(u[F.value.content]||0),0)),c=n>0&&a>n;A.value=c,c===!0&&_(Q),j.value=n<parseInt(e.breakpoint,10)}function _e(t,n){const a=t!=null&&t!==""?l.find(v=>v.name.value===t):null,c=n!=null&&n!==""?l.find(v=>v.name.value===n):null;if(a&&c){const v=a.tabIndicatorRef.value,u=c.tabIndicatorRef.value;b!==null&&(clearTimeout(b),b=null),v.style.transition="none",v.style.transform="none",u.style.transition="none",u.style.transform="none";const i=v.getBoundingClientRect(),h=u.getBoundingClientRect();u.style.transform=e.vertical===!0?`translate3d(0,${i.top-h.top}px,0) scale3d(1,${h.height?i.height/h.height:1},1)`:`translate3d(${i.left-h.left}px,0,0) scale3d(${h.width?i.width/h.width:1},1,1)`,x(()=>{b=setTimeout(()=>{b=null,u.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",u.style.transform="none"},70)})}c&&A.value===!0&&O(c.rootRef.value)}function O(t){const{left:n,width:a,top:c,height:v}=y.value.getBoundingClientRect(),u=t.getBoundingClientRect();let i=e.vertical===!0?u.top-c:u.left-n;if(i<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(i),Q();return}i+=e.vertical===!0?u.height-v:u.width-a,i>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(i),Q())}function Q(){const t=y.value;if(t===null)return;const n=t.getBoundingClientRect(),a=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);V.value===!0?(W.value=Math.ceil(a+n.width)<t.scrollWidth-1,D.value=a>0):(W.value=a>0,D.value=e.vertical===!0?Math.ceil(a+n.height)<t.scrollHeight:Math.ceil(a+n.width)<t.scrollWidth)}function le(t){R!==null&&clearInterval(R),R=setInterval(()=>{Se(t)===!0&&$()},5)}function re(){le(J.value===!0?Number.MAX_SAFE_INTEGER:0)}function ie(){le(J.value===!0?0:Number.MAX_SAFE_INTEGER)}function $(){R!==null&&(clearInterval(R),R=null)}function Le(t,n){const a=Array.prototype.filter.call(y.value.children,h=>h===n||h.matches&&h.matches(".q-tab.q-focusable")===!0),c=a.length;if(c===0)return;if(t===36)return O(a[0]),a[0].focus(),!0;if(t===35)return O(a[c-1]),a[c-1].focus(),!0;const v=t===(e.vertical===!0?38:37),u=t===(e.vertical===!0?40:39),i=v===!0?-1:u===!0?1:void 0;if(i!==void 0){const h=V.value===!0?-1:1,P=a.indexOf(n)+i*h;return P>=0&&P<c&&(O(a[P]),a[P].focus({preventScroll:!0})),!0}}const ke=g(()=>J.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,n)=>{t.scrollLeft=-n}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,n)=>{t.scrollTop=n}}:{get:t=>t.scrollLeft,set:(t,n)=>{t.scrollLeft=n}});function Se(t){const n=y.value,{get:a,set:c}=ke.value;let v=!1,u=a(n);const i=t<u?-1:1;return u+=i*5,u<0?(v=!0,u=0):(i===-1&&u<=t||i===1&&u>=t)&&(v=!0,u=t),c(n,u),Q(),v}function ue(t,n){for(const a in t)if(t[a]!==n[a])return!1;return!0}function Pe(){let t=null,n={matchedLen:0,queryDiff:9999,hrefLen:0};const a=l.filter(i=>i.routeData!==void 0&&i.routeData.hasRouterLink.value===!0),{hash:c,query:v}=r.$route,u=Object.keys(v).length;for(const i of a){const h=i.routeData.exact.value===!0;if(i.routeData[h===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:P,query:Y,matched:Be,href:Me}=i.routeData.resolvedLink.value,p=Object.keys(Y).length;if(h===!0){if(P!==c||p!==u||ue(v,Y)===!1)continue;t=i.name.value;break}if(P!==""&&P!==c||p!==0&&ue(Y,v)===!1)continue;const B={matchedLen:Be.length,queryDiff:u-p,hrefLen:Me.length-P.length};if(B.matchedLen>n.matchedLen){t=i.name.value,n=B;continue}else if(B.matchedLen!==n.matchedLen)continue;if(B.queryDiff<n.queryDiff)t=i.name.value,n=B;else if(B.queryDiff!==n.queryDiff)continue;B.hrefLen>n.hrefLen&&(t=i.name.value,n=B)}t===null&&l.some(i=>i.routeData===void 0&&i.name.value===L.value)===!0||Z({name:t,setCurrent:!0})}function Ie(t){if(f(),C.value!==!0&&M.value!==null&&t.target&&typeof t.target.closest=="function"){const n=t.target.closest(".q-tab");n&&M.value.contains(n)===!0&&(C.value=!0,A.value===!0&&O(n))}}function xe(){d(()=>{C.value=!1},30)}function K(){ce.avoidRouteWatcher===!1?q(Pe):z()}function se(){if(k===void 0){const t=N(()=>r.$route.fullPath,K);k=()=>{t(),k=void 0}}}function Ae(t){l.push(t),T.value++,H(),t.routeData===void 0||r.$route===void 0?q(()=>{if(A.value===!0){const n=L.value,a=n!=null&&n!==""?l.find(c=>c.name.value===n):null;a&&O(a.rootRef.value)}}):(se(),t.routeData.hasRouterLink.value===!0&&K())}function $e(t){l.splice(l.indexOf(t),1),T.value--,H(),k!==void 0&&t.routeData!==void 0&&(l.every(n=>n.routeData===void 0)===!0&&k(),K())}const ce={currentModel:L,tabProps:E,hasFocus:C,hasActiveTab:ye,registerTab:Ae,unregisterTab:$e,verifyRouteModel:K,updateModel:Z,onKbdNavigate:Le,avoidRouteWatcher:!1};He(Te,ce);function ve(){b!==null&&clearTimeout(b),$(),k!==void 0&&k()}let de;return U(ve),Ke(()=>{de=k!==void 0,ve()}),Ne(()=>{de===!0&&se(),H()}),()=>m("div",{ref:M,class:qe.value,role:"tablist",onFocusin:Ie,onFocusout:xe},[m(tt,{onResize:oe}),m("div",{ref:y,class:Re.value,onScroll:Q},Ue(S.default)),m(X,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(W.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:re,onTouchstartPassive:re,onMouseupPassive:$,onMouseleavePassive:$,onTouchendPassive:$}),m(X,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(D.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ie,onTouchstartPassive:ie,onMouseupPassive:$,onMouseleavePassive:$,onTouchendPassive:$})])}}),it=ae({name:"QTab",props:Ye,emits:Ze,setup(e,{slots:S,emit:s}){const{renderTab:r}=pe(e,S,s);return()=>r("div")}});export{tt as Q,Ze as a,pe as b,rt as c,it as d,Ye as u};