angular.module('starter', ['ngRoute'])
.config(function($routeProvider){
    $routeProvider
      .when('/map',{
        templateUrl:'/app/map',
        controller:'mapCtrl'
      })
      .when('/about',{
        templateUrl:'/app/about'
        //controller controllerAS
      })
      .when('/user',{
        templateUrl:'/app/user',
        controller: 'userCtrl'
      })
      .when('/contact',{
        templateUrl:'/app/contact'
        //controller controllerAS
      })
      //TODO aggiungere login e user page
      /*
      .when('/login',{
        templateUrl:'/app/login'
        //controller controllerAS
      })*/
      .otherwise('/about');
})
