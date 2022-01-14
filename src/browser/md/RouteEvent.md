### Usage

#### Monitor browser back button example

```
import RouterEvent from 'path/routeEvents'

const route = new RouterEvent();
route.on('backButton', () => {
  console.log('Click the browser Back buttonbrowser back button');
})
```

#### listener API List

```
'pushState'
'replaceState'
'go'
'back'
'forward'
'forwardButton'
'backButton'
'hashChange'
'popstate'

```
