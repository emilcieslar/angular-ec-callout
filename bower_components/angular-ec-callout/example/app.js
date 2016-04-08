angular.module('exampleApp', ['angular-ec-callout'])

.controller('mainController', ['ecCalloutService', function(CalloutService) {

  this.callAlert = function() {
    CalloutService.notify({
      type: 'alert',
      message: 'Alert callout!',
      img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg',
      timeout: 2000
    });
  }

  this.callSuccess = function() {
    CalloutService.notify({
      type: 'success',
      message: 'Success callout!',
      img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg'
    });
  }

  this.callDefault = function() {
    CalloutService.notify({
      type: '',
      message: 'Default callout!'
    });
  }

  this.callRemove = function() {
    CalloutService.notify({
      remove: true
    });
  }

}])
