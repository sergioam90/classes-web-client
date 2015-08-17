!function(){"use strict";angular.module("appConstant",[]).constant("appConfig",{API_SERVER_URL:"api.classes-bahia.tk:8080"})}(),function(){"use strict";angular.module("classesClientApp",["appConstant","ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","restangular","angular-oauth2","xeditable","ui.bootstrap","ui.router","ui.select","ui.bootstrap.collapse","ui.bootstrap.datepicker","rzModule"]).run(["editableOptions",function(a){a.theme="bs3"}])}(),function(){"use strict";function a(){}angular.module("classesClientApp").run(a),a.$inject=[]}(),function(){"use strict";function a(a,b,c){a.configure({baseUrl:"http://"+c.API_SERVER_URL,clientId:"CLIENT_ID",grantPath:"/oauth/token",revokePath:"/"}),b.configure({options:{secure:!1}})}angular.module("classesClientApp").config(a),a.$inject=["OAuthProvider","OAuthTokenProvider","appConfig"]}(),function(){"use strict";function a(a,b,c){a.$on("oauth:error",function(a,d){return"invalid_grant"!==d.data.error?"invalid_token"===d.data.error?c.getRefreshToken():b.location.href="/login?error_reason="+d.data.error:void 0})}angular.module("classesClientApp").run(a),a.$inject=["$rootScope","$window","OAuth"]}(),function(){"use strict";function a(a,b){a.setBaseUrl("http://"+b.API_SERVER_URL)}angular.module("classesClientApp").config(a),a.$inject=["RestangularProvider","appConfig"]}(),function(){"use strict";function a(a,b,c){b.otherwise("/");var d="scripts/presentation/";a.state("main",{url:"/",templateUrl:d+"main/main.html",controller:"MainController as vm"}).state("about",{url:"/about",templateUrl:d+"about/about.html",controller:"AboutController as vm"}).state("login",{url:"/account/login",templateUrl:d+"account/login/login.html",controller:"LoginController as vm"}).state("register",{"abstract":!0,url:"/account/register/{target}",templateUrl:d+"account/register/register.html",controller:"RegisterController as vm"}).state("register.method",{url:"/method",templateUrl:d+"account/register/register.method.html"}).state("register.personal",{url:"/personal",templateUrl:d+"account/register/register.personal.html"}).state("register.teacher",{url:"/teacher",templateUrl:d+"account/register/teacher/register.teacher.html"}).state("register.student",{url:"/student",templateUrl:d+"account/register/student/register.student.html"}).state("account",{"abstract":!0,url:"/account",templateUrl:d+"account/account.html"}).state("account.user",{url:"/user",templateUrl:d+"account/user-profile/my.user.profile.html",controller:"MyUserProfileController as vm"}).state("account.student",{url:"/student",templateUrl:d+"account/student-profile/my.student.profile.html",controller:"MyStudentProfileController as vm"}).state("account.teacher",{url:"/teacher",templateUrl:d+"account/teacher-profile/my.teacher.profile.html",controller:"MyTeacherProfileController as vm"}).state("teachersSearch",{url:"/teacher/search?city?subjects",templateUrl:d+"teacher/search/teachers.search.html",controller:"TeachersSearchController as vm",reloadOnSearch:!1}).state("teacherProfile",{url:"/teachers/{id}",templateUrl:d+"teacher/profile/teacher.profile.html",controller:"TeacherProfileController as vm",resolve:{teacher:["$stateParams","TeacherService",function(a,b){return b.getById(a.id)}]}}).state("maps",{url:"/maps",templateUrl:d+"maps/maps.html",controller:"MapsController as vm"})}angular.module("classesClientApp").config(a),a.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"]}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"scripts/directive/degree-icon/degree-icon.template.html",scope:{degree:"=ngModel"}}}angular.module("classesClientApp").directive("degreeIcon",a)}(),function(){"use strict";function a(a){a.decorator("ratingDirective",["$delegate",function(a){var b=a[0];return b.templateUrl="scripts/directive/rating/rating.template.html",a}])}angular.module("classesClientApp").config(a),a.$inject=["$provide"]}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"scripts/directive/related-teacher/related-teacher.template.html",scope:{teacher:"=ngModel"}}}angular.module("classesClientApp").directive("relatedTeacher",a)}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"scripts/directive/review/review.template.html",scope:{review:"=ngModel"}}}angular.module("classesClientApp").directive("review",a)}(),function(){"use strict";function a(a){function b(a,b,c){a.minState=void 0,a.$watch("selectedDegrees",function(){var b=a.selectedDegrees.slice();b.push(!0);for(var c,d=0;d<b.length-1;d++)if(void 0===c&&b[d]&&(c=d),b[d]&&!b[d+1])return void(a.minState=void 0);0===c?a.minState=void 0:a.minState=c},!0),a.toggle=function(){if(void 0===a.minState){a.selectedDegrees[0]=!1;for(var b=1;b<a.selectedDegrees.length;b++)a.selectedDegrees[b]=!0;return void(a.minState=1)}var c=a.selectedDegrees.length-1;if(a.minState===c)return a.selectedDegrees[c]=!1,void(a.minState=void 0);a.selectedDegrees[a.minState]=!1,a.minState+=1;for(var b=a.minState;b<a.selectedDegrees.length;b++)a.selectedDegrees[b]=!0}}return{restrict:"E",templateUrl:"scripts/directive/search-filter/degree/degree.filter.template.html",scope:{selectedDegrees:"=",degreesNames:"="},link:b}}angular.module("classesClientApp").directive("degreeFilter",a),a.$inject=["DegreeService"]}(),function(){"use strict";function a(){function a(a,b,c){a.states=[20,50,100,200],a.toggle=function(){var b=a.states.length-1;if(a.state>=a.states[b])b=0;else for(var c=b-1;c>=0;c--)if(a.state>=a.states[c]){b=c+1;break}a.state=a.states[b]}}return{restrict:"E",templateUrl:"scripts/directive/search-filter/fee/fee.filter.template.html",scope:{state:"=ngModel"},link:a}}angular.module("classesClientApp").directive("feeFilter",a)}(),function(){"use strict";function a(){function a(a,b,c){a.toggle=function(){a.state?a.state=void 0:a.state=!0}}return{restrict:"E",templateUrl:"scripts/directive/search-filter/home/home.filter.template.html",scope:{state:"=ngModel"},link:a}}angular.module("classesClientApp").directive("homeFilter",a)}(),function(){"use strict";function a(){function a(a,b,c){a.toggle=function(){a.state?a.state=void 0:a.state=!0}}return{restrict:"E",templateUrl:"scripts/directive/search-filter/individual/individual.filter.template.html",scope:{state:"=ngModel"},link:a}}angular.module("classesClientApp").directive("individualFilter",a)}(),function(){"use strict";function a(a){function b(a,b,c){a.toggleMorning=function(){a.morning=a.morning?null:"1",a.search()},a.toggleAfternoon=function(){a.afternoon=a.afternoon?null:"1",a.search()},a.toggleNight=function(){a.night=a.night?null:"1",a.search()}}return{restrict:"E",templateUrl:"scripts/directive/search-filter/schedule/schedule.filter.template.html",scope:{search:"&",morning:"=",afternoon:"=",night:"="},link:b}}angular.module("classesClientApp").directive("scheduleFilter",a),a.$inject=["ScheduleService"]}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"scripts/directive/subject/subject.template.html",scope:{subject:"=ngModel"}}}angular.module("classesClientApp").directive("subject",a)}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"scripts/directive/teacher-features/teacher-features.template.html",scope:{teacher:"=ngModel"}}}angular.module("classesClientApp").directive("teacherFeatures",a)}(),function(){"use strict";function a(){function a(a,b,c){}return{restrict:"E",templateUrl:"scripts/directive/teacher-result/teacher-result.template.html",scope:{teacher:"=ngModel",viewProfile:"&"},link:a}}angular.module("classesClientApp").directive("teacherResult",a)}(),function(){"use strict";function a(a){return a.service("students")}angular.module("classesClientApp").factory("Students",a),a.$inject=["Restangular"]}(),function(){"use strict";function a(a){return a.service("subjects")}angular.module("classesClientApp").factory("Subjects",a),a.$inject=["Restangular"]}(),function(){"use strict";function a(a){return a.service("teachers")}angular.module("classesClientApp").factory("Teachers",a),a.$inject=["Restangular"]}(),function(){"use strict";function a(a){return a.service("users")}angular.module("classesClientApp").factory("Users",a),a.$inject=["Restangular"]}(),function(){"use strict";function a(){function a(a){var b=moment(a,"YYYY-MM-DD");return moment().diff(b,"years")}return function(b){return a(b)}}angular.module("classesClientApp").filter("age",a)}(),function(){"use strict";function a(a){return function(b){return b=b||"",a.getCityName(b)}}angular.module("classesClientApp").filter("city",a),a.$inject=["CityService"]}(),function(){"use strict";function a(a){return function(b){return b=b||"",a.getDegreeName(b)}}angular.module("classesClientApp").filter("degree",a),a.$inject=["DegreeService"]}(),function(){"use strict";function a(){return function(a){return a.firstName+" "+a.lastName}}angular.module("classesClientApp").filter("fullName",a),a.$inject=[]}(),function(){"use strict";function a(a){return function(b){return b=b||"",a.getGenderName(b)}}angular.module("classesClientApp").filter("gender",a),a.$inject=["GenderService"]}(),function(){"use strict";function a(a){return function(b){return b=b||"",a.getLevelName(b)}}angular.module("classesClientApp").filter("level",a),a.$inject=["LevelService"]}(),function(){"use strict";function a(){function a(a){return a.replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ü/g,"u")}return function(b){return a(b)}}angular.module("classesClientApp").filter("noAccents",a)}(),function(){"use strict";function a(a){return function(b){return b=b||"",a.getScheduleName(b)}}angular.module("classesClientApp").filter("schedule",a),a.$inject=["ScheduleService"]}(),function(){"use strict";function a(){var a=this;a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}angular.module("classesClientApp").controller("AboutController",a)}(),function(){"use strict";function a(a,b,c,d,e,f){}angular.module("classesClientApp").controller("AccountController",a),a.$inject=["AccountService","Students","Subjects","Teachers","$scope","$state"]}(),function(){"use strict";function a(a,b,c,d){function e(a,b){"invalid_grant"===b.data.error&&(h.loginMessages.$error={badCredentials:"true"})}function f(d){a.login(d).then(function(){c.path(b.redirectUrl||"/")})}function g(){return a.isAuthenticated()}var h=this;h.isAuthenticated=g,h.login=f,h.loginMessages={},d.$on("oauth:error",e)}angular.module("classesClientApp").controller("LoginController",a),a.$inject=["AccountService","$routeParams","$location","$rootScope"]}(),function(){"use strict";function a(a,b,c,d,e){function f(b){function c(){alert("Error in registration")}function e(){d.path("/login")}a.register(b).then(e,c)}function g(a){i.degreesNames=a.plain()}function h(a){i.subjects=a.plain()}var i=this;i.register=f,i.target=e.target,i.user={},i.teacher={},i.student={},b.getList().then(g),c.getList().then(h)}angular.module("classesClientApp").controller("RegisterController",a),a.$inject=["AccountService","Degrees","Subjects","$location","$stateParams"]}(),function(){"use strict";function a(a,b){function c(){d()}function d(){function b(a){i.student=a,e(i.student.id),f()}a.me().then(b)}function e(b){a.madeReviews(b).then(function(a){i.madeReviews=a.content})}function f(){a.favoriteTeachers().then(function(a){i.favoriteTeachers=a.content})}function g(b){a.removeReview(b).then(function(){e(i.student.id)})}function h(){b.editUser(i.student.user)}var i=this;i.student={},i.madeReviews=[],i.favoriteTeachers=[],i.removeReview=g,i.editUser=h,c()}angular.module("classesClientApp").controller("MyStudentProfileController",a),a.$inject=["StudentService","UserService"]}(),function(){"use strict";function a(a,b,c){function d(){e()}function e(){a.me().then(function(a){i.teacher=a,f(i.teacher.id),g(i.teacher.location)})}function f(b){a.reviews(b).then(function(a){i.reviews=a})}function g(){b.getAddress(location).then(function(a){i.teacher.formattedAddress=a})}function h(){a.saveTeacher(i.teacher).then(function(a){i.teacher=a})}var i=this;i.teacher={},i.reviews=[],i.saveTeacher=h,i.degreesNames=c.getAllDegrees(),d()}angular.module("classesClientApp").controller("MyTeacherProfileController",a),a.$inject=["TeacherService","MapsService","DegreeService"]}(),function(){"use strict";function a(a,b,c){function d(){e()}function e(){b.loadUser().then(function(a){g.user=a})}function f(){g.user.birthDate=moment(g.user.birthDate).format("YYYY-MM-DD"),a.saveUser(g.user).then(e)}var g=this;g.user={},g.saveUser=f,g.genders=c.getAllGenders(),d()}angular.module("classesClientApp").controller("MyUserProfileController",a),a.$inject=["UserService","AccountService","GenderService"]}(),function(){"use strict";function a(a,b,c){function d(){}function e(){return b.me}function f(){b.logout(),c.go("main")}var g=this;g.isAuthenticated=a.isAuthenticated,g.logout=f,g.getCurrentUser=e,d()}angular.module("classesClientApp").controller("HeaderController",a),a.$inject=["OAuth","AccountService","$state"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){a.getList().then(function(a){i.subjects=a.plain()})}function g(a,b){var c=d("noAccents")(a);return c.toLowerCase().indexOf(b.toLowerCase())>-1}function h(){var a=i.searchCriteria;i.searchCriteria.subject&&(a.subjects=[i.searchCriteria.subject.id]),e.go("teachersSearch",a)}var i=this;i.subjects=[],i.levels=b.getAllLevels(),i.cities=c.getAllCities(),i.removeAccents=g,i.homeSearch=h,i.searchCriteria={},f()}angular.module("classesClientApp").controller("MainController",a),a.$inject=["Subjects","LevelService","CityService","$filter","$state"]}(),function(){"use strict";function a(a){var b=this;b.LatLng="";var c={center:{lat:-34.397,lng:150.644},zoom:8};b.mapCanvas1=new google.maps.Map(document.getElementById("mapCanvas1"),c);var d=new google.maps.places.Autocomplete(document.getElementById("input1"));d.bindTo("bounds",b.mapCanvas1);var e=new google.maps.InfoWindow,f=new google.maps.Marker({map:b.mapCanvas1,anchorPoint:new google.maps.Point(0,-29)});google.maps.event.addListener(d,"place_changed",function(){e.close(),f.setVisible(!1);var c=d.getPlace();if(!c.geometry)return void window.alert("Autocomplete's returned place contains no geometry");c.geometry.viewport?b.mapCanvas1.fitBounds(c.geometry.viewport):(b.mapCanvas1.setCenter(c.geometry.location),b.mapCanvas1.setZoom(17)),f.setIcon({url:c.icon,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(35,35)}),f.setPosition(c.geometry.location),f.setVisible(!0);var g="";c.address_components&&(g=[c.address_components[0]&&c.address_components[0].short_name||"",c.address_components[1]&&c.address_components[1].short_name||"",c.address_components[2]&&c.address_components[2].short_name||""].join(" ")),a.$apply(function(){b.LatLng=c.geometry.location}),e.setContent("<div><strong>"+c.name+"</strong><br>"+g),e.open(b.mapCanvas1,f)}),b.address={lat:-32.397,lng:-62};var g={center:{lat:-34.397,lng:150.644},zoom:8};b.mapCanvas2=new google.maps.Map(document.getElementById("mapCanvas2"),g);new google.maps.Marker({map:b.mapCanvas2,position:b.address,visible:!0});b.mapCanvas2.setCenter(b.address),b.selectedTeacher={};var h=[{name:"Messi",address:{lat:-30.0001,lng:-62.0001}},{name:"Diego",address:{lat:-30.02,lng:-62.01}},{name:"Carlitos",address:{lat:-30.01,lng:-62.02}},{name:"Kun",address:{lat:-30.02,lng:-62.02}}],i={center:{lat:-30.02,lng:-62.01},zoom:8};b.mapCanvas3=new google.maps.Map(document.getElementById("mapCanvas3"),i),angular.forEach(h,function(c){var d=new google.maps.Marker({map:b.mapCanvas3,position:c.address,teacher:c,visible:!0});google.maps.event.addListener(d,"click",function(){a.$apply(function(){b.selectedTeacher=d.teacher})})})}angular.module("classesClientApp").controller("MapsController",a),a.$inject=["$scope"]}(),function(){"use strict";function a(a,b,c,d){function e(){function b(){a.close()}function c(){}console.log(i.review),d(i.review).then(b,c)}function f(){a.close()}function g(a){i.currentTitle=i.titles[a-1]}function h(){i.currentTitle=i.titles[i.teacher.review.rating-1]}var i=this;i.teacher=b,i.currentUser=c,i.review={},i.modalSubmitReview=e,i.modalDismiss=f,i.onHover=g,i.onLeave=h,i.titles=["Malísimo","Malo","Zafa","Bueno","Genial"],i.teacher.review&&(i.review.comment=i.teacher.review.comment,i.review.rating=i.teacher.review.rating,i.currentTitle=i.titles[i.teacher.review.rating-1])}angular.module("classesClientApp").controller("ReviewModalController",a),a.$inject=["$modalInstance","teacher","currentUser","submitReview"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){i(n.teacher.id),j(n.teacher.id)}function h(b){a.getById(b).then(function(a){n.teacher=a,n.teacher.review||(n.teacher.review={}),i(n.teacher.id),j(n.teacher.id)})}function i(b){a.relatedTeachers(b).then(function(a){n.relatedTeachers=a})}function j(b){a.reviews(b).then(function(a){n.reviews=a.content})}function k(a){b.toggleFavorite(a).then(function(){h(n.teacher.id)})}function l(b){return a.submitReview(n.teacher.id,b).then(function(){h(n.teacher.id)})}function m(){e.open({templateUrl:"scripts/presentation/teacher/profile/review/teacher.profile.review.html",controller:"ReviewModalController",controllerAs:"vm",resolve:{teacher:function(){return n.teacher},currentUser:function(){return n.currentUser},submitReview:function(){return n.submitReview}}})}var n=this;n.teacher=f,n.relatedTeachers=[],n.currentUser=c.me,n.toggleFavorite=k,n.submitReview=l,n.showReviewModal=m,g()}angular.module("classesClientApp").controller("TeacherProfileController",a),a.$inject=["TeacherService","StudentService","AccountService","$stateParams","$modal","teacher"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){h().then(l)}function h(){i();var a=e.search();s.searchCriteria=angular.extend({},s.defaultSearchCriteria,a);var b=k();return b}function i(){s.searchCriteria={},angular.copy(s.defaultSearchCriteria,s.searchCriteria),s.schedules={},angular.copy(s.defaultSchedules,s.schedules),j()}function j(){s.degreesNames=c.getAllDegrees(),s.selectedDegrees=new Array(s.degreesNames.length);for(var a=0;a<s.degreesNames.length;a++)s.selectedDegrees[a]=!0}function k(){return b.getList().then(function(a){if(s.subjects=a.plain(),s.selectedSubjects=[],s.searchCriteria.subjects)for(var b=0;b<s.subjects.length;b++){var c=s.searchCriteria.subjects.indexOf(s.subjects[b].id)>-1;s.subjects[b].selected=c,c&&s.selectedSubjects.push(s.subjects[b])}})}function l(){var b={};angular.copy(s.searchCriteria,b),b.degrees=[];for(var c=0;c<s.selectedDegrees.length;c++)s.selectedDegrees[c]&&b.degrees.push(s.degreesNames[c]);b.subjects=[];for(var c=0;c<s.selectedSubjects.length;c++)b.subjects.push(s.selectedSubjects[c].id);e.search(b),a.search(b).then(function(a){s.teachersResult=a.content})}function m(a){f.go("teacherProfile",a)}function n(a){return"$ "+a}function o(){i(),s.selectedSubjects=[];for(var a=0;a<s.subjects.length;a++)s.subjects[a].selected=!1;s.search()}function p(a,b){a.selected=!0,s.search()}function q(a,b){a.selected=!1,s.search()}function r(a){var b=s.subjects[a],c=s.selectedSubjects.indexOf(b)>-1;if(b.selected)c!==b.selected&&s.selectedSubjects.push(b);else if(c!==b.selected){var d;for(d=0;d<s.selectedSubjects.length&&s.selectedSubjects[d].id!==b.id;d++);s.selectedSubjects.splice(d,1)}}var s=this;s.defaultSearchCriteria={fee:400,city:null,subjects:[],degrees:[]},s.degreesNames=[],s.selectedDegrees=[],s.cities=d.getAllCities(),s.search=l,s.moneyTranslate=n,s.clearFilters=o,s.teachersResult=[],s.viewProfile=m,s.subjects=[],s.selectedSubjects=[],s.subjectSelect=p,s.subjectUnselect=q,s.subjectCheckboxChange=r,g()}angular.module("classesClientApp").controller("TeachersSearchController",a),a.$inject=["TeacherService","Subjects","DegreeService","CityService","$location","$state"]}(),function(){"use strict";function a(a,b,c){function d(){h.isAuthenticated()&&e()}function e(){return a.me().then(function(a){return h.me=a})}function f(a){return h.isAuthenticated()&&h.logout(),b.getAccessToken(a).then(h.loadUser)}function g(){return h.me={},c.removeToken()}var h=this;h.isAuthenticated=b.isAuthenticated,h.login=f,h.logout=g,h.loadUser=e,h.me={},d()}angular.module("classesClientApp").service("AccountService",a),a.$inject=["UserService","OAuth","OAuthToken"]}(),function(){"use strict";function a(){function a(){var a=[];for(var b in c)c.hasOwnProperty(b)&&a.push(b);return a}function b(a){return c[a]}var c={ChIJvQIT3Ku87ZUREXoeJI3Y0XY:"Bahía Blanca"};return{getCityName:b,getAllCities:a}}angular.module("classesClientApp").service("CityService",a)}(),function(){"use strict";function a(){function a(a){return c[a]}function b(){var a=[];for(var b in c)c.hasOwnProperty(b)&&a.push(b);return a}var c={Undergraduate:"No graduado",Graduate:"Graduado",Postgraduate:"Superior a graduado"};return{getDegreeName:a,getAllDegrees:b}}angular.module("classesClientApp").factory("DegreeService",a)}(),function(){"use strict";function a(){function a(a){return c[a]}function b(){var a=[];for(var b in c)c.hasOwnProperty(b)&&a.push(b);return a}var c={Male:"Masculino",Female:"Femenino"};return{getGenderName:a,getAllGenders:b}}angular.module("classesClientApp").factory("GenderService",a)}(),function(){"use strict";function a(){function a(){var a=[];for(var b in c)c.hasOwnProperty(b)&&a.push(b);return a}function b(a){return c[a]}var c={Secondary:"Secundario",University:"Universitario"};return{getAllLevels:a,getLevelName:b}}angular.module("classesClientApp").service("LevelService",a)}(),function(){"use strict";function a(a){function b(b){var c=a.defer(),d=new google.maps.places.PlacesService(document.createElement("div")),e={placeId:b};return d.getDetails(e,function(a,b){b===google.maps.places.PlacesServiceStatus.OK?c.resolve(a.name):c.reject()}),c.promise}function c(b){var c=a.defer(),d=new google.maps.Geocoder,e=new google.maps.LatLng(-38.7229407,-62.2685386),f={location:e};return d.geocode(f,function(a,b){b===google.maps.GeocoderStatus.OK?c.resolve(a[0].formatted_address):(console.log("Geocoding failed. Status: "+b),c.reject())}),c.promise}return{getLocationName:b,getAddress:c}}angular.module("classesClientApp").service("MapsService",a),a.$inject=["$q"]}(),function(){"use strict";function a(){function a(a){return c[a]}function b(){var a=[];for(var b in c)c.hasOwnProperty(b)&&a.push(b);return a}var c={morning:"Mañana",afternoon:"Tarde",night:"Noche"};return{getScheduleName:a,getAllSchedules:b}}angular.module("classesClientApp").factory("ScheduleService",a)}(),function(){"use strict";function a(a,b){function c(){return a.one("me").get()}function d(b){return a.one(b).one("made-reviews").get()}function e(){return a.one("me").one("favorite-teachers").get()}function f(b){return a.one("me").all("favorite-teachers").post({id:b})}function g(b){return a.one("me").all("favorite-teachers").one(b).remove()}function h(a){return a.isFavorite?g(a.id):f(a.id)}function i(a){return b.one(a).one("reviews").remove()}var j=this;j.me=c,j.madeReviews=d,j.favoriteTeachers=e,j.toggleFavorite=h,j.addAsFavorite=f,j.removeFavoriteTeacher=g,j.removeReview=i}angular.module("classesClientApp").service("StudentService",a),a.$inject=["Students","Teachers"]}(),function(){"use strict";function a(a){function b(){return a.one("me").get()}function c(b){return a.one(b).one("reviews").get()}function d(b){return a.one(b).one("related-teachers").getList()}function e(b){return a.one(b).get()}function f(b,c){return a.one(b).all("reviews").post(c)}function g(b){return a.one("me").customPUT(b)}function h(b){return a.one("").get(b)}var i=this;i.me=b,i.reviews=c,i.relatedTeachers=d,i.getById=e,i.submitReview=f,i.saveTeacher=g,i.search=h}angular.module("classesClientApp").service("TeacherService",a),a.$inject=["Teachers"]}(),function(){"use strict";function a(a){function b(){return a.one("me").get()}function c(b){return a.one("me").customPUT(b)}var d=this;d.me=b,d.saveUser=c}angular.module("classesClientApp").service("UserService",a),a.$inject=["Users"]}();