# Angular EC Callout
[Example](http://emilcieslar.github.io/angular-ec-callout/)

Reusable callout (notification) directive and service. Use it whenever you need to display a (success, error or whatever) message to a user. No dependencies (ok, angular)

## How to use it

### Install via bower
```bash
bower install emilcieslar/angular-ec-callout
```

### Add as a dependency to your app
```javascript
angular.module('yourApp', ['angular-ec-callout'])
```

### Add the callout directive to your HTML
Ideally add it somewhere in the top
```html
<ec-callout></ec-callout>
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

### Style it however you want to
The module comes without any styling that means it can look however you want it to look. You can have a look at the example to see sample style, but you can customize it.

The directive uses `.callout` class, which is basically the callout wrapper. Then using `type` parameter you can specify what class should be added, for example: `.alert`, `.success`, etc.

The close button has class `.close-button`

### Checkout example
[Example](http://emilcieslar.github.io/angular-ec-callout/)
