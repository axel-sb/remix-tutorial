## [#](https://bobbyhadz.com/blog/react-get-element-by-id#table-of-contents) Table of Contents

1.  [Get an element by ID using a `ref` in React](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-using-a-ref-in-react)
2.  [Get an element by ID using `document.getElementById`](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-using-documentgetelementbyid)
3.  [Get an element by ID when an Event occurs in React](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-when-an-event-occurs-in-react)
4.  [\[Solved\] document.getElementById() returns NULL in React](https://bobbyhadz.com/blog/react-get-element-by-id#solved-documentgetelementbyid-returns-null-in-react)

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-using-a-ref-in-react) Get an element by ID using a `ref` in React

**To get an element by ID using a ref:**

1.  Set the `ref` prop on the element.
2.  Use the `current` property to access the element in the `useEffect` hook.

App.js

`import {useRef, useEffect} from 'react';  export default function App() {   const ref = useRef(null);    useEffect(() => {     const element = ref.current;     console.log(element);     console.log(element.id);   }, []);    return (     <div>       <h2 ref={ref} id="box">         bobbyhadz.com       </h2>     </div>   ); }`

![get element by id using ref](https://bobbyhadz.com/images/blog/react-get-element-by-id/get-element-by-id-using-ref.webp)

The equivalent of getting an element by ID in React is to use a `ref`.

The [useRef()](https://react.dev/reference/react/useRef) hook can be passed an initial value as an argument.

App.js

`const ref = useRef(null);`

The hook returns a mutable ref object whose `.current` property is initialized to the passed argument.

We set the `ref` prop on the element we need to access.

App.js

`<h2 ref={ref} id="box">   bobbyhadz.com </h2>`

Notice that we have to access the `current` property on the ref object to get access to the `h2` element on which we set the `ref` prop.

App.js

`useEffect(() => {   const element = ref.current;   console.log(element);   console.log(element.id); }, []);`

When we pass a ref prop to an element, e.g. `<div ref={myRef} />`, React sets the `.current` property of the ref object to the corresponding DOM node.

We passed an empty dependencies array to the [useEffect](https://react.dev/reference/react/useEffect) hook, so it's only going to run when the component mounts.

App.js

`useEffect(() => {   const element = ref.current;   console.log(element);   console.log(element.id); }, []);`

We used the `useEffect` hook because we want to make sure the `ref` has been set on the element and the element has been rendered to the DOM.

The `useRef` hook is the React.js equivalent of the `document.getElementById` method in JavaScript.

However, you are still able to use the method in React.js as well.

If you don't have access to the element you are trying to select in your component and can't simply set the `ref` prop on it, use the `document.getElementById` method.

I've also written a tutorial on [how to get the ID of an element on click](https://bobbyhadz.com/blog/react-onclick-get-id-of-element).

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-using-documentgetelementbyid) Get an element by ID using `document.getElementById`

This is a two-step process:

1.  Use the `useEffect` hook to invoke a function once the component mounts.
2.  Use the `document.getElementById()` method in the `useEffect` hook.

App.js

`import {useEffect} from 'react';  export default function App() {   useEffect(() => {     const element = document.getElementById('box');     console.log(element);     console.log(element.id);   }, []);    return (     <div>       <h2 id="box">bobbyhadz.com</h2>     </div>   ); }`

![react get element by id document getelementbyid](https://bobbyhadz.com/images/blog/react-get-element-by-id/react-get-element-by-id-document-getelementbyid.webp)

The [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method takes an ID as a parameter and returns the element with the given ID.

You have to call the `document.getElementById()` method in the `useEffect` hook or when an event occurs.

A commonly used convention in React is to only use the `document.getElementById` method when you don't have access to the DOM element and can't set a `ref` on it.

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#get-an-element-by-id-when-an-event-occurs-in-react) Get an element by ID when an Event occurs in React

Here is an example that gets an element by ID when an event occurs.

App.js

`import {useRef} from 'react';  export default function App() {   const ref = useRef(null);    const handleClick = () => {     // 👇️ use document.getElementById()     const element = document.getElementById('box');     console.log(element);      // 👇️ (better) use a ref     const element2 = ref.current;     console.log(element2);   };    return (     <div>       <h2 ref={ref} id="box">         bobbyhadz.com       </h2>        <button onClick={handleClick}>Click</button>     </div>   ); }`

![react get element by id on event](https://bobbyhadz.com/images/blog/react-get-element-by-id/react-get-element-by-id-on-event.gif)

Selecting an element by ID or using a `ref` is also possible in an event handler function.

If you try to get an element by ID or via its `ref` directly in the `render` method of your function component, the element you are trying to access might not have been rendered yet.

The `useEffect` hook runs after the DOM elements in the component have been rendered to the DOM, so if an element with the provided `id` exists, it will be selected.

You can also use the [document.querySelector method in React](https://bobbyhadz.com/blog/react-document-queryselector).

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#solved-documentgetelementbyid-returns-null-in-react) \[Solved\]: document.getElementById() returns NULL in React

**The `document.getElementById()` method returns `null` in React when we call the method before the element with the provided ID has been rendered to the DOM or if an element with the ID doesn't exist.**

**To get around this, call the `getElementById()` method in the `useEffect` hook.**

App.js

`import {useEffect} from 'react';  export default function App() {   useEffect(() => {     // 👇️ call method in useEffect hook     const el = document.getElementById('container');     console.log(el);   }, []);    return (     <div>       <div id="container">         <h2>bobbyhadz.com</h2>       </div>     </div>   ); }`

![call getelementbyid method in use effect](https://bobbyhadz.com/images/blog/react-get-element-by-id/call-getelementbyid-method-in-use-effect.webp)

The 2 most common reasons for the [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method to return `null` in React are:

1.  Trying to select an element that hasn't been rendered to the DOM yet.
2.  Supplying an ID that doesn't exist in the DOM.

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#use-documentgetelementbyid-in-the-useeffect-hook) Use `document.getElementById` in the `useEffect` hook

You can use the `document.getElementById` method in the [useEffect](https://react.dev/reference/react/useEffect) hook because the hook runs after the component has been mounted.

App.js

`useEffect(() => {   // 👇️ call method in useEffect hook   const el = document.getElementById('container');   console.log(el); }, []);`

We passed an empty dependencies array to the `useEffect` hook, so it's only going to run on the initial render.

We had to use the `useEffect` hook because we need to wait for the `div` element to get rendered before calling `document.getElementById()`.

You can also call the `document.getElementById()` method in an event handler function, e.g. in an `onClick` handler because the element will be present in the DOM when the event is triggered.

## [#](https://bobbyhadz.com/blog/react-get-element-by-id#using-a-ref-instead-of-documentgetelementbyid) Using a `ref` instead of `document.getElementById()`

Note that if you have access to the DOM element in your component, you can use a `ref`.

App.js

`import {useRef, useEffect} from 'react';  export default function App() {   const ref = useRef(null);    useEffect(() => {     const el = ref.current;     console.log(el);   }, []);    return (     <div>       <div ref={ref}>         <h2>bobbyhadz.com</h2>       </div>     </div>   ); }`

![using ref instead of document getelementbyid](https://bobbyhadz.com/images/blog/react-get-element-by-id/using-ref-instead-of-document-getelementbyid.webp)

The [useRef()](https://react.dev/reference/react/useRef) hook can be passed an initial value as an argument. The hook returns a mutable ref object whose `.current` property is initialized to the passed argument.

Notice that we have to access the `current` property on the ref object to get access to the `div` element on which we set the `ref` prop.

App.js

`useEffect(() => {   const el = ref.current;   console.log(el); }, []);`

When we pass a ref prop to an element, e.g. `<div ref={myRef} />`, React sets the `.current` property of the ref object to the corresponding DOM node.

We used the `useEffect` hook because we want to make sure the `ref` has been set on the element and the element has been rendered to the DOM.

Using refs should be your preferred approach when you have access to the element in your component, otherwise, you can use the `document.getElementById` method.