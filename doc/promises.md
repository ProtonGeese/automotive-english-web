# Promises

## Motivation

Since promises are a relatively new feature of browsers I have tried to resist
using them but the situation with `listSegments` has broken me.

The actual problem is simple enough but is massively complicated since
everything has to be done asynchronously. We need to perform the following
synchronous steps.

1. Get the list of segment ids from the lesson table.
2. Retrieve each segment from the segment table.
3. Return an array of the segment items.

Sounds easy right? The issue is that each segment retrieval is asynchronous and
we need to wait on them all to finish before we can perform the third step. We
could write a solution not using Promises but we would essentially be
implementing our own half-baked version which are guaranteed to have more bugs
than the real thing.

## Solution

First we want the function `getLesson` to return a promise rather than use a
callback. We use an anonymous function to wrap the method.

```js
var lesson = new Promise((resolve, reject) => {
  getLesson({
    lessonId: lessonId
  }, {
    onSuccess: resolve,
    onFailure: reject
  });
});
```

Once we have the lesson object we use the data to retrieve each segment.

```js
var segments = lesson.then((response) => {
  return Promise.all(
    response.Item.segments.map((segmentId) => {
      return new Promise((resolve, reject) => {
        getSegment(lessonId, segmentId, {
          onSuccess: resolve,
          onFailure: reject
        });
      });
    });
  });
});
```

For those of you keeping track at home here are the actual transformations being
performed.

We start with a simple array of segment ids.

```
[1, 2, 3, ...]
```

Then we map each array to a promise that will resolve to the database record of
the given id.

```
[Promise(Segment(1)), Promise(Segment(2), Promise(Segment(3)), ...]
```

Then we produce a new Promise for the result of the entire array.

```
Promise[Promise(Segment(1)) and Promise(Segment(2)) and Promise(Segment(3)) ...]
```

I.e. the result of this promise will be the entire array of database records.

Then we finally pass control back to the caller with our callback.

```
segments.then(callback.onSuccess, callback.onFailure);
```

## Polyfill

We shouldn't rely on Promises being available on every browser we are planning
to target so we need to polyfill them in if they're missing. Babel is already
doing this for us so there are no additional packages to install.
