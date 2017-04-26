# Why are we not using Redux?

In short, because we don't need it. Since our application can be broken up into
essentially isolated pages which maintain their own state we don't need any sort
of global state or message passing system.

We might find that Redux could be powerful for us in the future for caching
network responses but this too can be handled by local state.

## References

* [You might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367).
