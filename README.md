# Angular EC Callout
[Example](http://emilcieslar.github.io/angular-ec-callout/)

Reusable callout (notification) directive and service. Use it whenever you need to display a (success, error or whatever) message to a user. Does not need jQuery.

## How to use it

### Install via bower
```bash
bower install angular-ec-callout
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

### Use the service, for example, in your controller
```javascript
.controller('yourController', ['ecCalloutService', function(CalloutService) {
  CalloutService.notify({
    type: 'alert',
    message: 'Alert callout!',
    img: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-alert.svg',
    timeout: 2000, // This callout will be removed in 2 seconds
    delete: false // setting this option to true would remove all displayed callouts
  });
}]);
```

### Style it however you want to
The module comes without any styling that means it can look however you want it to look. You can have a look at the example to see sample style, but you can customize it.

The directive uses `.callout` class, which is basically the callout wrapper. Then using `type` parameter you can specify what class should be added, for example: `alert`, `success`, as can be seen on the service example above.

The close button has class `.close-button`

### Add animations
You can also animate the callout when it's added or removed to/from the queue. Look at the following example.

```css
.callout {
  transition: .5s linear all;
  -webkit-transition: .5s linear all;
}

.callout.ng-enter {
  opacity: 0;
}

.callout.ng-enter.ng-enter-active {
  opacity: 1;
}

.callout.ng-leave {
  opacity: 1;
}

.callout.ng-leave.ng-leave-active {
  opacity: 0;
}
```

Above will make sure that it will fade in/fade out.

### Checkout example
[Example](http://emilcieslar.github.io/angular-ec-callout/)
