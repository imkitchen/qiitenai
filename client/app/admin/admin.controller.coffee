'use strict'

angular.module 'qiitenaiApp'
.controller 'AdminCtrl', ($scope, $http, Auth, User) ->

  $http.get '/api/users'
  .success (users) ->
    $scope.users = users
    _ $scope.users.forEach (user) ->
        user.email_hash = md5(user.email)

  $scope.delete = (user) ->
    User.remove id: user._id
    _.remove $scope.users, user
