(this["webpackJsonpreact-confection-example"]=this["webpackJsonpreact-confection-example"]||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},function(e,t,n){},,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(5);var a=n(0),r=n.n(a),c=n(3),o=n.n(c),u=n(1);function l(e,t){void 0===t&&(t=1e3);var n=Object(a.useRef)(),r=Object(a.useRef)();return Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t)return r.current=setInterval((function(){n.current()}),t),function(){return clearInterval(r.current)}}),[t]),function(){clearInterval(r.current)}}function i(e){var t=e.flipHorizontal,n=void 0!==t&&t,c=Object(a.useRef)(null),o=Object(a.useState)({id:0}),u=o[0],l=o[1];!function(e){var t=Object(a.useState)(""),n=t[0],r=t[1];Object(a.useEffect)((function(){navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:!0}).then((function(t){e.current.srcObject=t,requestAnimationFrame((function(){c()}))})).catch((function(e){console.error("Something went wrong!",e)}))}),[]);var c=function(t){var n=document.createElement("canvas");n.width=e.current.videoWidth,n.height=e.current.videoHeight,n.getContext("2d").drawImage(e.current,0,0,n.width,n.height),r(n.toDataURL().slice("data:image/png;base64,")[1])}}(c);return Object(a.useEffect)((function(){if(u){var e,t=u;null!==(e=t)&&void 0!==e&&e.id||(t={}),n&&(t.transform="scale(-1, 1)"),l(t)}return function(){l({id:0})}}),[n]),r.a.createElement("video",{autoPlay:!0,ref:c,style:u})}n(10);var s=function(){var e=function(e,t){var n=Object(a.useState)((function(){var n=window.localStorage.getItem(e);try{var a=JSON.parse(n);return a||(window.localStorage.setItem(e,JSON.stringify(t)),t)}catch(r){return window.localStorage.setItem(e,JSON.stringify(t)),t}})),r=n[0],c=n[1];return[r,function(t){try{var n=t instanceof Function?t(r):t;c(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.error(a)}}]}("test","value"),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(0),s=Object(u.a)(o,2),f=s[0],m=s[1],h=Object(a.useState)(!1),v=Object(u.a)(h,2),d=v[0],g=v[1],b=l((function(){m(f+1)}),1234);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"\ud83d\ude04 react-confection \ud83d\ude04"),r.a.createElement("h4",null,"made using ",r.a.createElement("a",{href:"https://www.npmjs.com/package/create-react-library"},"create-react-library")),r.a.createElement("p",null,r.a.createElement("em",null,"react-confection")," is a cornucopia of hooks and components that I need/like/want in my projects."),r.a.createElement("h2",null," useLocalStorage "),r.a.createElement("label",null,"Change the value and refresh the page",r.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:n,type:"text"})),r.a.createElement("h2",null," useInterval "),r.a.createElement("p",null,"A perpetual timer that snuggles with React.  This one updates a counter every 1,234ms.",r.a.createElement("br",null),"Count: ",f,r.a.createElement("br",null),r.a.createElement("button",{onClick:function(e){return b()}},"Cancel Timer")),r.a.createElement("h2",null," WebCam / useWebcam"),r.a.createElement("label",null,"Flip horizontal?",r.a.createElement("input",{onChange:function(e){return g(!d)},type:"checkbox",value:d})),r.a.createElement(i,{flipHorizontal:d}))};o.a.render(r.a.createElement(s,null),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.c58b8520.chunk.js.map