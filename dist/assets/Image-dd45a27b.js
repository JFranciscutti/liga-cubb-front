import{r as De,C as ze,a as Pe,o as je}from"./index-c23903f8.js";var Te={},We={get exports(){return Te},set exports(te){Te=te}};(()=>{var te={296:(p,f,c)=>{var re=/^\s+|\s+$/g,X=/^[-+]0x[0-9a-f]+$/i,A=/^0b[01]+$/i,w=/^0o[0-7]+$/i,D=parseInt,Z=typeof c.g=="object"&&c.g&&c.g.Object===Object&&c.g,ce=typeof self=="object"&&self&&self.Object===Object&&self,oe=Z||ce||Function("return this")(),ue=Object.prototype.toString,ne=Math.max,ae=Math.min,F=function(){return oe.Date.now()};function N(y){var a=typeof y;return!!y&&(a=="object"||a=="function")}function G(y){if(typeof y=="number")return y;if(function(j){return typeof j=="symbol"||function(x){return!!x&&typeof x=="object"}(j)&&ue.call(j)=="[object Symbol]"}(y))return NaN;if(N(y)){var a=typeof y.valueOf=="function"?y.valueOf():y;y=N(a)?a+"":a}if(typeof y!="string")return y===0?y:+y;y=y.replace(re,"");var P=A.test(y);return P||w.test(y)?D(y.slice(2),P?2:8):X.test(y)?NaN:+y}p.exports=function(y,a,P){var j,x,C,U,O,L,B=0,H=!1,V=!1,z=!0;if(typeof y!="function")throw new TypeError("Expected a function");function E(v){var M=j,Y=x;return j=x=void 0,B=v,U=y.apply(Y,M)}function W(v){return B=v,O=setTimeout(J,a),H?E(v):U}function q(v){var M=v-L;return L===void 0||M>=a||M<0||V&&v-B>=C}function J(){var v=F();if(q(v))return K(v);O=setTimeout(J,function(M){var Y=a-(M-L);return V?ae(Y,C-(M-B)):Y}(v))}function K(v){return O=void 0,z&&j?E(v):(j=x=void 0,U)}function ee(){var v=F(),M=q(v);if(j=arguments,x=this,L=v,M){if(O===void 0)return W(L);if(V)return O=setTimeout(J,a),E(L)}return O===void 0&&(O=setTimeout(J,a)),U}return a=G(a)||0,N(P)&&(H=!!P.leading,C=(V="maxWait"in P)?ne(G(P.maxWait)||0,a):C,z="trailing"in P?!!P.trailing:z),ee.cancel=function(){O!==void 0&&clearTimeout(O),B=0,j=L=x=O=void 0},ee.flush=function(){return O===void 0?U:K(F())},ee}},96:(p,f,c)=>{var re="Expected a function",X=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,w=/^0b[01]+$/i,D=/^0o[0-7]+$/i,Z=parseInt,ce=typeof c.g=="object"&&c.g&&c.g.Object===Object&&c.g,oe=typeof self=="object"&&self&&self.Object===Object&&self,ue=ce||oe||Function("return this")(),ne=Object.prototype.toString,ae=Math.max,F=Math.min,N=function(){return ue.Date.now()};function G(a){var P=typeof a;return!!a&&(P=="object"||P=="function")}function y(a){if(typeof a=="number")return a;if(function(x){return typeof x=="symbol"||function(C){return!!C&&typeof C=="object"}(x)&&ne.call(x)=="[object Symbol]"}(a))return NaN;if(G(a)){var P=typeof a.valueOf=="function"?a.valueOf():a;a=G(P)?P+"":P}if(typeof a!="string")return a===0?a:+a;a=a.replace(X,"");var j=w.test(a);return j||D.test(a)?Z(a.slice(2),j?2:8):A.test(a)?NaN:+a}p.exports=function(a,P,j){var x=!0,C=!0;if(typeof a!="function")throw new TypeError(re);return G(j)&&(x="leading"in j?!!j.leading:x,C="trailing"in j?!!j.trailing:C),function(U,O,L){var B,H,V,z,E,W,q=0,J=!1,K=!1,ee=!0;if(typeof U!="function")throw new TypeError(re);function v(I){var $=B,pe=H;return B=H=void 0,q=I,z=U.apply(pe,$)}function M(I){return q=I,E=setTimeout(le,O),J?v(I):z}function Y(I){var $=I-W;return W===void 0||$>=O||$<0||K&&I-q>=V}function le(){var I=N();if(Y(I))return be(I);E=setTimeout(le,function($){var pe=O-($-W);return K?F(pe,V-($-q)):pe}(I))}function be(I){return E=void 0,ee&&B?v(I):(B=H=void 0,z)}function fe(){var I=N(),$=Y(I);if(B=arguments,H=this,W=I,$){if(E===void 0)return M(W);if(K)return E=setTimeout(le,O),v(W)}return E===void 0&&(E=setTimeout(le,O)),z}return O=y(O)||0,G(L)&&(J=!!L.leading,V=(K="maxWait"in L)?ae(y(L.maxWait)||0,O):V,ee="trailing"in L?!!L.trailing:ee),fe.cancel=function(){E!==void 0&&clearTimeout(E),q=0,B=W=H=E=void 0},fe.flush=function(){return E===void 0?z:be(N())},fe}(a,P,{leading:x,maxWait:P,trailing:C})}},703:(p,f,c)=>{var re=c(414);function X(){}function A(){}A.resetWarningCache=X,p.exports=function(){function w(ce,oe,ue,ne,ae,F){if(F!==re){var N=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw N.name="Invariant Violation",N}}function D(){return w}w.isRequired=w;var Z={array:w,bool:w,func:w,number:w,object:w,string:w,symbol:w,any:w,arrayOf:D,element:w,elementType:w,instanceOf:D,node:w,objectOf:D,oneOf:D,oneOfType:D,shape:D,exact:D,checkPropTypes:A,resetWarningCache:X};return Z.PropTypes=Z,Z}},697:(p,f,c)=>{p.exports=c(703)()},414:p=>{p.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},de={};function T(p){var f=de[p];if(f!==void 0)return f.exports;var c=de[p]={exports:{}};return te[p](c,c.exports,T),c.exports}T.n=p=>{var f=p&&p.__esModule?()=>p.default:()=>p;return T.d(f,{a:f}),f},T.d=(p,f)=>{for(var c in f)T.o(f,c)&&!T.o(p,c)&&Object.defineProperty(p,c,{enumerable:!0,get:f[c]})},T.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),T.o=(p,f)=>Object.prototype.hasOwnProperty.call(p,f),T.r=p=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(p,"__esModule",{value:!0})};var se={};(()=>{T.r(se),T.d(se,{LazyLoadComponent:()=>Ee,LazyLoadImage:()=>Ve,trackWindowScroll:()=>J});const p=De;var f=T.n(p),c=T(697);const re=ze;var X=T.n(re);function A(){return typeof window<"u"&&"IntersectionObserver"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype}function w(r){return(w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function D(r,e){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);e&&(o=o.filter(function(_){return Object.getOwnPropertyDescriptor(r,_).enumerable})),i.push.apply(i,o)}return i}function Z(r,e,i){return e in r?Object.defineProperty(r,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[e]=i,r}function ce(r,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function oe(r,e){return(oe=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i})(r,e)}function ue(r,e){if(e&&(w(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}(r)}function ne(r){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(r)}var ae=function(r){r.forEach(function(e){e.isIntersecting&&e.target.onVisible()})},F={},N=function(r){(function(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&oe(t,n)})(b,r);var e,i,o,_,Q=(o=b,_=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,n=ne(o);if(_){var s=ne(this).constructor;t=Reflect.construct(n,arguments,s)}else t=n.apply(this,arguments);return ue(this,t)});function b(t){var n;if(function(u,l){if(!(u instanceof l))throw new TypeError("Cannot call a class as a function")}(this,b),(n=Q.call(this,t)).supportsObserver=!t.scrollPosition&&t.useIntersectionObserver&&A(),n.supportsObserver){var s=t.threshold;n.observer=function(u){return F[u]=F[u]||new IntersectionObserver(ae,{rootMargin:u+"px"}),F[u]}(s)}return n}return e=b,(i=[{key:"componentDidMount",value:function(){this.placeholder&&this.observer&&(this.placeholder.onVisible=this.props.onVisible,this.observer.observe(this.placeholder)),this.supportsObserver||this.updateVisibility()}},{key:"componentWillUnmount",value:function(){this.observer&&this.placeholder&&this.observer.unobserve(this.placeholder)}},{key:"componentDidUpdate",value:function(){this.supportsObserver||this.updateVisibility()}},{key:"getPlaceholderBoundingBox",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.props.scrollPosition,n=this.placeholder.getBoundingClientRect(),s=X().findDOMNode(this.placeholder).style,u={left:parseInt(s.getPropertyValue("margin-left"),10)||0,top:parseInt(s.getPropertyValue("margin-top"),10)||0};return{bottom:t.y+n.bottom+u.top,left:t.x+n.left+u.left,right:t.x+n.right+u.left,top:t.y+n.top+u.top}}},{key:"isPlaceholderInViewport",value:function(){if(typeof window>"u"||!this.placeholder)return!1;var t=this.props,n=t.scrollPosition,s=t.threshold,u=this.getPlaceholderBoundingBox(n),l=n.y+window.innerHeight,d=n.x,m=n.x+window.innerWidth,g=n.y;return Boolean(g-s<=u.bottom&&l+s>=u.top&&d-s<=u.right&&m+s>=u.left)}},{key:"updateVisibility",value:function(){this.isPlaceholderInViewport()&&this.props.onVisible()}},{key:"render",value:function(){var t=this,n=this.props,s=n.className,u=n.height,l=n.placeholder,d=n.style,m=n.width;if(l&&typeof l.type!="function")return f().cloneElement(l,{ref:function(h){return t.placeholder=h}});var g=function(h){for(var k=1;k<arguments.length;k++){var S=arguments[k]!=null?arguments[k]:{};k%2?D(Object(S),!0).forEach(function(R){Z(h,R,S[R])}):Object.getOwnPropertyDescriptors?Object.defineProperties(h,Object.getOwnPropertyDescriptors(S)):D(Object(S)).forEach(function(R){Object.defineProperty(h,R,Object.getOwnPropertyDescriptor(S,R))})}return h}({display:"inline-block"},d);return m!==void 0&&(g.width=m),u!==void 0&&(g.height=u),f().createElement("span",{className:s,ref:function(h){return t.placeholder=h},style:g},l)}}])&&ce(e.prototype,i),b}(f().Component);N.propTypes={onVisible:c.PropTypes.func.isRequired,className:c.PropTypes.string,height:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string]),placeholder:c.PropTypes.element,threshold:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool,scrollPosition:c.PropTypes.shape({x:c.PropTypes.number.isRequired,y:c.PropTypes.number.isRequired}),width:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string])},N.defaultProps={className:"",placeholder:null,threshold:100,useIntersectionObserver:!0};const G=N;var y=T(296),a=T.n(y),P=T(96),j=T.n(P),x=function(r){var e=getComputedStyle(r,null);return e.getPropertyValue("overflow")+e.getPropertyValue("overflow-y")+e.getPropertyValue("overflow-x")};const C=function(r){if(!(r instanceof HTMLElement))return window;for(var e=r;e&&e instanceof HTMLElement;){if(/(scroll|auto)/.test(x(e)))return e;e=e.parentNode}return window};function U(r){return(U=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}var O=["delayMethod","delayTime"];function L(){return(L=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(r[o]=i[o])}return r}).apply(this,arguments)}function B(r,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function H(r,e){return(H=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i})(r,e)}function V(r,e){if(e&&(U(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return z(r)}function z(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function E(r){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(r)}var W=function(){return typeof window>"u"?0:window.scrollX||window.pageXOffset},q=function(){return typeof window>"u"?0:window.scrollY||window.pageYOffset};const J=function(r){var e=function(i){(function(s,u){if(typeof u!="function"&&u!==null)throw new TypeError("Super expression must either be null or a function");s.prototype=Object.create(u&&u.prototype,{constructor:{value:s,writable:!0,configurable:!0}}),u&&H(s,u)})(n,i);var o,_,Q,b,t=(Q=n,b=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var s,u=E(Q);if(b){var l=E(this).constructor;s=Reflect.construct(u,arguments,l)}else s=u.apply(this,arguments);return V(this,s)});function n(s){var u;if(function(d,m){if(!(d instanceof m))throw new TypeError("Cannot call a class as a function")}(this,n),(u=t.call(this,s)).useIntersectionObserver=s.useIntersectionObserver&&A(),u.useIntersectionObserver)return V(u);var l=u.onChangeScroll.bind(z(u));return s.delayMethod==="debounce"?u.delayedScroll=a()(l,s.delayTime):s.delayMethod==="throttle"&&(u.delayedScroll=j()(l,s.delayTime)),u.state={scrollPosition:{x:W(),y:q()}},u.baseComponentRef=f().createRef(),u}return o=n,(_=[{key:"componentDidMount",value:function(){this.addListeners()}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"componentDidUpdate",value:function(){typeof window>"u"||this.useIntersectionObserver||C(X().findDOMNode(this.baseComponentRef.current))!==this.scrollElement&&(this.removeListeners(),this.addListeners())}},{key:"addListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement=C(X().findDOMNode(this.baseComponentRef.current)),this.scrollElement.addEventListener("scroll",this.delayedScroll,{passive:!0}),window.addEventListener("resize",this.delayedScroll,{passive:!0}),this.scrollElement!==window&&window.addEventListener("scroll",this.delayedScroll,{passive:!0}))}},{key:"removeListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement.removeEventListener("scroll",this.delayedScroll),window.removeEventListener("resize",this.delayedScroll),this.scrollElement!==window&&window.removeEventListener("scroll",this.delayedScroll))}},{key:"onChangeScroll",value:function(){this.useIntersectionObserver||this.setState({scrollPosition:{x:W(),y:q()}})}},{key:"render",value:function(){var s=this.props,u=(s.delayMethod,s.delayTime,function(d,m){if(d==null)return{};var g,h,k=function(R,ye){if(R==null)return{};var ie,he,ke={},Re=Object.keys(R);for(he=0;he<Re.length;he++)ie=Re[he],ye.indexOf(ie)>=0||(ke[ie]=R[ie]);return ke}(d,m);if(Object.getOwnPropertySymbols){var S=Object.getOwnPropertySymbols(d);for(h=0;h<S.length;h++)g=S[h],m.indexOf(g)>=0||Object.prototype.propertyIsEnumerable.call(d,g)&&(k[g]=d[g])}return k}(s,O)),l=this.useIntersectionObserver?null:this.state.scrollPosition;return f().createElement(r,L({forwardRef:this.baseComponentRef,scrollPosition:l},u))}}])&&B(o.prototype,_),n}(f().Component);return e.propTypes={delayMethod:c.PropTypes.oneOf(["debounce","throttle"]),delayTime:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool},e.defaultProps={delayMethod:"throttle",delayTime:300,useIntersectionObserver:!0},e};function K(r){return(K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function ee(r,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function v(r,e){return(v=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i})(r,e)}function M(r,e){if(e&&(K(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}(r)}function Y(r){return(Y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(r)}var le=function(r){(function(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&v(t,n)})(b,r);var e,i,o,_,Q=(o=b,_=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,n=Y(o);if(_){var s=Y(this).constructor;t=Reflect.construct(n,arguments,s)}else t=n.apply(this,arguments);return M(this,t)});function b(t){return function(n,s){if(!(n instanceof s))throw new TypeError("Cannot call a class as a function")}(this,b),Q.call(this,t)}return e=b,(i=[{key:"render",value:function(){return f().createElement(G,this.props)}}])&&ee(e.prototype,i),b}(f().Component);const be=J(le);function fe(r){return(fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function I(r,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function $(r,e){return($=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i})(r,e)}function pe(r,e){if(e&&(fe(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Se(r)}function Se(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ve(r){return(ve=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(r)}var me=function(r){(function(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&$(t,n)})(b,r);var e,i,o,_,Q=(o=b,_=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,n=ve(o);if(_){var s=ve(this).constructor;t=Reflect.construct(n,arguments,s)}else t=n.apply(this,arguments);return pe(this,t)});function b(t){var n;(function(m,g){if(!(m instanceof g))throw new TypeError("Cannot call a class as a function")})(this,b),n=Q.call(this,t);var s=t.afterLoad,u=t.beforeLoad,l=t.scrollPosition,d=t.visibleByDefault;return n.state={visible:d},d&&(u(),s()),n.onVisible=n.onVisible.bind(Se(n)),n.isScrollTracked=Boolean(l&&Number.isFinite(l.x)&&l.x>=0&&Number.isFinite(l.y)&&l.y>=0),n}return e=b,(i=[{key:"componentDidUpdate",value:function(t,n){n.visible!==this.state.visible&&this.props.afterLoad()}},{key:"onVisible",value:function(){this.props.beforeLoad(),this.setState({visible:!0})}},{key:"render",value:function(){if(this.state.visible)return this.props.children;var t=this.props,n=t.className,s=t.delayMethod,u=t.delayTime,l=t.height,d=t.placeholder,m=t.scrollPosition,g=t.style,h=t.threshold,k=t.useIntersectionObserver,S=t.width;return this.isScrollTracked||k&&A()?f().createElement(G,{className:n,height:l,onVisible:this.onVisible,placeholder:d,scrollPosition:m,style:g,threshold:h,useIntersectionObserver:k,width:S}):f().createElement(be,{className:n,delayMethod:s,delayTime:u,height:l,onVisible:this.onVisible,placeholder:d,style:g,threshold:h,width:S})}}])&&I(e.prototype,i),b}(f().Component);me.propTypes={afterLoad:c.PropTypes.func,beforeLoad:c.PropTypes.func,useIntersectionObserver:c.PropTypes.bool,visibleByDefault:c.PropTypes.bool},me.defaultProps={afterLoad:function(){return{}},beforeLoad:function(){return{}},useIntersectionObserver:!0,visibleByDefault:!1};const Ee=me;function xe(r){return(xe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}var Ne=["afterLoad","beforeLoad","delayMethod","delayTime","effect","placeholder","placeholderSrc","scrollPosition","threshold","useIntersectionObserver","visibleByDefault","wrapperClassName","wrapperProps"];function Ie(r,e){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);e&&(o=o.filter(function(_){return Object.getOwnPropertyDescriptor(r,_).enumerable})),i.push.apply(i,o)}return i}function _e(r){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?Ie(Object(i),!0).forEach(function(o){Ce(r,o,i[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):Ie(Object(i)).forEach(function(o){Object.defineProperty(r,o,Object.getOwnPropertyDescriptor(i,o))})}return r}function Ce(r,e,i){return e in r?Object.defineProperty(r,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[e]=i,r}function ge(){return(ge=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(r[o]=i[o])}return r}).apply(this,arguments)}function Be(r,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function Le(r,e){return(Le=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i})(r,e)}function Me(r,e){if(e&&(xe(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}(r)}function Oe(r){return(Oe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(r)}var we=function(r){(function(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&Le(t,n)})(b,r);var e,i,o,_,Q=(o=b,_=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,n=Oe(o);if(_){var s=Oe(this).constructor;t=Reflect.construct(n,arguments,s)}else t=n.apply(this,arguments);return Me(this,t)});function b(t){var n;return function(s,u){if(!(s instanceof u))throw new TypeError("Cannot call a class as a function")}(this,b),(n=Q.call(this,t)).state={loaded:!1},n}return e=b,(i=[{key:"onImageLoad",value:function(){var t=this;return this.state.loaded?null:function(){t.props.afterLoad(),t.setState({loaded:!0})}}},{key:"getImg",value:function(){var t=this.props,n=(t.afterLoad,t.beforeLoad,t.delayMethod,t.delayTime,t.effect,t.placeholder,t.placeholderSrc,t.scrollPosition,t.threshold,t.useIntersectionObserver,t.visibleByDefault,t.wrapperClassName,t.wrapperProps,function(s,u){if(s==null)return{};var l,d,m=function(h,k){if(h==null)return{};var S,R,ye={},ie=Object.keys(h);for(R=0;R<ie.length;R++)S=ie[R],k.indexOf(S)>=0||(ye[S]=h[S]);return ye}(s,u);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(s);for(d=0;d<g.length;d++)l=g[d],u.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(s,l)&&(m[l]=s[l])}return m}(t,Ne));return f().createElement("img",ge({onLoad:this.onImageLoad()},n))}},{key:"getLazyLoadImage",value:function(){var t=this.props,n=t.beforeLoad,s=t.className,u=t.delayMethod,l=t.delayTime,d=t.height,m=t.placeholder,g=t.scrollPosition,h=t.style,k=t.threshold,S=t.useIntersectionObserver,R=t.visibleByDefault,ye=t.width;return f().createElement(Ee,{beforeLoad:n,className:s,delayMethod:u,delayTime:l,height:d,placeholder:m,scrollPosition:g,style:h,threshold:k,useIntersectionObserver:S,visibleByDefault:R,width:ye},this.getImg())}},{key:"getWrappedLazyLoadImage",value:function(t){var n=this.props,s=n.effect,u=n.height,l=n.placeholderSrc,d=n.width,m=n.wrapperClassName,g=n.wrapperProps,h=this.state.loaded,k=h?" lazy-load-image-loaded":"",S=h||!l?{}:{backgroundImage:"url(".concat(l,")"),backgroundSize:"100% 100%"};return f().createElement("span",ge({className:m+" lazy-load-image-background "+s+k,style:_e(_e({},S),{},{color:"transparent",display:"inline-block",height:u,width:d})},g),t)}},{key:"render",value:function(){var t=this.props,n=t.effect,s=t.placeholderSrc,u=t.visibleByDefault,l=t.wrapperClassName,d=t.wrapperProps,m=this.getLazyLoadImage();return(n||s)&&!u||l||d?this.getWrappedLazyLoadImage(m):m}}])&&Be(e.prototype,i),b}(f().Component);we.propTypes={afterLoad:c.PropTypes.func,beforeLoad:c.PropTypes.func,delayMethod:c.PropTypes.string,delayTime:c.PropTypes.number,effect:c.PropTypes.string,placeholderSrc:c.PropTypes.string,threshold:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool,visibleByDefault:c.PropTypes.bool,wrapperClassName:c.PropTypes.string,wrapperProps:c.PropTypes.object},we.defaultProps={afterLoad:function(){return{}},beforeLoad:function(){return{}},delayMethod:"throttle",delayTime:300,effect:"",placeholderSrc:null,threshold:100,useIntersectionObserver:!0,visibleByDefault:!1,wrapperClassName:""};const Ve=we})(),We.exports=se})();function $e(te="1/1"){return{"4/3":"calc(100% / 4 * 3)","3/4":"calc(100% / 3 * 4)","6/4":"calc(100% / 6 * 4)","4/6":"calc(100% / 4 * 6)","16/9":"calc(100% / 16 * 9)","9/16":"calc(100% / 9 * 16)","21/9":"calc(100% / 21 * 9)","9/21":"calc(100% / 9 * 21)","1/1":"100%"}[te]}const Fe=De.forwardRef(({ratio:te,disabledEffect:de=!1,effect:T="blur",sx:se,...p},f)=>{const c=Pe(je,{component:Te.LazyLoadImage,wrapperClassName:"wrapper",effect:de?void 0:T,placeholderSrc:de?"/assets/transparent.png":"/assets/placeholder.svg",sx:{width:1,height:1,objectFit:"cover"},...p});return te?Pe(je,{ref:f,component:"span",sx:{width:1,lineHeight:1,display:"block",overflow:"hidden",position:"relative",pt:$e(te),"& .wrapper":{top:0,left:0,width:1,height:1,position:"absolute",backgroundSize:"cover !important"},...se},children:c}):Pe(je,{ref:f,component:"span",sx:{lineHeight:1,display:"block",overflow:"hidden",position:"relative","& .wrapper":{width:1,height:1,backgroundSize:"cover !important"},...se},children:c})}),He=Fe;export{He as I};