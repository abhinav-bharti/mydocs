// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('login',function($scope){
 $scope.click = function(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
    
     
}
})

app.service('Auth', function($q, $ionicLoading) {

   this.getLoginStatus = function() {
      var defer = $q.defer();

      FB.getLoginStatus(function(response) {
		
         if (response.status === "connected") {
            console.log(JSON.stringify(response));
         } else {
            console.log("Not logged in");
         }
      });

      return defer.promise;
   }
   

   this.loginFacebook = function() {
      var defer = $q.defer();

      FB.login(function(response) {
		
         if (response.status === "connected") {
            console.log(JSON.stringify(response));
         } else {
            console.log("Not logged in!");
         }
      });

      return defer.promise;
   }

   this.logoutFacebook = function() {
      var defer = $q.defer();

      FB.logout(function(response) {
         console.log('You are logged out!');
      });

      return defer.promise;
   }

   this.getFacebookApi = function() {
      var defer = $q.defer();

      FB.api("me/?fields = id,email", [], function(response) {
		
         if (response.error) {
            console.log(JSON.stringify(response.error));
         } else {
            console.log(JSON.stringify(response));
         }
      });

      return defer.promise;
   }

});
app.controller('MyCtrl', function($scope, Auth, $ionicLoading) {

   $scope.checkLoginStatus = function() {
      getLoginUserStatus();
   }

   $scope.loginFacebook = function(userData) {
      loginFacebookUser();
   };

   $scope.facebookAPI = function() {
      getFacebookUserApi();
   }

   $scope.logoutFacebook = function() {
      logoutFacebookUser();
   };

   function loginFacebookUser() {
      return Auth.loginFacebook();
   }

   function logoutFacebookUser() {
      return Auth.logoutFacebook();
   }

   function getFacebookUserApi() {
      return Auth.getFacebookApi();
   }

   function getLoginUserStatus() {
      return Auth.getLoginStatus();
   }

})
