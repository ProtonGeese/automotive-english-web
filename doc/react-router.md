# Structure of a Single Page Application

## Motivation

There are numerous advantages to building a single page application, the primary
one being that you can persist state across the application without a central
server or leveraging local storage. However, what should you do with an
application that needs a location oriented design? You could maintain a complex
network of transitions from one 'page' to another and make sure everything is
cleaned up but it is difficult to maintain such a system for more than a few
pages.

## Solutions

The first thing to try is avoiding the need for a multi-page design in the first
place. However, since this project is best modeled under the CRUD design pattern
it would be terribly difficult to avoid a page oriented design. With careful
planning I truly believe it could be done, but not in 14 weeks, and it would end
up terribly complex.

Enter declarative routing. If you can specify each 'page' as a React component
then you can bind them to URIs (either with the browser's `pushState` or with a
'hash history') and load them appropriately. You do this by creating a list of
rules that match paths to React components. For example

```
/                             -> Home

/login                        -> Login page

/lessons                      -> Lesson index
/lessons/:lessonId            -> Individual lesson
/lessons/:lessonId/:segmentId -> Segment within a lesson
```

## Implementation

With the `react-router` package we can implement the previous scheme by creating
a component representing each page given access to both the global state and the
parameters passed by the path.

```
import { Router, Route, hashHistory } from 'react-router';
...

class App extends React.Component {
  ...
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Home}/>
        <Route path='/login' component={Login}>
        <Route path='/lessons' component={Lessons}/>
        <Route path='/lessons/:lessonId' component={Lesson}/>
        <Route path='/lessons/:lessonId/:segmentId' component={Segment}/>
        </Route>
      </Router>
    )
  }
}
```

## Links

* [`react-router`](https://github.com/ReactTraining/react-router)
