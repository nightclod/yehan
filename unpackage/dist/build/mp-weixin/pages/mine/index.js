(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/index"],{"02ce":function(n,o,e){"use strict";var i=e("e50e"),c=e.n(i);c.a},"1d7e":function(n,o,e){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i=function(){Promise.all([e.e("common/vendor"),e.e("components/uni-popup/uni-popup")]).then(function(){return resolve(e("39c4"))}.bind(null,e)).catch(e.oe)},c={name:"mine",data:function(){return{name:"点击登录~",headurl:"../../static/img/name.jpg",secondary:"你的名字，学习",loginfo:!1,userinfo:{}}},onReady:function(){var o=this;n.getStorage({key:"user_info",success:function(n){o.name=n.data.nickName,o.headurl=n.data.avatarUrl,o.loginfo=!0},fail:function(n){console.log(n),o.loginfo=!1}})},components:{uniPopup:i},methods:{log:function(){this.loginfo?this.$refs.logout.open():this.$refs.login.open()},login:function(){var o=this;o.$refs.login.close(),this.load(!0),n.getUserInfo({provider:"weixin",success:function(e){console.log(e),o.userinfo={encryptedData:e.encryptedData,iv:e.iv},o.verifySession((function(i){i&&(o.name=e.userInfo.nickName,o.headurl=e.userInfo.avatarUrl,o.loginfo=!0,o.load(!1),n.setStorage({key:"user_info",data:e.userInfo}))}))},fail:function(n){o.$refs.login.close(),o.load(!1),console.log(n,"失败，调用设置页")}})},verifySession:function(o){var e=this;n.checkSession({success:function(){console.log("未失效"),o&&o(!0)},fail:function(){console.log("已失效"),n.login({provider:"weixin",success:function(n){wx.cloud.init(),wx.cloud.callFunction({name:"login",data:{code:n.code,info:e.userinfo},success:function(n){console.log("连接成功，状态不确定"),o&&o(!0)},fail:function(n){console.log("连接失败")}})},fail:function(n){console.log(n,"失败，调用设置页")}})}}),n.login({provider:"weixin",success:function(n){wx.cloud.init(),wx.cloud.callFunction({name:"login",data:{code:n.code,info:e.userinfo},success:function(n){console.log(n,"连接成功，状态不确定"),o&&o(!0)},fail:function(n){console.log("连接失败")}})},fail:function(n){console.log(n,"失败，调用设置页")}})},logout:function(){var o=this;n.removeStorage({key:"user_info",success:function(n){o.$refs.logout.close(),o.name="点击登录~",o.headurl="../../static/img/name.jpg",o.loginfo=!1},fail:function(n){o.loginfo=!0}})},load:function(n){n?this.$refs.loading.open():this.$refs.loading.close()}}};o.default=c}).call(this,e("543d")["default"])},3249:function(n,o,e){"use strict";e.r(o);var i=e("f54c"),c=e("4f83");for(var t in c)"default"!==t&&function(n){e.d(o,n,(function(){return c[n]}))}(t);e("02ce");var u,l=e("f0c5"),s=Object(l["a"])(c["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);o["default"]=s.exports},"4f83":function(n,o,e){"use strict";e.r(o);var i=e("1d7e"),c=e.n(i);for(var t in i)"default"!==t&&function(n){e.d(o,n,(function(){return i[n]}))}(t);o["default"]=c.a},e50e:function(n,o,e){},f54c:function(n,o,e){"use strict";var i={uniPopup:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-popup/uni-popup")]).then(e.bind(null,"39c4"))}},c=function(){var n=this,o=n.$createElement;n._self._c},t=[];e.d(o,"b",(function(){return c})),e.d(o,"c",(function(){return t})),e.d(o,"a",(function(){return i}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/index-create-component',
    {
        'pages/mine/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3249"))
        })
    },
    [['pages/mine/index-create-component']]
]);
