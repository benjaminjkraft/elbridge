(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(t,e,y){},18:function(t,e,y){},20:function(t,e,y){"use strict";y.r(e);var x=y(0),a=y.n(x),n=y(7),r=y.n(n),i=y(1),s=y(2),o=y(4),c=y(3),h=y(5),l=(y(16),y(8)),u={0:"white",1:"#ffc58c",2:"#fbff8c",3:"#c9ff8c",4:"#d68cff",5:"#fda8ff",6:"#a8ffff"},d={R:{name:"Red",color:"red"},D:{name:"Blue",color:"blue"}},p=y(6),m=[[0,-1.5],[1.5,0],[1,0],[1,1.5],[-1,1.5],[-1,0],[-1.5,0]],g=function(t){function e(){return Object(i.a)(this,e),Object(o.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props,e=t.party,y=t.point,x=y.x,n=y.y;return a.a.createElement("polygon",{points:m.map(function(t){var e=Object(p.a)(t,2),y=e[0],a=e[1];return"".concat(x+.03*y," ").concat(n+.03*a)}).join(", "),fill:e?d[e].color:"black"})}}]),e}(x.Component),w=function(t){function e(){return Object(i.a)(this,e),Object(o.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props,e=t.district,y=t.dots,x=t.party,n=t.onMouseDown,r=t.onMouseEnter,i=t.onMouseUp,s=t.onContextMenu,o=Object(l.a)(t,["district","dots","party","onMouseDown","onMouseEnter","onMouseUp","onContextMenu"]);return a.a.createElement("g",{onMouseDown:n,onMouseEnter:r,onMouseUp:i,onContextMenu:s},a.a.createElement("rect",Object.assign({stroke:"black",strokeWidth:"0.01",fill:u[e]},o)),y&&y.map(function(t,e){return a.a.createElement(g,{party:x,point:t,key:e})}))}}]),e}(x.Component);function f(t){var e=Object.keys(t),y=Object(p.a)(e,2),x=y[0],a=y[1];return t[x]>t[a]?x:t[a]>t[x]?a:null}function v(t){return t.reduce(function(t,e){return t+e},0)}function b(t){return v(t.map(function(t){return t.dots.length}))}var D=function(t){var e=null;return t.idealSize&&(function(t){if(t.length<=1)return!0;var e=Array.from(t,function(){return[]});t.forEach(function(y,x){t.slice(x+1).forEach(function(t,a){var n,r;r=t,(n=y).x+n.width>=r.x&&r.x+r.width>=n.x&&n.y+n.height>=r.y&&r.y+r.height>=n.y&&(e[x].push(a+x+1),e[a+x+1].push(x))})});for(var y=e.map(function(){return!1}),x=[0];x.length;){var a=x.pop();y[a]||(y[a]=!0,Array.prototype.push.apply(x,e[a]))}return y.every(function(t){return t})}(t.precincts)?b(t.precincts)>t.idealSize?e="is too large":b(t.precincts)<t.idealSize&&(e="is too small"):e="is not contiguous"),e},E=function(t){function e(){return Object(i.a)(this,e),Object(o.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.winner;return void 0===t?null:a.a.createElement("span",null,a.a.createElement("span",{"aria-hidden":"true",style:{color:t?d[t].color:"black"}},"\u26ab"),null===t?"Tie":d[t].name)}}]),e}(x.Component),M=function(t){function e(){return Object(i.a)(this,e),Object(o.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"districtName",value:function(t){return 0===t?"Unassigned":"District ".concat(t)}},{key:"render",value:function(){var t,e=this.props,y=e.id,x=e.idealSize,n=e.parties,r=e.wasted,i=e.winner,s=e.precincts;return y?(t=D(this.props))&&(t="District is ".concat(t)):0!==s.length&&(t="Not all precincts assigned"),a.a.createElement("tr",{style:{backgroundColor:u[y]}},a.a.createElement("td",{title:t},t?"\u274c":"\u2714"),a.a.createElement("th",null,this.districtName(y)),a.a.createElement("td",null,b(s),x&&"/".concat(x)),n&&a.a.createElement("td",null,a.a.createElement(E,{winner:i})),n&&a.a.createElement("td",null,n.R," ",d.R.name,"/",n.D," ",d.D.name),r&&a.a.createElement("td",null,r.R," ",d.R.name,"/",r.D," ",d.D.name))}}]),e}(x.Component);function O(t){var e=[];return Object.values(t).forEach(function(t){t.precincts.length&&e.push(t.parties.R/b(t.precincts))}),e}var k=function(t){function e(){return Object(i.a)(this,e),Object(o.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){for(var t=this,e=this.props,y=e.numDistricts,x=e.precincts,n=e.precinctStates,r=b(x),i={},s=0;s<=y;s++){var o={id:s,precincts:[]};this.props.showParties&&(o.parties={R:0,D:0}),s&&(o.idealSize=r/y),i[s]=o}x.forEach(function(e,y){var x=n[y],a=i[x];t.props.showParties&&(a.parties[e.party]+=e.dots.length),a.precincts.push(e)});var c=null;Object.values(i).forEach(function(t){var e=D(t);e&&(c=c||"District ".concat(t.id," ").concat(e))});var h,l,u,m,g,w=Object.values(i).filter(function(t){return t.id});return this.props.showParties&&(h={R:0,D:0},w.forEach(function(t){t.winner=f(t.parties),t.winner&&(h[t.winner]+=1)}),l=f(h)),this.props.showMetrics&&(u={R:0,D:0},w.forEach(function(t){t.wasted=function(t){var e=Object.assign({},t.parties);return e[t.winner]-=b(t.precincts)/2,e}(t),Object.entries(t.wasted).map(function(t){var e=Object(p.a)(t,2),y=e[0],x=e[1];return u[y]+=x})}),m=function(t){var e=O(t);return e.length?v(e)/Object.keys(t).length:null}(w),g=function(t){var e=O(t);return e.sort(),e.length?e.length%2===0?(e[e.length/2-1]+e[e.length/2])/2:e[(e.length-1)/2]:null}(w)),a.a.createElement("div",{className:"data-container"},a.a.createElement("table",{className:"district-data"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Legal"),a.a.createElement("th",null,"District"),a.a.createElement("th",null,"Pop."),h&&a.a.createElement("th",null,"Winner"),this.props.showParties&&a.a.createElement("th",null,"Party ID"),this.props.showMetrics&&a.a.createElement("th",null,"Wasted Votes"))),a.a.createElement("tbody",null,Object.values(i).map(function(t){return a.a.createElement(M,Object.assign({key:t.id},t))}))),a.a.createElement("table",{className:"global-data"},a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Map Legality"),a.a.createElement("td",null,c?"\u274c ".concat(c):"\u2714")),this.props.showParties&&a.a.createElement("tr",null,a.a.createElement("th",null,"Winner"),a.a.createElement("td",null,a.a.createElement(E,{winner:l}),c&&" (so far)")),this.props.showMetrics&&a.a.createElement("tr",{className:"border"}),this.props.showMetrics&&a.a.createElement("tr",null,a.a.createElement("th",null,"Wasted Votes"),a.a.createElement("td",null,u.R," ",d.R.name,"/",u.D," ",d.D.name)),this.props.showMetrics&&a.a.createElement("tr",null,a.a.createElement("th",null,"Efficiency Gap"),a.a.createElement("td",null,function(t,e){if(t.R===t.D)return"0% (no advantage)";var y=100*(t.R-t.D)/e,x=y>0?"D":"R";return y=Math.abs(y),a.a.createElement("span",null,y.toFixed(0),"% (",a.a.createElement(E,{winner:x})," advantage)")}(u,r))),this.props.showMetrics&&a.a.createElement("tr",{className:"border"}),this.props.showMetrics&&a.a.createElement("tr",null,a.a.createElement("th",null,"Mean"),null===m?a.a.createElement("td",null,"n/a"):a.a.createElement("td",null,(100*m).toFixed(0),"% ",d.R.name)),this.props.showMetrics&&a.a.createElement("tr",null,a.a.createElement("th",null,"Median"),null===g?a.a.createElement("td",null,"n/a"):a.a.createElement("td",null,(100*g).toFixed(0),"% ",d.R.name)),this.props.showMetrics&&a.a.createElement("tr",null,a.a.createElement("th",null,"Difference"),null===m||null===g?a.a.createElement("td",null,"n/a"):a.a.createElement("td",null,Math.abs(100*(g-m)).toFixed(0),"% (",g===m?"no":a.a.createElement(E,{winner:g>m?"R":"D"})," ","advantage)")))))}}]),e}(x.Component),S=function(t){function e(t){var y;return Object(i.a)(this,e),(y=Object(o.a)(this,Object(c.a)(e).call(this,t))).state=y.initialState(t),y}return Object(h.a)(e,t),Object(s.a)(e,[{key:"blankState",value:function(t){return{precinctStates:t.precincts.map(function(t){return 0}),draggingDistrict:null,lastDragged:null}}},{key:"initialState",value:function(t){if(t.save)try{return JSON.parse(atob(t.save))}catch(e){console.error(e)}return this.blankState(t)}},{key:"setPrecinctDistrict",value:function(t,e){this.setState(function(y,x){var a=y.precinctStates;return a[t]=e,{precinctStates:a}})}},{key:"chooseNewDistrict",value:function(){var t=Array(this.props.numDistricts+1).fill(0);return this.state.precinctStates.forEach(function(e){return t[e]+=1}),t.forEach(function(t,e){if(e&&!t)return e}),this.state.lastDragged===this.props.numDistricts?1:this.state.lastDragged?this.state.lastDragged+1:1}},{key:"makePrecinctMouseDownHandler",value:function(t){var e=this;return function(y){var x=e.state.precinctStates[t];x?0===y.button?x++:2===y.button&&x--:x=e.chooseNewDistrict(),x<=0?x+=e.props.numDistricts:x>e.props.numDistricts&&(x-=e.props.numDistricts),e.setPrecinctDistrict(t,x),e.setState({draggingDistrict:x})}}},{key:"makePrecinctMouseEnterHandler",value:function(t){var e=this;return function(){return e.mouseNext(t)}}},{key:"makePrecinctMouseUpHandler",value:function(t){var e=this;return function(){e.mouseNext(t),e.mouseDone()}}},{key:"handleMouseLeave",value:function(){this.mouseDone()}},{key:"mouseNext",value:function(t){this.state.draggingDistrict&&this.setPrecinctDistrict(t,this.state.draggingDistrict)}},{key:"mouseDone",value:function(){this.setState({draggingDistrict:null,lastDragged:this.state.draggingDistrict||this.state.lastDragged})}},{key:"reset",value:function(){this.setState(this.blankState(this.props))}},{key:"save",value:function(){this.props.onSave(btoa(JSON.stringify(this.state)))}},{key:"share",value:function(){this.props.onShare(btoa(JSON.stringify(this.state)))}},{key:"render",value:function(){var t=this,e=this.props,y=e.scale,x=e.width,n=e.height,r=e.numDistricts,i=e.precincts;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"map-container"},a.a.createElement("svg",{className:"map",width:x*y,height:n*y,viewBox:"0 0 ".concat(x," ").concat(n),onMouseLeave:this.handleMouseLeave.bind(this)},i.map(function(e,y){return a.a.createElement(w,Object.assign({key:"".concat(e.x," ").concat(e.y)},e,{party:t.props.showParties?e.party:void 0,district:t.state.precinctStates[y]||0,onMouseDown:t.makePrecinctMouseDownHandler(y),onMouseEnter:t.makePrecinctMouseEnterHandler(y),onMouseUp:t.makePrecinctMouseUpHandler(y),onContextMenu:function(t){return t.preventDefault()}}))})),a.a.createElement("div",{className:"map-buttons"},a.a.createElement("button",{onClick:this.reset.bind(this)},"Reset"),a.a.createElement("button",{onClick:this.save.bind(this)},"Save"),a.a.createElement("button",{onClick:this.share.bind(this)},"Share"),a.a.createElement("button",{onClick:this.props.toggleParties},this.props.showParties?"Hide Parties":"Show Parties"),this.props.showParties&&a.a.createElement("button",{onClick:this.props.toggleMetrics},this.props.showMetrics?"Hide Metrics":"Show Metrics"))),a.a.createElement(k,{numDistricts:r,precincts:this.props.precincts,showParties:this.props.showParties,showMetrics:this.props.showMetrics,precinctStates:this.state.precinctStates}))}}]),e}(x.Component),j={CityMap:{height:6,numDistricts:6,precincts:[{dots:[{x:2.0378954316315343,y:2.946948158016493},{x:2.030046645001873,y:2.9535395295101856},{x:1.9848864382759162,y:2.9527824086751475},{x:1.8279537529103818,y:2.973599137758014},{x:1.8208077264242122,y:2.9942868848916415},{x:2.040900547249617,y:3.044162170320067},{x:1.856182312325127,y:3.0531332448176554},{x:1.855135508069123,y:3.062718282426914},{x:1.911272213357154,y:3.0826278405731546},{x:2.0333242341475013,y:3.118825006056252}],height:.2049744107916176,party:"R",width:.26296663215791716,x:1.7935585017092772,y:2.9295278633588806},{dots:[{x:2.0720131265402184,y:2.855992425470851},{x:2.0752300136101773,y:2.996494507552162},{x:2.088734096975985,y:3.017195228972215},{x:2.0979661203389743,y:2.873493986981616},{x:2.126400847506237,y:3.096391106953389},{x:2.1244626072641424,y:2.900640273413587},{x:2.1408854883576263,y:2.715181262645555},{x:2.1519463081516497,y:2.76937419660542},{x:2.192769061432044,y:2.9816740248306193},{x:2.195847524070923,y:2.8342606171839}],height:.472174145858931,party:"D",width:.15051842571958485,x:2.0565251338671944,y:2.662328128291567},{dots:[{x:2.1781060044844187,y:3.147707031773594},{x:2.0186897763380776,y:3.159991707985353},{x:1.9841733194299966,y:3.1644718018626694},{x:2.0310265273276467,y:3.1619062281470103},{x:2.1868282669656662,y:3.2189974236279477},{x:1.9267226558492525,y:3.222982244071541},{x:1.968638471484893,y:3.2287937797324457},{x:1.9297564377382752,y:3.237725045936593},{x:1.9456353680793865,y:3.2539486406281406},{x:2.021827555962331,y:3.247307307611377}],height:.1274284247796258,party:"D",width:.3463365035976449,x:1.8607070559891343,y:3.134502274150498},{dots:[{x:2.0389099150501147,y:2.740690926396958},{x:1.9205755373156883,y:2.7301942256336775},{x:1.99194370116131,y:2.729818834887089},{x:1.9119680608922203,y:2.7583309863227923},{x:1.8959071451224696,y:2.793321699563948},{x:1.960191690608677,y:2.8294356009671366},{x:1.988235942772664,y:2.86475757849185},{x:1.948415579122042,y:2.864909858069254},{x:1.9741372919002047,y:2.9120296930940603},{x:1.9841969234579897,y:2.9059219099352047}],height:.2671997350673134,party:"D",width:.26296663215791716,x:1.7935585017092772,y:2.662328128291567},{dots:[{x:1.4206562895124641,y:2.992951998569255},{x:1.7290134345217394,y:3.0273804480137456},{x:1.5480791415849087,y:3.045055578219027},{x:1.5477398244879148,y:3.0571472733398517},{x:1.65185699217454,y:3.0758161118136673},{x:1.4671279918284628,y:3.084186355912839},{x:1.753495178013992,y:3.1041826874309586},{x:1.7208111294718247,y:3.1120865944705054},{x:1.4751249788454042,y:3.1265027820399536},{x:1.497526154243355,y:3.1235280139664683}],height:.1560455366323179,party:"D",width:.4115880196427646,x:1.3819704820665126,y:2.9784567375181803},{dots:[{x:1.5131877982334208,y:2.7055234961311037},{x:1.6555999580282332,y:2.701981277576463},{x:1.5038883951137014,y:2.7428042600735725},{x:1.7019875586514313,y:2.8124583393278484},{x:1.5467508057244812,y:2.882436944216895},{x:1.7474185734127585,y:2.9364400122837333},{x:1.6670217987089389,y:2.916814179936451},{x:1.601235063219441,y:2.929375771360696},{x:1.6508944574204507,y:2.9414164824040143},{x:1.7334015628488564,y:2.939491396593566}],height:.3161286092266131,party:"D",width:.4115880196427646,x:1.3819704820665126,y:2.662328128291567},{dots:[{x:2.339702177283872,y:3.01233499802111},{x:2.2627206027304183,y:3.0537907901977848},{x:2.2809646862370823,y:3.059976878738517},{x:2.2534615824149524,y:3.0702248118218134},{x:2.309357298634391,y:3.0888673113805702},{x:2.67100911608467,y:3.1130769776931415},{x:2.669777378519845,y:3.1310509145993315},{x:2.4981336122488336,y:3.1383124806301548},{x:2.448762251447766,y:3.1654210889743526},{x:2.274787033024183,y:3.1710275253226654}],height:.17791025693869988,party:"D",width:.5046705750268243,x:2.2070435595867792,y:3.0023922504078353},{dots:[{x:2.2172022386843997,y:2.8237922800915056},{x:2.229280185918324,y:2.9261857323685985},{x:2.268848057221889,y:2.9323572849340276},{x:2.2798324361437827,y:2.9421846129077265},{x:2.3207929717947957,y:2.87768673486895},{x:2.343870010010649,y:2.9489596802001254},{x:2.3746084512141645,y:2.6152481387642568},{x:2.383451758288043,y:2.6105813230380845},{x:2.3871677685879398,y:2.936648940752671},{x:2.3749313266374017,y:2.8449755503878276}],height:.7823922504078356,party:"R",width:.19206850345887094,x:2.2070435595867792,y:2.2199999999999998},{dots:[{x:1.9438306866664445,y:3.3102359218107766},{x:2.0733320422064403,y:3.2965578164601634},{x:1.9037399254756204,y:3.296694402958873},{x:1.9619085864988202,y:3.3341087011765524},{x:2.004559115678263,y:3.406092276546386},{x:1.9023970981968696,y:3.4231458496618257},{x:2.0170092431563096,y:3.4445160361002958},{x:1.9386898122253684,y:3.4246415185591825},{x:1.9848373471677592,y:3.599687543023239},{x:2.0432682851207695,y:3.67365197800045}],height:.5032053048245784,party:"D",width:.3463365035976449,x:1.8607070559891343,y:3.261930698930124},{dots:[{x:1.5566728315340566,y:3.227561137813545},{x:1.5445864182941378,y:3.434424329208973},{x:1.6294028484304743,y:3.4433978780795096},{x:1.6592627859499982,y:3.2753049254645594},{x:1.683854881650903,y:3.4315934097138165},{x:1.8218789691062782,y:3.376329042292718},{x:1.8206866681303988,y:3.4064051935035686},{x:1.809687348196803,y:3.238462624401214},{x:1.8347378662954916,y:3.21420948984873},{x:1.8147698518354753,y:3.2363532615305406}],height:.6306337296042042,party:"D",width:.34031142765679334,x:1.520395628332341,y:3.134502274150498},{dots:[{x:1.7778446982725498,y:2.3428835941562016},{x:1.7485072368438626,y:2.5748933586743123},{x:1.870379634135984,y:2.612226303010489},{x:1.9152699776986506,y:2.458931932832981},{x:2.051519695681905,y:2.587665506085095},{x:2.0313332409666316,y:2.2564943957294274},{x:2.076777548779085,y:2.6066923168904808},{x:2.127397068846467,y:2.5629459649702193},{x:2.1670540562681744,y:2.6025496230333913},{x:2.1751397715499663,y:2.6399643225407208}],height:.4423281282915674,party:"D",width:.502635284316876,x:1.7044082752699032,y:2.2199999999999998},{dots:[{x:2.5075320942657466,y:3.2387021962296965},{x:2.3860032249506657,y:3.244087584908265},{x:2.683301441947953,y:3.2221177554765577},{x:2.351020768519133,y:3.2634177198868124},{x:2.4204198186650077,y:3.2626016193494216},{x:2.4028858777523063,y:3.290676818568611},{x:2.2801058562507914,y:3.364493672948105},{x:2.578346462505222,y:3.4623577083350896},{x:2.4578341706610387,y:3.536390187745354},{x:2.262050175361091,y:3.598307900285422}],height:.47969749265346495,party:"D",width:.5046705750268243,x:2.2070435595867792,y:3.180302507346535},{dots:[{x:2.41160215293788,y:2.505380159985954},{x:2.4211204663309465,y:2.719519007335901},{x:2.4353869903187597,y:2.8582738419389044},{x:2.4991354926151748,y:2.7849647001418356},{x:2.5008070082110825,y:2.775479441521747},{x:2.5154691062679495,y:2.82631722596165},{x:2.551869501959584,y:2.9352509090393983},{x:2.535809930436002,y:2.4123489186810563},{x:2.5861292818103916,y:2.8245861091143647},{x:2.591832817834043,y:2.8975968329780244}],height:.7823922504078356,party:"D",width:.2180264645196277,x:2.39911206304565,y:2.2199999999999998},{dots:[{x:1.5424428802492254,y:2.600463929202836},{x:1.5371426227758298,y:2.3187781633518076},{x:1.56320420699987,y:2.379638397446749},{x:1.599035636243858,y:2.38234903535034},{x:1.644634717666095,y:2.290993985569868},{x:1.6435594659119728,y:2.2677977834639034},{x:1.6413785750847494,y:2.4566415212667203},{x:1.6460339346943005,y:2.6398452712678697},{x:1.6744633841989176,y:2.505725002221194},{x:1.6584789111456582,y:2.6254538831582583}],height:.4423281282915674,party:"D",width:.3224377932033906,x:1.3819704820665126,y:2.2199999999999998},{dots:[{x:1.1780711546800342,y:2.8434181085799546},{x:1.2131043109527224,y:2.6112196536559775},{x:1.2772942139764527,y:3.0448163965654387},{x:1.296002375876019,y:2.4040944638358783},{x:1.3103882918985945,y:2.9922024387838975},{x:1.3042606341185319,y:2.707823288789539},{x:1.3258004030144284,y:2.6429636201458457},{x:1.3140284223496848,y:2.7988996600464184},{x:1.3386647470442983,y:3.0125236879586477},{x:1.3522888154906405,y:2.907746179583407}],height:.9145022741504985,party:"R",width:.2219704820665127,x:1.16,y:2.2199999999999998},{dots:[{x:1.0610170356541166,y:3.5258941874039706},{x:1.2474329360923593,y:3.7277532968936984},{x:1.3013818423192294,y:3.261464284174534},{x:1.3030883035472018,y:3.685672271333061},{x:1.3250222198677055,y:3.4594300575977903},{x:1.306938210864347,y:3.4004393365432275},{x:1.3635067054757422,y:3.2883741741442853},{x:1.3937874338395504,y:3.53515843640497},{x:1.46438279538248,y:3.2159735226068165},{x:1.4579467355125597,y:3.2278577181694192}],height:.6306337296042042,party:"R",width:.520395628332341,x:1,y:3.134502274150498},{dots:[{x:1.9602443572999282,y:1.405407447831392},{x:2.0147754183169857,y:2.137689488161724},{x:2.0980642394893745,y:1.9947298030714886},{x:2.181544756383674,y:2.1235126742707675},{x:2.212808425797226,y:2.090572514980219},{x:2.2554797142251415,y:1.586901154614884},{x:2.285954417302907,y:2.1194870325678785},{x:2.3012544099604955,y:1.4880614439032864},{x:2.301620504395947,y:1.8924133210710794},{x:2.3490625417653903,y:2.0636180574331324}],height:.8999999999999997,party:"R",width:.5271620616523665,x:1.9,y:1.32},{dots:[{x:2.0777073287710257,y:3.886296418298089},{x:1.745413593672606,y:3.863341048839395},{x:1.5384281800045432,y:3.8862707950630306},{x:1.828289746046985,y:3.8250214884948504},{x:1.932977699845694,y:4.002612107241477},{x:1.223782686186593,y:4.271358557014197},{x:1.4605252062945366,y:4.337687912765549},{x:1.1622852780395376,y:4.318638500233834},{x:1.7742321206170752,y:4.342528502178562},{x:1.1100028845771825,y:4.631664823357995}],height:.9148639962452974,party:"R",width:1.2070435595867792,x:1,y:3.7651360037547024},{dots:[{x:2.4753447899014103,y:3.7914593747547567},{x:2.471635097275605,y:3.810024252344256},{x:2.5279634572415492,y:3.75154764926112},{x:2.4219799398757083,y:3.8180439387337874},{x:2.518604691167687,y:3.7723135044865637},{x:2.579326260014406,y:3.8629663982189237},{x:2.2591031287000876,y:3.7917886206650198},{x:2.6154589413535017,y:3.8665766085383138},{x:2.5873131035675936,y:3.938054971867665},{x:2.520993618792805,y:4.07594099411526}],height:1.1100000000000003,party:"D",width:.5046705750268243,x:2.2070435595867792,y:3.66},{dots:[{x:2.785231017232507,y:2.360367793145496},{x:2.6931301585703897,y:2.6838330201477483},{x:2.8033747113469807,y:2.7406355267549105},{x:2.8127713275013,y:2.5394967367300074},{x:2.7714132259271516,y:2.2723454373992933},{x:2.877787105702257,y:2.931372000612108},{x:3.2496025878655947,y:2.444258994134009},{x:3.2922809001426607,y:2.4925610408029133},{x:3.483108758415886,y:2.7460293413519863},{x:3.6333758054361653,y:2.799848617078118}],height:.7823922504078356,party:"R",width:1.3828614724347221,x:2.617138527565278,y:2.2199999999999998},{dots:[{x:.5930109288152311,y:2.909287896091274},{x:.5349315341208712,y:3.037666347599426},{x:.6252712535509958,y:2.843040551700718},{x:.6723663089204676,y:2.4860420072480984},{x:.7605646636729766,y:2.7520423223817434},{x:.7057388802673187,y:2.537319374174384},{x:.8800664228328101,y:2.458351432784419},{x:.9919987183527613,y:2.95578214264},{x:1.064606805171489,y:2.859619275490906},{x:1.0360600512606217,y:2.4728184708235403}],height:.9145022741504985,party:"R",width:1.16,x:0,y:2.2199999999999998},{dots:[{x:1.0980281255843833,y:1.9512413370454222},{x:1.0877261657641975,y:.939519820595876},{x:1.2660678473372717,y:.9006065909398322},{x:1.2427185168576191,y:2.004682826880308},{x:1.437971829004762,y:2.006874896702821},{x:1.4044391743302835,y:1.3854432013433096},{x:1.395536107643274,y:1.4467548072396057},{x:1.5167479479250328,y:2.1245315072646007},{x:1.5708843980630443,y:2.0483301090359207},{x:1.851197118199702,y:1.7171099854138356}],height:1.4399999999999997,party:"D",width:.94,x:.96,y:.78},{dots:[{x:2.844632423328709,y:4.110043776390568},{x:2.8919966103186274,y:3.8535481897906547},{x:2.8223771254857057,y:4.454502779544712},{x:3.1330267941277086,y:3.418264039827517},{x:3.1854252469634012,y:4.229145068087643},{x:3.273133946500165,y:3.7446762551506585},{x:3.362139456572371,y:3.2372675246112905},{x:3.6220272557388675,y:3.752372318331034},{x:3.5834632775823065,y:4.52759994345888},{x:3.718595918312657,y:4.2392219269548965}],height:1.7676077495921652,party:"R",width:1.2882858653863964,x:2.7117141346136036,y:3.0023922504078353},{dots:[{x:2.5918892925020427,y:1.6061277849753743},{x:2.566097122308453,y:1.428621502404425},{x:2.6819829560181057,y:1.4062528191218262},{x:2.614104247724537,y:1.5162469927329345},{x:2.964741816001641,y:2.0634771181475697},{x:3.192082103033741,y:1.5164557528083922},{x:3.2271306322946973,y:2.0170724580950172},{x:3.375673938719969,y:2.1270013069183267},{x:3.5340460586830553,y:1.6637027945681597},{x:3.853696563568295,y:2.108865880566617}],height:.8999999999999997,party:"D",width:1.5728379383476336,x:2.4271620616523664,y:1.32},{dots:[{x:.20974524163490535,y:3.432896475276795},{x:.30857587879498477,y:4.544453761943657},{x:.3020216662810042,y:4.469458170623441},{x:.29691223541770584,y:4.363259098618275},{x:.3459765051750801,y:3.4695588569077707},{x:.5874439923320414,y:3.65681489007919},{x:.6943725616391028,y:3.748593645976828},{x:.6947928079603081,y:4.58309884188},{x:.8013721711237055,y:3.5351685996273945},{x:.856454729348649,y:4.474712610546227}],height:1.5454977258495015,party:"R",width:1,x:0,y:3.134502274150498},{dots:[{x:.32650132807534604,y:1.8817837235140118},{x:.3909361023847865,y:1.3905170934307072},{x:.40805175403979504,y:1.0413519878101665},{x:.45525821318503845,y:1.1710831695997603},{x:.44324964388412413,y:1.726953361202808},{x:.5924720274451112,y:1.5869977792322083},{x:.6367369856054308,y:1.0323776797144748},{x:.8604898928518139,y:1.1358231589602386},{x:.8305826483604614,y:1.3632361605641874},{x:.8306182217746336,y:1.6271850800978809}],height:1.4399999999999997,party:"R",width:.96,x:0,y:.78},{dots:[{x:1.955564924142125,y:4.818028269530498},{x:.4250646763876909,y:4.961249417046086},{x:1.5637670876855283,y:4.883608324587183},{x:.5453951874533325,y:5.0851762634547955},{x:.825520139882992,y:5.116616899450942},{x:.2301026533582784,y:5.238296740888999},{x:1.9574372535233433,y:5.2183103636323445},{x:1.4925963669888747,y:5.3911934458696695},{x:.129123983341474,y:5.4362830507551845},{x:1.2619222348926917,y:5.580606273281165}],height:1.3200000000000003,party:"R",width:2.2070435595867792,x:0,y:4.68},{dots:[{x:2.9430620693823544,y:.2682271083133574},{x:3.011477903922808,y:.33462538091097893},{x:3.783252557857278,y:.3247739373181746},{x:2.1118205643178114,y:.5743131206515892},{x:2.9127462916125317,y:.5245877874416095},{x:2.693233688796477,y:.7216273739505822},{x:2.964152465032956,y:.8270181987333898},{x:2.967705590376322,y:1.0200322166936917},{x:3.343406154764267,y:1.0218974309152413},{x:2.5126870439971896,y:1.1765286110905124}],height:1.32,party:"R",width:2.1,x:1.9,y:0},{dots:[{x:2.395778889195923,y:4.89274472391402},{x:3.2005996093821483,y:4.869696880588234},{x:2.942576406774011,y:4.990720269884025},{x:3.5195416943198197,y:5.286810683994302},{x:3.4074296311140166,y:5.320340124361938},{x:2.507638261544625,y:5.522675944541197},{x:3.6780395665212238,y:5.581238625794325},{x:3.711795495127813,y:5.605947741309516},{x:2.9164254038400226,y:5.639787016964119},{x:2.916920209411619,y:5.660570474811403}],height:1.2299999999999995,party:"R",width:1.7929564404132208,x:2.2070435595867792,y:4.7700000000000005},{dots:[{x:.864182985368698,y:.3854443480750178},{x:1.2837753116720503,y:.37142091186536713},{x:1.4612064949333772,y:.3719335974618936},{x:.2971967166932173,y:.4102613440834718},{x:1.3202439316311723,y:.5685396380377139},{x:1.624236907917728,y:.6138689275089341},{x:1.1996905049908,y:.6462271996270602},{x:1.6463290871731637,y:.622503359195966},{x:1.5329866282691769,y:.6751595089640539},{x:.560611826887834,y:.6709742291027658}],height:.78,party:"R",width:1.9,x:0,y:0}],width:4},GridMap:{height:6,numDistricts:6,precincts:[{dots:[{x:.07,y:.28},{x:.1,y:.52},{x:.23,y:.18},{x:.25,y:.23},{x:.39,y:.68},{x:.47,y:.32},{x:.65,y:.91},{x:.76,y:.67},{x:.79,y:.55},{x:.94,y:.52}],height:1,party:"R",width:1,x:0,y:0},{dots:[{x:1.05,y:.51},{x:1.25,y:.92},{x:1.34,y:.41},{x:1.3599999999999999,y:.86},{x:1.4,y:.83},{x:1.46,y:.33},{x:1.5899999999999999,y:.7},{x:1.69,y:.77},{x:1.77,y:.42},{x:1.8199999999999998,y:.58}],height:1,party:"R",width:1,x:1,y:0},{dots:[{x:2.2800000000000002,y:.91},{x:2.35,y:.28},{x:2.41,y:.27},{x:2.59,y:.06},{x:2.64,y:.74},{x:2.68,y:.36},{x:2.82,y:.34},{x:2.86,y:.67},{x:2.88,y:.32},{x:2.91,y:.65}],height:1,party:"D",width:1,x:2,y:0},{dots:[{x:3.07,y:.91},{x:3.23,y:.15},{x:3.25,y:.07},{x:3.32,y:.88},{x:3.37,y:.1},{x:3.58,y:.51},{x:3.71,y:.14},{x:3.79,y:.21},{x:3.82,y:.94},{x:3.86,y:.69}],height:1,party:"R",width:1,x:3,y:0},{dots:[{x:4.11,y:.74},{x:4.15,y:.73},{x:4.17,y:.37},{x:4.18,y:.3},{x:4.34,y:.77},{x:4.45,y:.89},{x:4.49,y:.63},{x:4.54,y:.93},{x:4.5600000000000005,y:.8},{x:4.88,y:.79}],height:1,party:"D",width:1,x:4,y:0},{dots:[{x:.12,y:1.1400000000000001},{x:.34,y:1.24},{x:.5,y:1.74},{x:.53,y:1.63},{x:.54,y:1.32},{x:.73,y:1.6800000000000002},{x:.78,y:1.13},{x:.84,y:1.8900000000000001},{x:.89,y:1.07},{x:.93,y:1.1400000000000001}],height:1,party:"R",width:1,x:0,y:1},{dots:[{x:1.06,y:1.63},{x:1.16,y:1.83},{x:1.17,y:1.9},{x:1.2,y:1.06},{x:1.21,y:1.5899999999999999},{x:1.25,y:1.3},{x:1.28,y:1.18},{x:1.44,y:1.8399999999999999},{x:1.56,y:1.37},{x:1.78,y:1.46}],height:1,party:"R",width:1,x:1,y:1},{dots:[{x:2.1,y:1.09},{x:2.1,y:1.74},{x:2.25,y:1.4},{x:2.35,y:1.17},{x:2.41,y:1.8199999999999998},{x:2.63,y:1.3900000000000001},{x:2.71,y:1.75},{x:2.82,y:1.35},{x:2.87,y:1.31},{x:2.95,y:1.05}],height:1,party:"D",width:1,x:2,y:1},{dots:[{x:3.09,y:1.76},{x:3.1,y:1.8599999999999999},{x:3.29,y:1.8},{x:3.38,y:1.6099999999999999},{x:3.46,y:1.54},{x:3.4699999999999998,y:1.67},{x:3.8,y:1.12},{x:3.81,y:1.26},{x:3.92,y:1.6800000000000002},{x:3.92,y:1.9100000000000001}],height:1,party:"D",width:1,x:3,y:1},{dots:[{x:4.05,y:1.78},{x:4.07,y:1.22},{x:4.14,y:1.3900000000000001},{x:4.27,y:1.24},{x:4.28,y:1.6400000000000001},{x:4.38,y:1.26},{x:4.53,y:1.76},{x:4.71,y:1.8599999999999999},{x:4.89,y:1.67},{x:4.9399999999999995,y:1.1400000000000001}],height:1,party:"R",width:1,x:4,y:1},{dots:[{x:.09,y:2.58},{x:.1,y:2.9},{x:.19,y:2.45},{x:.28,y:2.76},{x:.46,y:2.7},{x:.5,y:2.26},{x:.62,y:2.88},{x:.63,y:2.77},{x:.68,y:2.71},{x:.85,y:2.89}],height:1,party:"D",width:1,x:0,y:2},{dots:[{x:1.1400000000000001,y:2.87},{x:1.18,y:2.6},{x:1.27,y:2.11},{x:1.29,y:2.41},{x:1.31,y:2.87},{x:1.49,y:2.39},{x:1.54,y:2.05},{x:1.6400000000000001,y:2.15},{x:1.71,y:2.46},{x:1.92,y:2.59}],height:1,party:"R",width:1,x:1,y:2},{dots:[{x:2.15,y:2.87},{x:2.24,y:2.74},{x:2.25,y:2.55},{x:2.32,y:2.49},{x:2.36,y:2.43},{x:2.54,y:2.45},{x:2.68,y:2.84},{x:2.69,y:2.23},{x:2.76,y:2.89},{x:2.79,y:2.4699999999999998}],height:1,party:"D",width:1,x:2,y:2},{dots:[{x:3.41,y:2.08},{x:3.42,y:2.82},{x:3.5300000000000002,y:2.18},{x:3.5300000000000002,y:2.77},{x:3.67,y:2.18},{x:3.75,y:2.06},{x:3.77,y:2.58},{x:3.81,y:2.9},{x:3.82,y:2.65},{x:3.85,y:2.27}],height:1,party:"R",width:1,x:3,y:2},{dots:[{x:4.16,y:2.7199999999999998},{x:4.19,y:2.05},{x:4.34,y:2.54},{x:4.38,y:2.4},{x:4.5,y:2.76},{x:4.52,y:2.25},{x:4.59,y:2.95},{x:4.6899999999999995,y:2.25},{x:4.83,y:2.4699999999999998},{x:4.89,y:2.08}],height:1,party:"D",width:1,x:4,y:2},{dots:[{x:.24,y:3.95},{x:.3,y:3.86},{x:.32,y:3.11},{x:.33,y:3.7},{x:.38,y:3.6},{x:.52,y:3.39},{x:.63,y:3.27},{x:.63,y:3.88},{x:.83,y:3.86},{x:.89,y:3.73}],height:1,party:"R",width:1,x:0,y:3},{dots:[{x:1.05,y:3.1},{x:1.05,y:3.46},{x:1.16,y:3.1},{x:1.18,y:3.09},{x:1.26,y:3.55},{x:1.32,y:3.84},{x:1.41,y:3.32},{x:1.63,y:3.87},{x:1.65,y:3.64},{x:1.92,y:3.85}],height:1,party:"D",width:1,x:1,y:3},{dots:[{x:2.06,y:3.05},{x:2.15,y:3.22},{x:2.38,y:3.94},{x:2.56,y:3.5},{x:2.61,y:3.05},{x:2.65,y:3.2800000000000002},{x:2.75,y:3.08},{x:2.7800000000000002,y:3.58},{x:2.79,y:3.07},{x:2.83,y:3.41}],height:1,party:"R",width:1,x:2,y:3},{dots:[{x:3.07,y:3.7800000000000002},{x:3.14,y:3.43},{x:3.22,y:3.63},{x:3.44,y:3.93},{x:3.5300000000000002,y:3.54},{x:3.58,y:3.66},{x:3.67,y:3.68},{x:3.82,y:3.18},{x:3.88,y:3.62},{x:3.92,y:3.93}],height:1,party:"R",width:1,x:3,y:3},{dots:[{x:4.07,y:3.91},{x:4.11,y:3.1},{x:4.16,y:3.62},{x:4.23,y:3.09},{x:4.27,y:3.25},{x:4.28,y:3.79},{x:4.29,y:3.4699999999999998},{x:4.64,y:3.86},{x:4.92,y:3.84},{x:4.93,y:3.09}],height:1,party:"R",width:1,x:4,y:3},{dots:[{x:.16,y:4.57},{x:.32,y:4.47},{x:.34,y:4.78},{x:.37,y:4.15},{x:.37,y:4.3},{x:.52,y:4.63},{x:.58,y:4.5},{x:.6,y:4.93},{x:.77,y:4.7},{x:.81,y:4.11}],height:1,party:"R",width:1,x:0,y:4},{dots:[{x:1.09,y:4.68},{x:1.1,y:4.86},{x:1.17,y:4.46},{x:1.2,y:4.6},{x:1.24,y:4.79},{x:1.26,y:4.85},{x:1.52,y:4.61},{x:1.71,y:4.06},{x:1.73,y:4.38},{x:1.75,y:4.28}],height:1,party:"D",width:1,x:1,y:4},{dots:[{x:2.08,y:4.54},{x:2.21,y:4.64},{x:2.29,y:4.22},{x:2.34,y:4.8},{x:2.41,y:4.19},{x:2.43,y:4.74},{x:2.45,y:4.66},{x:2.7,y:4.74},{x:2.77,y:4.07},{x:2.85,y:4.88}],height:1,party:"D",width:1,x:2,y:4},{dots:[{x:3.26,y:4.09},{x:3.32,y:4.5600000000000005},{x:3.37,y:4.21},{x:3.51,y:4.25},{x:3.56,y:4.48},{x:3.63,y:4.78},{x:3.69,y:4.66},{x:3.76,y:4.62},{x:3.89,y:4.74},{x:3.95,y:4.1}],height:1,party:"D",width:1,x:3,y:4},{dots:[{x:4.12,y:4.12},{x:4.19,y:4.7},{x:4.22,y:4.05},{x:4.49,y:4.15},{x:4.5600000000000005,y:4.08},{x:4.75,y:4.84},{x:4.77,y:4.07},{x:4.78,y:4.42},{x:4.82,y:4.3},{x:4.82,y:4.47}],height:1,party:"D",width:1,x:4,y:4},{dots:[{x:.18,y:5.07},{x:.24,y:5.25},{x:.3,y:5.41},{x:.32,y:5.49},{x:.33,y:5.35},{x:.4,y:5.6899999999999995},{x:.43,y:5.63},{x:.51,y:5.89},{x:.66,y:5.3},{x:.93,y:5.44}],height:1,party:"D",width:1,x:0,y:5},{dots:[{x:1.17,y:5.74},{x:1.2,y:5.68},{x:1.31,y:5.5600000000000005},{x:1.31,y:5.95},{x:1.42,y:5.14},{x:1.6,y:5.87},{x:1.79,y:5.5},{x:1.8399999999999999,y:5.39},{x:1.85,y:5.91},{x:1.8900000000000001,y:5.54}],height:1,party:"D",width:1,x:1,y:5},{dots:[{x:2.1,y:5.47},{x:2.16,y:5.25},{x:2.18,y:5.39},{x:2.39,y:5.39},{x:2.4,y:5.23},{x:2.4,y:5.44},{x:2.61,y:5.41},{x:2.67,y:5.78},{x:2.83,y:5.79},{x:2.89,y:5.9399999999999995}],height:1,party:"D",width:1,x:2,y:5},{dots:[{x:3.09,y:5.2},{x:3.09,y:5.76},{x:3.1,y:5.51},{x:3.15,y:5.31},{x:3.29,y:5.14},{x:3.31,y:5.43},{x:3.5,y:5.19},{x:3.52,y:5.71},{x:3.5300000000000002,y:5.14},{x:3.84,y:5.19}],height:1,party:"R",width:1,x:3,y:5},{dots:[{x:4.08,y:5.66},{x:4.18,y:5.17},{x:4.19,y:5.36},{x:4.4,y:5.6},{x:4.54,y:5.44},{x:4.5600000000000005,y:5.12},{x:4.58,y:5.26},{x:4.58,y:5.5},{x:4.6,y:5.93},{x:4.83,y:5.64}],height:1,party:"R",width:1,x:4,y:5}],width:5}},R=function(t){function e(t){var y;return Object(i.a)(this,e),(y=Object(o.a)(this,Object(c.a)(e).call(this,t))).state=y.initialState(t),window.onhashchange=function(){return y.setState(y.initialState(y.props))},y}return Object(h.a)(e,t),Object(s.a)(e,[{key:"initialState",value:function(t){var e;try{e=function(t){"#"!==t[0]&&"?"!==t[0]||(t=t.slice(1));var e={},y=!0,x=!1,a=void 0;try{for(var n,r=t.split("&")[Symbol.iterator]();!(y=(n=r.next()).done);y=!0){var i=n.value,s=i.indexOf("=");-1!==s&&(e[decodeURIComponent(i.slice(0,s))]=decodeURIComponent(i.slice(s+1)))}}catch(o){x=!0,a=o}finally{try{y||null==r.return||r.return()}finally{if(x)throw a}}return e}(document.location.hash.slice(1))}catch(y){console.error(y),e={}}return{mapName:j[e.mapName]?e.mapName:"CityMap",mapSave:e.mapSave,showParties:!!e.showParties&&"true"===e.showParties,showMetrics:!!e.showMetrics&&"true"===e.showMetrics}}},{key:"mapData",value:function(){return j[this.state.mapName]}},{key:"handleSave",value:function(t){document.location.hash="mapName=".concat(this.state.mapName)+"&showParties=".concat(String(this.state.showParties))+"&showMetrics=".concat(String(this.state.showMetrics))+"&mapSave=".concat(t)}},{key:"handleShare",value:function(t){this.handleSave(t),fetch("".concat("https://elbridge-gerry.appspot.com","/share"),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"url=".concat(encodeURIComponent(document.location.href),"&name=TODO")})}},{key:"handleToggleParties",value:function(){this.setState({showParties:!this.state.showParties,showMetrics:this.state.showMetrics&&!this.state.showParties})}},{key:"handleToggleMetrics",value:function(){this.setState({showMetrics:!this.state.showMetrics})}},{key:"render",value:function(){return a.a.createElement(S,Object.assign({scale:100,save:this.state.mapSave,onSave:this.handleSave.bind(this),onShare:this.handleShare.bind(this),showParties:this.state.showParties,showMetrics:this.state.showMetrics,toggleParties:this.handleToggleParties.bind(this),toggleMetrics:this.handleToggleMetrics.bind(this)},this.mapData()))}}]),e}(x.Component);y(18);r.a.render(a.a.createElement(R,null),document.getElementById("root"))},9:function(t,e,y){t.exports=y(20)}},[[9,2,1]]]);
//# sourceMappingURL=main.489b805e.chunk.js.map