(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},174:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),i=(n(100),n(91)),s=n(81),l=n(82),d=n(90),u=n(83),m=n(92),h=(n(101),n(176)),p=n(177),b=n(24),g=n(84),w=n.n(g),f=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e)))._search=function(e){b.a.event({category:"search",action:"press",label:e}),n.setState({loading:!0}),fetch("https://7d2i8oa48i.execute-api.ap-northeast-2.amazonaws.com/prod/search",{method:"POST",body:JSON.stringify({query_text:e})}).then(function(e){return e.json()}).then(function(e){n.setState({searchResult:JSON.parse(e.body),loading:!1})})},n._downloadFile=function(e){n.setState({loading:!0}),fetch("https://7d2i8oa48i.execute-api.ap-northeast-2.amazonaws.com/prod/download",{method:"POST",body:JSON.stringify({dccon_num:e})}).then(function(e){return e.json()}).then(function(t){var a=document.createElement("a");a.setAttribute("href","data:text/plain;base64,"+t.body),a.setAttribute("download",e.toString()),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),n.setState({loading:!1})})},n._onPressDownload=function(){b.a.event({category:"download",action:"press",label:n.state.dcconNumber}),n._downloadFile(n.state.dcconNumber)},n._onPressChromeWebstore=function(){b.a.event({category:"extension-transition",action:"press"})},n.state={queryText:"",dcconNumber:52640,searchResult:[],downloadButtonDisabled:!1,loading:!1},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"SearchResultList",value:function(e){return o.a.createElement("div",{className:"SearchResult-container"},e.items.map(function(t,n){return o.a.createElement(h.a,{className:"search-result-card",type:"flex",hoverable:!0,style:{width:160},key:t.num,cover:o.a.createElement("img",{src:"data:image/jpg;base64,".concat(t.thumbnail),alt:t.name}),bodyStyle:{textAlign:"left",width:"100%",padding:"12px"},onClick:function(){e.downloader(t.num)}},o.a.createElement("span",null,t.name))}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(w.a,{className:"App",active:this.state.loading,styles:{content:function(e){return Object(i.a)({},e,{position:"fixed",top:"40%",left:"40%",margin:"auto"})}},spinner:!0,text:"\ub85c\ub529\uc911..."},o.a.createElement("a",{onClick:this._onPressChromeWebstore,href:"https://chrome.google.com/webstore/detail/dccon-downloader/giaepkpgacklikcdgcoiniapegeakgad"},o.a.createElement("img",{src:"/ChromeWebStore_BadgeWBorder_v2_340x96.png",alt:"Download at Chrome webstore"})),o.a.createElement("p",null," \ud06c\ub86c \ud655\uc7a5\ud504\ub85c\uadf8\ub7a8\uc774 \ub098\uc654\uc2b5\ub2c8\ub2e4! \uc774\uc81c \ub313\uae00\uc5d0\uc11c, \ub514\uc2dc\ucf58 \ud398\uc774\uc9c0\uc5d0\uc11c \ubc14\ub85c\ubc14\ub85c \ub2e4\uc6b4\ub85c\ub4dc\ud558\uc138\uc694! "),o.a.createElement("span",null,"\uac80\uc0c9\uacb0\uacfc\ub97c \ud074\ub9ad\ud574\uc11c \ubc14\ub85c zip\ud30c\uc77c\ub85c \ub2e4\uc6b4\ub85c\ub4dc \uac00\ub2a5"),o.a.createElement("div",{className:"Search-conatiner"},o.a.createElement(p.a.Search,{placeholder:"\uac80\uc0c9\uc5b4",enterButton:"\uac80\uc0c9!",size:"large",onSearch:function(t){return e._search(t)}})),o.a.createElement(this.SearchResultList,{items:this.state.searchResult,downloader:this._downloadFile}),o.a.createElement("div",{className:"Download-conatiner"},o.a.createElement("span",null," \ub514\uc528\ucf58 \ubc88\ud638 "),o.a.createElement("input",{id:"downloadInput",onKeyPress:function(t){"Enter"===t.key&&e._onPressDownload()},onChange:function(t){e.setState({dcconNumber:t.target.value})},placeholder:52640}),o.a.createElement("button",{onClick:this._onPressDownload,disabled:this.state.downloadButtonDisabled},this.state.downloadButtonDisabled?"\ub2e4\uc6b4\ub85c\ub4dc\uc911...":"\ub2e4\uc6b4\ub85c\ub4dc!")),o.a.createElement("span",null," Github Repository: ",o.a.createElement("a",{href:"https://github.com/cereme/dccon-downloader",target:"_blank"},"https://github.com/cereme/dccon-downloader")," ")))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));b.a.initialize("UA-143376494-1"),b.a.pageview("/"),c.a.render(o.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},95:function(e,t,n){e.exports=n(174)}},[[95,1,2]]]);
//# sourceMappingURL=main.be0c0782.chunk.js.map