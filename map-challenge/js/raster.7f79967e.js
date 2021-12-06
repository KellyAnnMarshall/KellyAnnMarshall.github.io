(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["raster"],{7222:function(t,n,e){"use strict";e.r(n);var a=e("7a23"),r=function(t){return Object(a["v"])("data-v-e5998cc4"),t=t(),Object(a["t"])(),t},o={class:"position-relative h-100 w-100"},i=r((function(){return Object(a["g"])("div",{class:"map-header position-absolute text-light"},[Object(a["g"])("h2",{class:"h3 m-0"},[Object(a["g"])("span",null,"Day 10 - "),Object(a["i"])("Raster")])],-1)})),u={ref:"map-root",class:"basemap"};function s(t,n,e,r,s,c){return Object(a["s"])(),Object(a["f"])("div",o,[i,Object(a["g"])("div",u,null,512)])}e("d81d");var c=e("e192"),d=e.n(c),f=(e("e746"),e("c956")),l={data:function(){return{accessToken:"pk.eyJ1Ijoia21hcnNoYWxsIiwiYSI6ImNrdXdudGlpODI2ejkydXF2bXcyM3poaWQifQ.hyBCr6uwWlDGMGyVmuKCIw",map:null}},methods:{getSunPosition:function(t){var n=this.map.getCenter(),e=f["getPosition"](t||Date.now(),n.lat,n.lng),a=180+180*e.azimuth/Math.PI,r=90-180*e.altitude/Math.PI;return[a,r]},initMap:function(){var t=this;d.a.accessToken=this.accessToken,this.map=new d.a.Map({container:this.$refs["map-root"],center:[-4.9996457,56.776545],zoom:12,pitch:85,bearing:80,style:"mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y"}),this.map.on("load",(function(){t.map.addSource("mapbox-dem",{type:"raster-dem",url:"mapbox://mapbox.mapbox-terrain-dem-v1",tileSize:512,maxzoom:14}),t.map.setTerrain({source:"mapbox-dem",exaggeration:1.5}),t.map.addLayer({id:"sky",type:"sky",paint:{"sky-type":"atmosphere","sky-atmosphere-sun":t.getSunPosition(new Date),"sky-atmosphere-sun-intensity":5}})}));var n=new d.a.NavigationControl;this.map.addControl(n,"top-right"),this.map.scrollZoom.disable()}},mounted:function(){this.initMap()}},p=(e("f0ab"),e("d959")),h=e.n(p);const m=h()(l,[["render",s],["__scopeId","data-v-e5998cc4"]]);n["default"]=m},9781:function(t,n,e){},c956:function(t,n,e){(function(){"use strict";var n=Math.PI,e=Math.sin,a=Math.cos,r=Math.tan,o=Math.asin,i=Math.atan2,u=Math.acos,s=n/180,c=864e5,d=2440588,f=2451545;function l(t){return t.valueOf()/c-.5+d}function p(t){return new Date((t+.5-d)*c)}function h(t){return l(t)-f}var m=23.4397*s;function g(t,n){return i(e(t)*a(m)-r(n)*e(m),a(t))}function v(t,n){return o(e(n)*a(m)+a(n)*e(m)*e(t))}function b(t,n,o){return i(e(t),a(t)*e(n)-r(o)*a(n))}function M(t,n,r){return o(e(n)*e(r)+a(n)*a(r)*a(t))}function w(t,n){return s*(280.16+360.9856235*t)-n}function y(t){return t<0&&(t=0),2967e-7/Math.tan(t+.00312536/(t+.08901179))}function k(t){return s*(357.5291+.98560028*t)}function x(t){var a=s*(1.9148*e(t)+.02*e(2*t)+3e-4*e(3*t)),r=102.9372*s;return t+a+r+n}function D(t){var n=k(t),e=x(n);return{dec:v(e,0),ra:g(e,0)}}var I={getPosition:function(t,n,e){var a=s*-e,r=s*n,o=h(t),i=D(o),u=w(o,a)-i.ra;return{azimuth:b(u,r,i.dec),altitude:M(u,r,i.dec)}}},O=I.times=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]];I.addTime=function(t,n,e){O.push([t,n,e])};var P=9e-4;function j(t,e){return Math.round(t-P-e/(2*n))}function z(t,e,a){return P+(t+e)/(2*n)+a}function T(t,n,a){return f+t+.0053*e(n)-.0069*e(2*a)}function C(t,n,r){return u((e(t)-e(n)*e(r))/(a(n)*a(r)))}function S(t,n,e,a,r,o,i){var u=C(t,e,a),s=z(u,n,r);return T(s,o,i)}function H(t){var n=s*(218.316+13.176396*t),r=s*(134.963+13.064993*t),o=s*(93.272+13.22935*t),i=n+6.289*s*e(r),u=5.128*s*e(o),c=385001-20905*a(r);return{ra:g(i,u),dec:v(i,u),dist:c}}function N(t,n){return new Date(t.valueOf()+n*c/24)}I.getTimes=function(t,n,e){var a,r,o,i,u,c=s*-e,d=s*n,f=h(t),l=j(f,c),m=z(0,c,l),g=k(m),b=x(g),M=v(b,0),w=T(m,g,b),y={solarNoon:p(w),nadir:p(w-.5)};for(a=0,r=O.length;a<r;a+=1)o=O[a],i=S(o[0]*s,c,d,M,l,g,b),u=w-(i-w),y[o[1]]=p(u),y[o[2]]=p(i);return y},I.getMoonPosition=function(t,n,o){var u=s*-o,c=s*n,d=h(t),f=H(d),l=w(d,u)-f.ra,p=M(l,c,f.dec),m=i(e(l),r(c)*a(f.dec)-e(f.dec)*a(l));return p+=y(p),{azimuth:b(l,c,f.dec),altitude:p,distance:f.dist,parallacticAngle:m}},I.getMoonIllumination=function(t){var n=h(t||new Date),r=D(n),o=H(n),s=149598e3,c=u(e(r.dec)*e(o.dec)+a(r.dec)*a(o.dec)*a(r.ra-o.ra)),d=i(s*e(c),o.dist-s*a(c)),f=i(a(r.dec)*e(r.ra-o.ra),e(r.dec)*a(o.dec)-a(r.dec)*e(o.dec)*a(r.ra-o.ra));return{fraction:(1+a(d))/2,phase:.5+.5*d*(f<0?-1:1)/Math.PI,angle:f}},I.getMoonTimes=function(t,n,e,a){var r=new Date(t);a?r.setUTCHours(0,0,0,0):r.setHours(0,0,0,0);for(var o,i,u,c,d,f,l,p,h,m,g,v,b,M=.133*s,w=I.getMoonPosition(r,n,e).altitude-M,y=1;y<=24;y+=2){if(o=I.getMoonPosition(N(r,y),n,e).altitude-M,i=I.getMoonPosition(N(r,y+1),n,e).altitude-M,d=(w+i)/2-o,f=(i-w)/2,l=-f/(2*d),p=(d*l+f)*l+o,h=f*f-4*d*o,m=0,h>=0&&(b=Math.sqrt(h)/(2*Math.abs(d)),g=l-b,v=l+b,Math.abs(g)<=1&&m++,Math.abs(v)<=1&&m++,g<-1&&(g=v)),1===m?w<0?u=y+g:c=y+g:2===m&&(u=y+(p<0?v:g),c=y+(p<0?g:v)),u&&c)break;w=i}var k={};return u&&(k.rise=N(r,u)),c&&(k.set=N(r,c)),u||c||(k[p>0?"alwaysUp":"alwaysDown"]=!0),k},t.exports=I})()},f0ab:function(t,n,e){"use strict";e("9781")}}]);
//# sourceMappingURL=raster.7f79967e.js.map