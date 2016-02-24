# Angular EC Callout
[Homepage](http://emilcieslar.github.io/angular-ec-callout/example/)

Reusable callout (notification) directive and service. Use it whenever you need to display a (success, error or whatever) message to a user. No dependencies (ok, angular)

## How to use it

### Install via bower
bower install emilcieslar/angular-ec-callout

### Add as a dependency to your app
```javascript
angular.module('yourApp', ['angular-ec-callout'])
```

### Use the service in your controller
```javascript
.controller('yourController', ['ecCalloutService', function(CalloutService) {
  CalloutService.notify({
    type: 'alert',
    message: 'Alert callout!',
    img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg'
  })
}])
```

### Checkout example
[Example](http://emilcieslar.github.io/angular-ec-callout/example/)
