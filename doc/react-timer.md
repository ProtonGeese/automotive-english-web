# Timed Events and React Components

## Motivation

We were infrequently receiving a warning in the console about how calling
`setState` on an unmounted component is a no-op. We weren't entirely sure where
the warning originated since it's fairly difficult to even acquire a reference
to an unmounted component. Eventually we realized that we could consistently
reproduce the error when we saved a database record and then quickly navigated
to another page. Timers! When a record is saved a toast is shown and then hidden
a few seconds later with a `setTimeout` call.

So we need a way to cancel any timers that hold references to our components
when they're unmounted.

## Solutions

One potential solution is to keep track of the timers ourselves. There's no
reason a timer like this couldn't be part of the component's state. When we
start a timer we capture the id in the state and then add a hook into the
unmount event to cancel any pending timers.

Were it not for the `react-timer-mixin` package this is the solution we would
have went with. This package basically does all of this for us and eliminates
the need for a lot of duplicated code by augmenting our components in a
consistent manner.

Because we're using es6 class syntax we need a helper method to use React's
mix-in feature which is provided by the `react-mixin` package.

## Implementation

The real benefit to using these packages is that you can move from the wrong
thing to the right thing with a mix-in call and a find & replace script.

On each of the classes you use timers add the mix-in by 

```js
import { reactMixin } from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
...

class MyComponent extends React.Component {
  ...
}

reactMixin(MyComponent, TimerMixin);
```

then simply replace all your calls to `setTimeout` to `this.setTimeout` and
everything will work as expected.

## Links

* [`react-timer-mixin`](https://github.com/reactjs/react-timer-mixin)
* [`react-mixin`](https://github.com/brigand/react-mixin)
* [Mix-ins Considered Harmful](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)
