(function(t){function e(e){for(var s,o,i=e[0],c=e[1],l=e[2],u=0,f=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&f.push(n[o][0]),n[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);d&&d(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(s=!1)}s&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},n={app:0},r=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var d=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=r(t);return a(e)}function r(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=r,t.exports=n,n.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-light",attrs:{id:"app"}},[a("form",[a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"country"}},[t._v("Country:")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedCountry,expression:"selectedCountry"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedCountry=e.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:"",value:""}},[t._v("Please select a country")]),t._l(t.allCountries,(function(e,s){return a("option",{key:s},[t._v("\n            "+t._s(e)+"\n          ")])}))],2)]),a("div",{staticClass:"form-group col col-md-3"},[a("datepicker",{attrs:{dateRange:t.calendarDates,selectedDate:t.selectedStartDate,inputLabel:"Start Date",inputId:"startDate"},on:{setSelectedDate:t.setSelectedStartDate}})],1),a("div",{staticClass:"form-group col col-md-3"},[a("datepicker",{attrs:{dateRange:t.calendarDates,selectedDate:t.selectedEndDate,inputLabel:"End Date",inputId:"endDate"},on:{setSelectedDate:t.setSelectedEndDate}})],1)])]),t.initChart?a("div",[t.selectedCountry?a("div",{staticClass:"col-12 text-center"},[a("h2",{staticClass:"h4"},[t._v(t._s(t.selectedCountry))]),a("p",[t._v("Population: "+t._s(t.population))])]):t._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 mb-5"},[a("chart",{attrs:{chartData:t.deaths,chartAxisLabels:t.dateLabels,aspectRatio:"1.5",chartType:"line",chartLabel:"Weekly Deaths",borderColor:"rgba(54, 162, 235, 1)",backgroundColor:"rgba(54, 162, 235, 0.2)"}})],1),a("div",{staticClass:"col-12 col-md-6 mb-5"},[a("chart",{attrs:{chartData:t.cases,chartAxisLabels:t.dateLabels,aspectRatio:"1.5",chartType:"line",chartLabel:"Weekly Cases",borderColor:"rgba(255, 99, 132, 1)",backgroundColor:"rgba(255, 99, 132, 0.2)"}})],1),a("div",{staticClass:"col-12 col-md-6 mb-5"},[a("chart",{attrs:{chartData:t.cumulativeDeaths,chartAxisLabels:t.dateLabels,aspectRatio:"1.5",chartType:"line",chartLabel:"Cumulative Deaths",borderColor:"rgba(54, 162, 235, 1)",backgroundColor:"rgba(54, 162, 235, 0.2)"}})],1),a("div",{staticClass:"col-12 col-md-6 mb-5"},[a("chart",{attrs:{chartData:t.cumulativeCases,chartAxisLabels:t.dateLabels,aspectRatio:"1.5",chartType:"line",chartLabel:"Cumulative Cases",borderColor:"rgba(255, 99, 132, 1)",backgroundColor:"rgba(255, 99, 132, 0.2)"}})],1)])]):t._e()])},r=[],o=(a("28a5"),a("55dd"),a("a481"),a("6762"),a("2fdb"),a("c5f6"),a("c1df")),i=a.n(o),c=a("bc3a"),l=a.n(c),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.dateRange?a("div",{staticClass:"form-group position-relative"},[a("label",{attrs:{for:t.inputId}},[t._v(t._s(t.inputLabel)+":")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],ref:"datepicker",staticClass:"form-control",attrs:{type:"date","aria-describedby":t.inputId,id:t.inputId,autocomplete:"off",min:t.minDate,max:t.maxDate},domProps:{value:t.date},on:{blur:t.setSelectedDate,input:[function(e){e.target.composing||(t.date=e.target.value)},t.setSelectedDate],change:t.setSelectedDate}})]):t._e()},u=[],f={name:"Datepicker",data:function(){return{date:this.selectedDate}},props:["dateRange","selectedDate","inputLabel","inputId"],computed:{minDate:function(){return this.dateRange[0]},maxDate:function(){return this.dateRange[this.dateRange.length-1]}},watch:{selectedDate:{handler:function(t,e){t.length!==e.length&&(this.date=this.selectedDate)}}},methods:{setSelectedDate:function(){this.$emit("setSelectedDate",this.date)}}},h=f,b=a("2877"),p=Object(b["a"])(h,d,u,!1,null,null,null),j=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("canvas",{ref:"chart"})},v=[],y=a("30ef"),D=a.n(y),C={name:"Chart",data:function(){return{}},props:["chartData","chartAxisLabels","chartLabel","borderColor","backgroundColor","chartType","aspectRatio"],watch:{chartData:{deep:!0,handler:function(){this.buildLineGraph()}},chartAxisLabels:{deep:!0,handler:function(){this.buildLineGraph()}}},methods:{buildLineGraph:function(){var t=this.$refs.chart.getContext("2d");D.a.defaults.global.defaultFontColor="white",D.a.defaults.global.defaultFontSize=16,D.a.defaults.global.defaultFontFamily="Avenir",new D.a(t,{type:this.chartType,data:{labels:this.chartAxisLabels,datasets:[{label:this.chartLabel,data:this.chartData,backgroundColor:this.backgroundColor,borderColor:this.borderColor,borderWidth:1}]},options:{responsive:!0,aspectRatio:this.aspectRatio,tooltips:{callbacks:{label:function(t){var e=new Number(t.yLabel).toLocaleString("en-US");return e}},displayColors:!1,xPadding:10,yPadding:10},scales:{yAxes:[{ticks:{beginAtZero:!0,callback:function(t){var e=new Number(t).toLocaleString("en-US");return e}}}],xAxes:[{ticks:{padding:10}}]}}})}},mounted:function(){this.buildLineGraph()}},g=C,k=Object(b["a"])(g,m,v,!1,null,null,null),w=k.exports,S={name:"app",components:{Chart:w,Datepicker:j},data:function(){return{allCountries:[],covidData:[],pivotData:"",formattedCountryData:[],calendarDates:["2019-12-31"],selectedCountry:"",selectedStartDate:"",selectedEndDate:"",topTenCasesCountries:[],topTenCases:[],globalStatsLabel:"",topTenDeathsCountries:[],topTenDeaths:[],initChart:!1}},props:{isAsync:{type:Boolean,required:!1,default:!1}},computed:{population:function(){if(void 0!==this.selectedCountryData){var t=this.selectedCountryData[this.selectedCountryData.length-1].popData2019,e=new Number(t).toLocaleString("en-US");return e}return null},dateLabels:function(){if(void 0!==this.filteredCountryData){var t=[];return this.filteredCountryData.map((function(e){var a=i()(e.day);t.push(a.format("MMM DD"))})),t}return null},cumulativeDeaths:function(){if(void 0!==this.filteredCountryData){var t=[];return this.filteredCountryData.map((function(e){t.push(e.cumulativeDeaths)})),t}return null},deaths:function(){if(void 0!==this.filteredCountryData){var t=[];return this.filteredCountryData.map((function(e){t.push(e.deaths)})),t}return null},cumulativeCases:function(){if(void 0!==this.filteredCountryData){var t=[];return this.filteredCountryData.map((function(e){t.push(e.cumulativeCases)})),t}return null},cases:function(){if(void 0!==this.filteredCountryData){var t=[];return this.filteredCountryData.map((function(e){t.push(e.cases)})),t}return null},selectedCountryData:function(){var t=this,e=[];return""!==this.selectedCountry&&(e=this.covidData.records.filter((function(e){return e.countryName.includes(t.selectedCountry)}))),e},filteredCountryData:function(){var t=this;return this.formattedCountryData.filter((function(e){return e.day>=t.selectedStartDate&&e.day<=t.selectedEndDate}))}},watch:{selectedCountry:{handler:function(){this.setChart()}},selectedCountryData:{deep:!0,handler:function(){this.setFormattedData()}},cumulativeDeaths:{deep:!0,handler:function(){this.setChart()}},cumulativeCases:{deep:!0,handler:function(){this.setChart()}},deaths:{deep:!0,handler:function(){this.setChart()}},cases:{deep:!0,handler:function(){this.setChart()}}},methods:{setChart:function(){var t=this;this.initChart=!1,this.$nextTick((function(){t.initChart=!0}))},getCalendarDates:function(){var t=i()("2019-12-31"),e=i()().subtract(2,"days");while(t.isBefore(e)){t=t.add(1,"days");var a=t.format("YYYY-MM-DD");this.calendarDates.push(a)}this.initDefaultStartEndDates()},getCountries:function(){var t=this;this.covidData.records.map((function(e){e.countryName=e.countriesAndTerritories.replace(/_/g," "),-1===t.allCountries.indexOf(e.countryName)&&t.allCountries.push(e.countryName)}))},getData:function(){var t=this,e="download.json";return l.a.get(e).then((function(e){t.covidData=e.data})).then(this.getCountries).then(this.getTopTwentyCases).then(this.getTopTwentyDeaths)},getTopTwentyCases:function(){var t=this,e=i()().subtract(1,"days"),a=e.format("DD/MM/YYYY"),s=this.covidData.records.filter((function(t){return t.dateRep==a})).sort((function(t,e){return e.cases-t.cases})).slice(0,10);s.map((function(e){var a=e.countriesAndTerritories.replace(/_/g," ");"United States of America"==a&&(a="USA"),"United Kingdom"==a&&(a="UK"),t.topTenCasesCountries.push(a),t.topTenCases.push(e.cases_weekly)}))},getTopTwentyDeaths:function(){var t=this,e=i()().subtract(1,"days"),a=e.format("DD/MM/YYYY"),s=this.covidData.records.filter((function(t){return t.dateRep==a})).sort((function(t,e){return e.deaths_weekly-t.deaths_weekly})).slice(0,10);s.map((function(e){var a=e.countriesAndTerritories.replace(/_/g," ");"United States of America"==a&&(a="USA"),"United Kingdom"==a&&(a="UK"),t.topTenDeathsCountries.push(a),t.topTenDeaths.push(e.deaths_weekly)}))},initDefaultStartEndDates:function(){this.selectedStartDate=this.calendarDates[0],this.selectedEndDate=this.calendarDates[this.calendarDates.length-1]},setFormattedData:function(){var t=this;if(this.formattedCountryData=[],void 0!==this.calendarDates&&void 0!==this.selectedCountryData){var e=0,a=0;this.calendarDates.map((function(s){var n={};n.day=s,n.deaths=0,n.cases=0,n.cumulativeDeaths=e,n.cumulativeCases=a,t.selectedCountryData.map((function(t){var r=t.dateRep.split("/").reverse().join("-");s==r&&(n.deaths=t.deaths_weekly,n.cases=t.cases_weekly,e+=parseInt(t.deaths_weekly,10),a+=parseInt(t.cases_weekly,10),n.cumulativeDeaths=e,n.cumulativeCases=a)})),t.formattedCountryData.push(n)}))}},setSelectedCountry:function(t){this.selectedCountry=t},setSelectedEndDate:function(t){this.selectedEndDate=t},setSelectedStartDate:function(t){this.selectedStartDate=t},setGlobalStatsLabel:function(){var t=i()().subtract(1,"days");this.globalStatsLabel=t.format("DD MMM YYYY")+" - Top 10"}},mounted:function(){this.getCalendarDates(),this.getData(),this.setGlobalStatsLabel()},destroyed:function(){}},_=S,x=Object(b["a"])(_,n,r,!1,null,null,null),L=x.exports;a("4989"),a("ab8b");s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(L)}}).$mount("#app")}});
//# sourceMappingURL=app.ec96ec99.js.map