// =----------------This is a file only for understanding the concept around this hook---------------------=

import React, { useState } from "react";

function useStateFile() {
  // This hook allows us to add state to functional components.

  // Syntax:
  //first one is describing the current state value which can be passed to useState and the second is a function that updates the state.
  //   const [state, setState] = useState("");

  //A simple counter

  // EXAMPLE 1
  const [counter, setCounter] = useState(0);

  function handleCounter() {
    // So, here if you pass the same value to the update fn., it will not re-render
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>Counter</h1>
      {counter}
      <button onClick={handleCounter}>+</button>
    </div>
  );

  // EXAMPLE 2
  // USING USESTATE WITH OBJECTS

  // Using the state to change the name and storing the values in an object
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: 30,
  });

  const updateName = () => {
    // Keep the previous state while updating the name
    setProfile({ ...profile, name: "Jane Doe" });
  };

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <button onClick={updateName}>Change Name</button>
    </div>
  );

  // FEW QUESTIONS:-

  /* 

1. What happens when you update the state with the same value?
Ans :- If you call setState with the current value of the state, React will not trigger a re-render because it optimizes performance by detecting that the state hasn't changed.

2. How can you update a state object partially?
Ans:- We use the spread operator (...) to preserve rest of the data while updating specific parts

3. How do you handle multiple pieces of state in a functional component?
Ans:- We can use multiple useState calls to handle difference pieces of state

const [name, setName] = useState('John');
const [age, setAge] = useState(30);

*/

  // EXAMPLE 3
  // USING USESTATE WITH ARRAYS

  const [items, setItems] = useState(["Apples", "Oranges"]);

  const addItem = () => {
    setItems([...items, "Bananas"]); // Add 'Bananas' without mutating the original array
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Bananas</button>
    </div>
  );
}
export default useStateFile;

/* 
COMMON INTERVIEW QUESTIONS

Q: Can useState take a function as an initial value? 
A: Yes, if the initial state is expensive to calculate, you can pass a function to useState. 
React will call this function only once (on the initial render), and the result will be used as the initial state.
For eg: const [count, setCount] = useState(() => calculateInitialValue());

Q: How does useState work behind the scenes? 
A: React keeps track of state for each component using a hook array. Each time the component re-renders, React calls the hooks in the same order they were initialized.

Q: What’s the difference between setState in class components and useState in functional components? 
A: In class components, setState merges the new state with the existing state, while in useState, you need to manage the merging manually when using complex state (like objects).

Q: Is useState synchronous? 
A: No, useState updates are asynchronous. React batches updates for better performance and re-renders the component after the state is updated.

*/

/* 

Advanced and Edge Case Scenarios:
1. Lazy Initialization of State:
Q. What is lazy initialization with useState, and when would you use it?
A. Normally, when you pass an initial value to useState, it's calculated on every render. 
In cases where the initial value is computationally expensive (e.g., a heavy computation or data fetching), 
you can pass a function to useState to avoid recalculating it on every render.

For eg:- const [count, setCount] = useState(() => expensiveComputation());
Here, expensiveComputation() will only run once (on the initial render), not on every re-render. This is called lazy initialization.


2. State Updates with Closures:
Q. What happens when state updates rely on the previous state?
A. 
const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount(count + 1); // Might not always work as expected due to stale closure
};

The above code may not work as expected if setCount is called multiple times rapidly (e.g., in a loop or async operation). 
Instead, you should use the functional form of setState when updating the state based on the previous state:

const handleIncrement = () => {
  setCount(prevCount => prevCount + 1); // Using the previous state
};

Why this matters:

React batches state updates, and using prevState ensures you always work with the latest state, especially in asynchronous scenarios like event handlers or useEffect.


3. Batching State Updates:
Q. How does React batch multiple state updates, and how does it affect useState?

A. React will batch multiple state updates within event handlers and apply them in a single re-render for performance reasons.

const [count, setCount] = useState(0);
const [name, setName] = useState("John");

const handleClick = () => {
  setCount(count + 1);
  setName("Jane");
};

In this case, React batches the updates to count and name, and the component re-renders only once. 
However, if you're making updates outside of event handlers (e.g., in setTimeout), React might not batch the updates, leading to multiple re-renders.

Why this matters:

Batching improves performance by avoiding unnecessary re-renders, but you need to be careful about when and where you update state.


4. Asynchronous Behavior of useState:
Q. Why doesn’t useState update the state immediately?

A. This is a common beginner question. State updates in React using useState are asynchronous because React batches updates for performance reasons. 
When you call setState, the update doesn’t happen immediately. Instead, React schedules a re-render and updates the state in the next render cycle.

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Logs the old value because the update hasn't happened yet
};

How to handle this:

Use useEffect or callback functions if you need to perform actions after the state has been updated.


5. Multiple useState Calls and Performance Considerations:
Q. What happens when you have multiple useState calls? Does it affect performance?

A. Multiple useState calls in a component are perfectly fine and won't significantly affect performance. 
React keeps track of the order in which hooks are called, and it can handle multiple useState hooks efficiently.
Why this matters:
The order in which useState calls are made is important. React relies on this order, so you can't conditionally call hooks. 
If the order of hooks changes between renders, React will throw an error.

Q: Can you explain the concept of closures in React hooks? How does useState interact with closures?
A: React functions use closures, meaning they capture the variables (like state) at the time the function was created. 
This is why setCount(count + 1) may not work correctly in event handlers if count is stale. 
The proper way is to use the function form: setCount(prevCount => prevCount + 1).
*/
