/*
 * angular-ec-callout v0.0.0
 * (c) 2015 Emil Cieslar http://webkreativ.cz
 * License: MIT
 */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {

    // AMD. Register as an anonymous module.
    define(['angular'], factory);

  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {

    // CommonJS support (for us webpack/browserify/ComponentJS folks)
    module.exports = factory(require('angular'));

  } else {

    // in the case of no module loading system
    // then don't worry about creating a global
    // variable like you would in normal UMD.
    // It's not really helpful... Just call your factory
    return factory(root.angular);

  }

}(this, function (angular) {

  'use strict';

  // Create module
  var moduleName = 'angular-ec-callout';
  var mod = angular.module(moduleName, ['ngAnimate']);

  mod.factory('ecCalloutService', ['$rootScope', function($rootScope) {

    return {

      // ----------------------------------------------------------------------------> NOTIFICATION TO DISPLAY CALLOUT
      // Callout is subscibed to this notification and every time something (controller)
      // triggers the notify method, the callout directive is notified and acts appropriately
      // (displays message that has been sent as an argument in notify method)
      subscribe: function(scope, callback) {
        var handler = $rootScope.$on('ec-callout-event', callback);
        scope.$on('$destroy', handler);
      },

      notify: function(status) {
        $rootScope.$emit('ec-callout-event', status);
      }

    }

  }])

  mod.directive('ecCallout', ['ecCalloutService', '$timeout', function(CalloutService, $timeout) {

    // Return the directive
    return {

      restrict: 'AE',
      scope: false,

      link: function($scope, $elem, $attrs) {

        // This will store all calloutStatuses
        $scope.calloutStatuses = [];
        // Default id, which will be increased when a new status is added
        // This uniquely identifies a callout status in the array
        // The $index is not reliable enough as it's changing when any element
        // is removed from the array
        var id = 0;

        // Helper method to remove a callout status
        $scope.remove = function(statusId) {

          // Find it in the array and remove it
          for(var i = $scope.calloutStatuses.length-1; i >= 0; i--) {
            if($scope.calloutStatuses[i].id == statusId) {
              $scope.calloutStatuses.splice(i, 1);
            }
          }

        }

        // Example calloutStatus object
        /*$scope.calloutStatus = {
          type: 'alert',
          message: 'This is gonna be displayed to a user',
          img: false,
          timeout: 2000,
          remove: false
        }*/

        // When the callout notification is sent, add status to calloutStatuses
        // and display the status
        CalloutService.subscribe($scope, function(event, status) {

          // If status contains remove property, we want to remove all callouts
          if(status.remove) {
            for(var i = $scope.calloutStatuses.length - 1; i >= 0; i--) {
              $scope.calloutStatuses.pop();
            }

          // Otherwise we want to add another status with data provided
          } else {

            // Define unique index
            // We need this index for timeout method because during the timeout
            // the index of a status in the array may change because any
            // statuse can be removed before the timeout is finished
            // so we need a way to address a specific status that should be removed
            status.id = id++;
            // Push it and show it
            $scope.calloutStatuses.push(status);

            // If timeout is set, we must remove the callout in seconds provided
            if(status.timeout) {
              $timeout(function() {
                $scope.remove(status.id);
              },status.timeout);
            }

          }

        });

      },

      template: '<div ng-repeat="calloutStatus in calloutStatuses track by $index" class="callout ec-callout {{calloutStatus.type}}">' +
                  '<p>' +
                    '<img ng-if="calloutStatus.img" ng-src="{{calloutStatus.img}}" alt="" />' +
                    '{{calloutStatus.message}}' +
                  '</p>' +
                  '<a class="close-button" ng-click="remove(calloutStatus.id)">&times;</a>' +
                '</div>'
    }

  }])

  return moduleName; // return the name of the module

}));
