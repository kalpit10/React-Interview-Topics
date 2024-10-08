/*
Q. What is useEffect?
A. It allows us to perform side effects in our functional components.
   Side Effects can be things like fetching data from an API, updating the DOM,
   subscribing to events, or manually changing the state.

*/

import React, { useEffect, useState } from "react";

// Inside the function, useEffect will run after every render and update of the component
// function useEffectFile() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Component has rendered or updated");
//     // Dependency array is to control when the effect runs
//     // If the array is empty, the effect will run only once
//     // (like componentDidMount in class components)
//     // If it contains variables, the effect will run only when those variables change
//   }, [count]); // called as a dependency array

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }

function useEffectFile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    //Fetch data from an API

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div>
      <h1>API Data</h1>
      {data ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default useEffectFile;

// ------------------SOME USECASES OF DEPENDENCIES-----------------------

/*

1. No dependency Array (Runs after every render)

Code :- useEffect(() => {
  console.log("Effect runs after every render")
  });

2. Empty Dependency Array (Runs Only Once - On Mount)

When you pass an empty array ([]) as the second argument, the effect runs only once, 
when the component mounts 
(similar to componentDidMount in class components). 
It does not run on subsequent re-renders.


Code : useEffect(() => {
  console.log("Effect runs only once on mount");
}, []);

When it runs: Only once, when the component mounts (compontnet is added to the screen).
Use case: Useful for fetching data, setting up event listeners, or running code 
that should happen once when the component is first rendered 
(e.g., subscribing to a WebSocket or setting up timers).


3. With Dependencies (Runs When Specified Dependencies Change)

When you pass an array of variables as the dependency array, 
the effect will run whenever any of those variables change.

Code: useEffect(() => {
  console.log("Effect runs when `count` changes")
  }, [count]);

When it runs: On the initial mount and whenever the count variable changes.
Use case: You can optimize performance by running expensive calculations or 
API calls only when necessary (i.e., when specific pieces of state change). 
This is crucial for avoiding unnecessary side effects and re-renders.


4. Multiple Dependencies

You can add multiple dependencies in the array, 
and the effect will run if any of the listed dependencies change.

useEffect(() => {
  console.log("Effect runs when either `count` orn `name` changes");
  }, [count, name])

When it runs: On the initial mount and whenever count or name changes.
Use case: When you need the effect to be triggered by multiple pieces of state or props.


Interview Tip: What Happens When Dependencies Are Incorrectly Specified?

A. If dependencies are not managed correctly, you can run into issues like:

Missing dependencies: If you forget to list a state or prop in the dependency array 
that is used inside the effect, 
the effect might not behave as expected. 
For example, if you use a state variable inside useEffect but forget to 
add it to the dependency array, 
the effect might use an outdated version of that variable.

Code: 
useEffect(() => {
  console.log(count);  // Using `count` but it's missing from the dependency array
}, []);  // Problem: the effect will always use the initial value of `count`, not the updated one.

Unnecessary re-renders: Adding too many dependencies or dependencies that 
don’t need to be tracked can cause the effect to run more often than needed,
which can lead to performance issues.


6. Cleanup Function (Unmount or Re-run Cleanup)

The useEffect hook can return a cleanup function that React will call 
when the component unmounts or before the effect re-runs (if dependencies change).

useEffect(() => {
  console.log("Effect runs on mount");
  
  return () => {
    console.log("Cleanup function runs on unmount");
  };
}, []);  // Cleanup will run when the component unmounts


Example of Cleanup on Dependency Change:

useEffect(() => {
  console.log("Setting up effect");
  
  return () => {
    console.log("Cleaning up effect before running the next one");
  };
}, [count]);  // Cleanup runs when `count` changes

Use case: Cleanup functions are useful for things like removing event listeners, 
clearing timeouts, or unsubscribing from services 
(e.g., WebSockets or API subscriptions) 
when the component unmounts or when the effect is re-triggered.



*/
