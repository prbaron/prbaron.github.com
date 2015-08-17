/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 1.0.2
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
function FastClick(a,b){function c(a,b){return function(){return a.apply(b,arguments)}}var d;b=b||{};this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.lastTouchIdentifier=this.touchStartY=this.touchStartX=0;this.touchBoundary=b.touchBoundary||10;this.layer=a;this.tapDelay=b.tapDelay||200;if(!FastClick.notNeeded(a)){for(var g="onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" "),f=0,h=g.length;f<h;f++)this[g[f]]=c(this[g[f]],this);deviceIsAndroid&&
(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0));a.addEventListener("click",this.onClick,!0);a.addEventListener("touchstart",this.onTouchStart,!1);a.addEventListener("touchmove",this.onTouchMove,!1);a.addEventListener("touchend",this.onTouchEnd,!1);a.addEventListener("touchcancel",this.onTouchCancel,!1);Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;
"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)});"function"===typeof a.onclick&&(d=a.onclick,a.addEventListener("click",function(a){d(a)},!1),a.onclick=null)}}
var deviceIsAndroid=0<navigator.userAgent.indexOf("Android"),deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),deviceIsBlackBerry10=0<navigator.userAgent.indexOf("BB10");
FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case "button":case "select":case "textarea":if(a.disabled)return!0;break;case "input":if(deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case "label":case "video":return!0}return/\bneedsclick\b/.test(a.className)};
FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case "textarea":return!0;case "select":return!deviceIsAndroid;case "input":switch(a.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}};
FastClick.prototype.sendClick=function(a,b){var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur();d=b.changedTouches[0];c=document.createEvent("MouseEvents");c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null);c.forwardedTouchEvent=!0;a.dispatchEvent(c)};FastClick.prototype.determineEventType=function(a){return deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"};
FastClick.prototype.focus=function(a){var b;deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()};FastClick.prototype.updateScrollParent=function(a){var b,c;b=a.fastClickScrollParent;if(!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c;a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)};
FastClick.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a};
FastClick.prototype.onTouchStart=function(a){var b,c,d;if(1<a.targetTouches.length)return!0;b=this.getTargetElementFromEventTarget(a.target);c=a.targetTouches[0];if(deviceIsIOS){d=window.getSelection();if(d.rangeCount&&!d.isCollapsed)return!0;if(!deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier;this.updateScrollParent(b)}}this.trackingClick=!0;this.trackingClickStart=a.timeStamp;this.targetElement=b;this.touchStartX=c.pageX;
this.touchStartY=c.pageY;a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault();return!0};FastClick.prototype.touchHasMoved=function(a){a=a.changedTouches[0];var b=this.touchBoundary;return Math.abs(a.pageX-this.touchStartX)>b||Math.abs(a.pageY-this.touchStartY)>b?!0:!1};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))this.trackingClick=!1,this.targetElement=null;return!0};
FastClick.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};
FastClick.prototype.onTouchEnd=function(a){var b,c,d=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0;this.cancelNextClick=!1;this.lastClickTime=a.timeStamp;b=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;deviceIsIOSWithBadTarget&&(c=a.changedTouches[0],d=document.elementFromPoint(c.pageX-window.pageXOffset,c.pageY-window.pageYOffset)||d,d.fastClickScrollParent=this.targetElement.fastClickScrollParent);
c=d.tagName.toLowerCase();if("label"===c){if(b=this.findControl(d)){this.focus(d);if(deviceIsAndroid)return!1;d=b}}else if(this.needsFocus(d)){if(100<a.timeStamp-b||deviceIsIOS&&window.top!==window&&"input"===c)return this.targetElement=null,!1;this.focus(d);this.sendClick(d,a);deviceIsIOS&&"select"===c||(this.targetElement=null,a.preventDefault());return!1}if(deviceIsIOS&&!deviceIsIOS4&&(b=d.fastClickScrollParent)&&b.fastClickLastScrollTop!==b.scrollTop)return!0;this.needsClick(d)||(a.preventDefault(),
this.sendClick(d,a));return!1};FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1;this.targetElement=null};FastClick.prototype.onMouse=function(a){return this.targetElement&&!a.forwardedTouchEvent&&a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0};
FastClick.prototype.onClick=function(a){if(this.trackingClick)return this.targetElement=null,this.trackingClick=!1,!0;if("submit"===a.target.type&&0===a.detail)return!0;a=this.onMouse(a);a||(this.targetElement=null);return a};
FastClick.prototype.destroy=function(){var a=this.layer;deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0));a.removeEventListener("click",this.onClick,!0);a.removeEventListener("touchstart",this.onTouchStart,!1);a.removeEventListener("touchmove",this.onTouchMove,!1);a.removeEventListener("touchend",this.onTouchEnd,!1);a.removeEventListener("touchcancel",this.onTouchCancel,!1)};
FastClick.notNeeded=function(a){var b,c;if("undefined"===typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1])if(deviceIsAndroid){if((b=document.querySelector("meta[name=viewport]"))&&(-1!==b.content.indexOf("user-scalable=no")||31<c&&document.documentElement.scrollWidth<=window.outerWidth))return!0}else return!0;return deviceIsBlackBerry10&&(b=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),10<=b[1]&&3<=b[2]&&(b=document.querySelector("meta[name=viewport]"))&&
(-1!==b.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===a.style.msTouchAction?!0:!1};FastClick.attach=function(a,b){return new FastClick(a,b)};"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return FastClick}):"undefined"!==typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;

// http://thednp.github.io/bootstrap.native/
// collapsed.min.js
!function(t){"undefined"!=typeof module&&"object"==typeof exports?module.exports="undefined"!=typeof window?t():t:window.Collapse=t()}(function(){var t=function(t,e){this.btn="object"==typeof t?t:document.querySelector(t),this.accordion=null,this.collapse=null,this.options={},this.duration=300,this.options.duration=document.documentElement.classList.contains("ie")?0:e.duration||this.duration,this.init()};t.prototype={init:function(){this.actions(),this.btn.addEventListener("click",this.toggle,!1),document.addEventListener("click",this.update,!1),window.addEventListener("resize",this.update,!1)},actions:function(){var t=this;this.toggle=function(e){t.btn=t.getTarget(e).btn,t.collapse=t.getTarget(e).collapse,t.collapse.classList.contains("in")?t.close(e):t.open(e)},this.close=function(e){e.preventDefault(),t.btn=t.getTarget(e).btn,t.collapse=t.getTarget(e).collapse,t._close(t.collapse),t.btn.classList.add("collapsed")},this.open=function(e){if(e.preventDefault(),t.btn=t.getTarget(e).btn,t.collapse=t.getTarget(e).collapse,t.accordion=t.btn.getAttribute("data-parent")&&t.getClosest(t.btn,t.btn.getAttribute("data-parent")),t._open(t.collapse),t.btn.classList.remove("collapsed"),null!==t.accordion){var n=t.accordion.querySelectorAll(".collapse.in");[].forEach.call(n,function(e){e!==t.collapse&&t._close(e)})}},this._open=function(e){e.classList.add("in"),e.style.height=0,e.style.overflow="hidden",e.setAttribute("area-expanded","true");var n=this.getMaxHeight(e).oh,o=this.getMaxHeight(e).br;e.style.height=n+o+"px",setTimeout(function(){e.style.overflow=""},t.options.duration)},this._close=function(e){e.style.overflow="hidden",e.style.height=0,setTimeout(function(){e.classList.remove("in"),e.style.overflow="",e.setAttribute("area-expanded","false")},t.options.duration)},this.update=function(e){var n=e.type,o=e.target,r=document.querySelectorAll(".collapse.in");[].forEach.call(r,function(e){var r=t.getMaxHeight(e).oh,a=t.getMaxHeight(e).br;("resize"===n||"click"===n&&t.getClosest(o,".collapse")===e)&&setTimeout(function(){e.style.height=r+a+"px"},300)})},this.getMaxHeight=function(t){var n=t.children[0],o=t.currentStyle||window.getComputedStyle(t);return{oh:e(n),br:parseInt(o.borderTop||0)+parseInt(o.borderBottom||0)}},this.getTarget=function(t){var e=t.currentTarget||t.srcElement,n=e.href&&e.getAttribute("href").replace("#",""),o=e.getAttribute("data-target")&&e.getAttribute("data-target"),r=n||o&&/#/.test(o)&&o.replace("#",""),a=o&&"."===o.charAt(0)&&o,i=r&&document.getElementById(r)||a&&document.querySelector(a);return{btn:e,collapse:i}},this.getClosest=function(t,e){for(var n=e.charAt(0);t&&t!==document;t=t.parentNode){if("."===n&&t.classList.contains(e.substr(1)))return t;if("#"===n&&t.id===e.substr(1))return t}return!1}}};var e=function(t){var e=t.currentStyle||window.getComputedStyle(t);return t.offsetHeight+parseInt(/px/.test(e.marginTop)?Math.round(e.marginTop.replace("px","")):0)+parseInt(/px/.test(e.marginBottom)?Math.round(e.marginBottom.replace("px","")):0)+parseInt(/em/.test(e.marginTop)?Math.round(e.marginTop.replace("em","")*parseInt(e.fontSize)):0)+parseInt(/em/.test(e.marginBottom)?Math.round(e.marginBottom.replace("em","")*parseInt(e.fontSize)):0)},n=document.querySelectorAll('[data-toggle="collapse"]');return[].forEach.call(n,function(e){var n={};return n.duration=e.getAttribute("data-duration"),new t(e,n)}),window.addEventListener("load",function(){var t=document.querySelectorAll(".collapse");[].forEach.call(t,function(t){if(t.classList.contains("in")){var n=t.currentStyle||window.getComputedStyle(t),o=e(t.children[0]),r=parseInt(n.borderTop||0)+parseInt(n.borderBottom||0);t.style.height=o+r+"px"}})}),t});

//dropdown.js
!function(e){"undefined"!=typeof module&&"object"==typeof exports?module.exports="undefined"!=typeof window?e():e:window.Dropdown=e()}(function(e){var t=function(e){this.menu="object"==typeof e?e:document.querySelector(e),this.init()};t.prototype={init:function(){var e=this;e.actions(),e.menu.setAttribute("tabindex","0"),e.menu.addEventListener("click",e.toggle,!1),e.menu.addEventListener("blur",e.close,!1)},actions:function(){var e=this;e.toggle=function(e){var t=e.currentTarget||e.srcElement;return t.parentNode.classList.toggle("open"),e.preventDefault(),!1},e.close=function(e){var t=e.currentTarget||e.srcElement;setTimeout(function(){t.parentNode.classList.remove("open")},200)}}};var n=document.querySelectorAll("[data-toggle=dropdown]");return[].forEach.call(n,function(e,n){return new t(e)}),t});