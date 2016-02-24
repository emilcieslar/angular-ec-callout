/*
 * angular-ec-callout v0.0.0
 * (c) 2015 Emil Cieslar http://webkreativ.cz
 * License: MIT
 */

angular.module('angular-ec-callout', [])

.factory('ecCalloutService', ['$rootScope', function($rootScope) {

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


.directive('ecCallout', ['ecCalloutService', function(CalloutService) {

  // Awesome fade in and fade out helper functions
  // by Chris Buttery
  // http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
  // modified to fallback to simple hide and show if not supported by older
  // browsers including IE9 and IE8 (not going further because opacity is not
  // supported in <IE8)

  // Fade out
  function fadeOut(el){
    if(typeof(requestAnimationFrame) !== typeof(Function)) {
      el.style.display = "none";
      return false;
    }

    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= .05) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();

  }

  // Fade in
  function fadeIn(el, display){
    if(typeof(requestAnimationFrame) !== typeof(Function)) {
      el.style.display = display || "block";
      return false;
    }

    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .05) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();

  }

  // Return the directive
  return {
    restrict: 'AE',
    scope: false,
    link: function($scope, $elem, $attrs) {

      // Hidden by default
      $elem.css({'display':'none'});

      $scope.calloutStatus = {
        type: '',
        message: '',
        img: false
      }

      // When the callout notification is sent, update status and display the callout
      CalloutService.subscribe($scope, function(event, status) {
        $scope.calloutStatus = status;
        fadeIn($elem[0]);
      })

      // Catch click on close and hide the directive
      $scope.close = function() {
        fadeOut($elem[0]);
      }

    },
    template: '<div class="callout {{calloutStatus.type}}">' +
                '<p>' +
                  '<img ng-if="calloutStatus.img" ng-src="{{calloutStatus.img}}" alt="" />' +
                  '{{calloutStatus.message}}' +
                '</p>' +
                '<a class="close-button" ng-click="close()">&times;</a>' +
              '</div>'
  }

}])
