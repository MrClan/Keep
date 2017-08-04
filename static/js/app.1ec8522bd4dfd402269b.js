webpackJsonp([1],{156:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},157:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(158);e.default={data:function(){return{notes:[],noteTypes:o.a,title:"",content:"",heightClass:["","grid-item--height2","grid-item--height3"],widthClass:["","grid-item--width2","grid-item--width3"]}},methods:{createNote:function(){if(this.title.trim()||this.content.trim()){var t=this;o.b.ref("notes").push({title:this.title,content:this.content},function(e){if(e)throw e;t.title="",t.content=""})}}},mounted:function(){var t=o.b.ref("notes"),e=this.notes,n=this;try{t.once("value",function(t){t.forEach(function(t){e.push({key:t.key,title:t.val().title,content:t.val().content,color:o.c[parseInt(15*Math.random())],classes:["grid-item",n.heightClass[parseInt(3*Math.random())],n.widthClass[parseInt(3*Math.random())]]})})})}catch(t){console.log(t)}t.on("child_added",function(t){e.unshift({key:t.key,title:t.val().title,content:t.val().content,color:o.c[parseInt(15*Math.random())],classes:["grid-item",n.heightClass[parseInt(3*Math.random())],n.widthClass[parseInt(3*Math.random())]]})}),t.on("child_changed",function(t){}),t.on("child_removed",function(t){})}}},158:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return s}),n.d(e,"c",function(){return c});var o=n(45),a=(n.n(o),{apiKey:"AIzaSyCFQpZ-6z4s4OYmP3Hn4NP8GYWzTn9LmiY",authDomain:"fmsmvp.firebaseapp.com",databaseURL:"https://fmsmvp.firebaseio.com",projectId:"fmsmvp",storageBucket:"fmsmvp.appspot.com",messagingSenderId:"589344362356"}),i=o.initializeApp(a),r=i.database(),s=["Todo","Text","Image"],c=["#1abc9c","#3498db","#9b59b6","#8e44ad","#16a085","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6","#7f8c8d","#bdc3c7","#c0392b","#d35400","#f39c12"]},159:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(46),a=n(89),i=n.n(a),r=n(88),s=n(45),c=(n.n(s),n(87));n.n(c);o.a.config.productionTip=!1,new o.a({el:"#app",router:r.a,template:"<App/>",components:{App:i.a}})},160:function(t,e){},161:function(t,e){},165:function(t,e,n){function o(t){n(161)}var a=n(86)(n(157),n(167),o,null,null);t.exports=a.exports},166:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view"),t._v(" "),n("hr"),t._v(" "),n("h5",[t._v("Google Keep Clone")]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h6",[n("a",{attrs:{href:"https://github.com/MrClan",target:"_blank"}},[t._v("MrClan")])])}]}},167:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"grid"},[n("div",{staticClass:"grid-item",staticStyle:{height:"404px",width:"100%","border-radius":"57px","background-color":"#2ecc71",color:"#EEE"}},[n("h3",[t._v("Add New Note")]),t._v(" "),n("form",{staticClass:"create-note",on:{submit:function(e){e.preventDefault(),t.createNote()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{name:"title",placeholder:"Title"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{name:"content",placeholder:"Text goes here...",rows:"12"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),t._v(" "),n("button",{attrs:{type:"submit"}},[t._v("+")])]),t._v(" "),n("h5",[t._v(t._s(t.notes.length)+" notes saved")])]),t._v(" "),t._l(t.notes,function(e,o){return[(e.r,n("div",{staticClass:"grid-item",style:{backgroundColor:e.color}},[n("h4",[t._v(t._s(o+1)+". "+t._s(e.title))]),t._v(" "),n("p",[t._v(t._s(e.content))])]))]})],2)])},staticRenderFns:[]}},88:function(t,e,n){"use strict";var o=n(46),a=n(168),i=n(165),r=n.n(i);o.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"Notes",component:r.a}]})},89:function(t,e,n){function o(t){n(160)}var a=n(86)(n(156),n(166),o,null,null);t.exports=a.exports}},[159]);
//# sourceMappingURL=app.1ec8522bd4dfd402269b.js.map