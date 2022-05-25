(function(){"use strict";var e={9857:function(e,t,n){var o=n(9242),a=n(3396);function r(e,t,n,o,r,i){const l=(0,a.up)("page-header"),u=(0,a.up)("router-view"),s=(0,a.up)("alert");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(l),(0,a.Wm)(u),(0,a.Wm)(s,{show:e.show},null,8,["show"])])}var i=n(7139);const l={class:"header relative on-top"},u={class:"page-container align-vertical relative"},s=(0,a._)("option",{disabled:"",value:"0"},"MY ALBUMS",-1),c=["value"],d={key:0};function m(e,t,n,r,m,h){const f=(0,a.up)("font-awesome-icon");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",l,[(0,a._)("div",u,[(0,a._)("h1",{onClick:t[0]||(t[0]=t=>e.$router.push("/gallery")),class:"header-logo pointer"},"valstock"),e.isAuthenticated?(0,a.wy)(((0,a.wg)(),(0,a.iD)("select",{key:0,onChange:t[1]||(t[1]=(...e)=>h.openAlbum&&h.openAlbum(...e)),"onUpdate:modelValue":t[2]||(t[2]=e=>m.album=e),class:"albums-header-button"},[s,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.albums,(e=>((0,a.wg)(),(0,a.iD)("option",{key:e.name,value:e.id},(0,i.zw)(e.name),9,c)))),128))],544)),[[o.bM,m.album]]):(0,a.kq)("",!0),e.isAuthenticated?((0,a.wg)(),(0,a.iD)("button",{key:1,onClick:t[3]||(t[3]=(...e)=>h.logout&&h.logout(...e)),class:"logout-header-button"},[m.width>575?((0,a.wg)(),(0,a.iD)("span",d,"LOGOUT")):((0,a.wg)(),(0,a.j4)(f,{key:1,icon:"sign-out"}))])):(0,a.kq)("",!0)])])])}var h=n(65),f={name:"page-header",computed:{...(0,h.Se)("authentication",{isAuthenticated:"isAuthenticated"}),...(0,h.Se)("gallery",{albums:"allAlbums"})},watch:{$route(e){"album"!==e.name&&(this.album=0)}},data(){return{album:0,width:window.innerWidth}},methods:{...(0,h.nv)("authentication",{logoutUser:"logoutUser"}),async logout(){try{await this.logoutUser(),await this.$router.push("/login")}catch(e){console.log(e)}},openAlbum(){this.$router.push("/album/"+this.album)}},mounted(){window.addEventListener("resize",(()=>{this.width=window.innerWidth}))}},g=n(89);const p=(0,g.Z)(f,[["render",m]]);var b=p;const w={key:0,class:"alert"};function v(e,t,n,r,i,l){return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(o.uT,null,{default:(0,a.w5)((()=>[n.show?((0,a.wg)(),(0,a.iD)("div",w," The action was successfully done ")):(0,a.kq)("",!0)])),_:1})])}var y={name:"AlertNotification",props:{show:{default:!1}}};const A=(0,g.Z)(y,[["render",v]]);var S=A,I={components:{PageHeader:b,Alert:S},computed:{...(0,h.Se)({show:"show"})}};const E=(0,g.Z)(I,[["render",r]]);var O=E,_=n(678),N=(n(1703),{namespaced:!0,state(){return{loggedUser:JSON.parse(localStorage.getItem("loggedUser"))||null,isAuthenticated:localStorage.getItem("isAuthenticated")||!1}},mutations:{LOGIN_USER(e,t){e.loggedUser=t,e.isAuthenticated=!0},LOGOUT_USER(e){e.loggedUser=null,e.isAuthenticated=!1}},getters:{isAuthenticated(e){return e.isAuthenticated}},actions:{async loginUser(e,t){let n=null,o=await(await fetch("./fakeDatabase/users.json")).json();if(o.forEach((e=>{e.username===t.username&&e.password===t.password&&(n=e)})),!n){const e=new Error("Wrong login credentials");throw e.code=401,e}delete n["password"],e.commit("LOGIN_USER",n),localStorage.setItem("loggedUser",JSON.stringify(n)),localStorage.setItem("isAuthenticated",!0)},async logoutUser(e){e.commit("LOGOUT_USER"),localStorage.removeItem("loggedUser"),localStorage.removeItem("isAuthenticated")}}}),D={namespaced:!0,state(){return{selectedDetailedItem:JSON.parse(localStorage.getItem("selectedDetailedItem"))||null,albums:JSON.parse(localStorage.getItem("albums"))||[]}},getters:{selectedDetailedItem(e){return e.selectedDetailedItem},allAlbums(e){return e.albums}},actions:{setNewItem(e,t){e.commit("SET_NEW_ITEM",t)},addNewAlbum(e,t){if(e.getters.allAlbums.some((e=>e.name===t.name)))throw new Error("Duplicate album name");let n={name:t.name,id:t.id,items:[t.item],upload_date:t.upload_date};e.commit("ADD_NEW_ALBUM",n)},addInAlbum(e,t){e.commit("ADD_IN_ALBUM",t)},deleteItem(e,t){e.commit("DELETE_ITEM",t)}},mutations:{SET_NEW_ITEM(e,t){e.selectedDetailedItem=t,localStorage.setItem("selectedDetailedItem",JSON.stringify(t))},ADD_NEW_ALBUM(e,t){e.albums.push(t),localStorage.setItem("albums",JSON.stringify(e.albums))},ADD_IN_ALBUM(e,t){let n=e.albums.findIndex((e=>e.name===t.name));if(-1===n)throw new Error("There was an error");e.albums[n].items.push(t.item),localStorage.removeItem("albums"),localStorage.setItem("albums",JSON.stringify(e.albums))},DELETE_ITEM(e,t){let n=e.albums.findIndex((e=>e.id===Number(t.in)));if(-1===n)throw new Error("There was an error");{let o=e.albums[n].items.findIndex((e=>e.id===t.item.id));-1!==o&&(e.albums[n].items.splice(o,1),localStorage.removeItem("albums"),localStorage.setItem("albums",JSON.stringify(e.albums)))}}}},k=(0,h.MT)({state:{showActionNotification:!1},getters:{show(e){return e.showActionNotification}},mutations:{SHOW(e){e.showActionNotification=!0,setTimeout((()=>{e.showActionNotification=!1}),2300)}},actions:{show(e){e.commit("SHOW")}},modules:{authentication:N,gallery:D}});const T=[{path:"/gallery",name:"gallery",component:()=>n.e(239).then(n.bind(n,239)),meta:{auth:!0}},{path:"/details-page/:id",name:"details-page",component:()=>Promise.all([n.e(589),n.e(721)]).then(n.bind(n,2721)),meta:{auth:!0}},{path:"/album/:id",name:"album",component:()=>Promise.all([n.e(589),n.e(749)]).then(n.bind(n,749)),meta:{auth:!0}},{path:"/login",name:"login",component:()=>n.e(702).then(n.bind(n,1807)),meta:{auth:!1}},{path:"/:pathMatch(.*)*",component:()=>n.e(205).then(n.bind(n,4205))}],U=(0,_.p7)({history:(0,_.r5)("/GalleryProject/"),routes:T});U.beforeEach(((e,t,n)=>{e.meta.auth&&!k.getters["authentication/isAuthenticated"]?n("/login"):!e.meta.auth&&k.getters["authentication/isAuthenticated"]?n("/gallery"):("/"===e.path&&(k.getters["authentication/isAuthenticated"]?n("/gallery"):n("/login")),n())}));var j=U,M=n(8125),L=n(8321),W=n(7749);M.vI.add(L.mRB),(0,o.ri)(O).component("font-awesome-icon",W.GN).use(k).use(j).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,r){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],r=e[c][2];for(var l=!0,u=0;u<o.length;u++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[u])}))?o.splice(u--,1):(l=!1,r<i&&(i=r));if(l){e.splice(c--,1);var s=a();void 0!==s&&(t=s)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,a,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{205:"f2c43cf3",239:"60f60418",589:"66588642",702:"669fb73b",721:"013f3d62",749:"776ecfb6"}[e]+".js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="gallery-project:";n.l=function(o,a,r,i){if(e[o])e[o].push(a);else{var l,u;if(void 0!==r)for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++){var d=s[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+r){l=d;break}}l||(u=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,n.nc&&l.setAttribute("nonce",n.nc),l.setAttribute("data-webpack",t+r),l.src=o),e[o]=[a];var m=function(t,n){l.onerror=l.onload=null,clearTimeout(h);var a=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(m.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=m.bind(null,l.onerror),l.onload=m.bind(null,l.onload),u&&document.head.appendChild(l)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/GalleryProject/"}(),function(){var e={143:0};n.f.j=function(t,o){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var r=new Promise((function(n,o){a=e[t]=[n,o]}));o.push(a[2]=r);var i=n.p+n.u(t),l=new Error,u=function(o){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var r=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",l.name="ChunkLoadError",l.type=r,l.request=i,a[1](l)}};n.l(i,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,i=o[0],l=o[1],u=o[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(u)var c=u(n)}for(t&&t(o);s<i.length;s++)r=i[s],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},o=self["webpackChunkgallery_project"]=self["webpackChunkgallery_project"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(9857)}));o=n.O(o)})();
//# sourceMappingURL=app.c685dd63.js.map