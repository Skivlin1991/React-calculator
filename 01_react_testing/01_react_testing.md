# Testing React Components

**Lesson Duration**: 60 minutes

### Learning Objectives

- Understand what React testing library is and how to use it
- Be able to unit test properties and methods.

## Intro

In this lesson we are going to learn how to test React components.

We will test in 2 ways:

- Unit testing - Test our components and functions work properly.
- e2e testing - Test the full app to make sure it renders correctly in the browser.

Testing in this way will increase confidence in the code that you write and for a lot of develpoment teams it is a requirement. It also ensures that any changes made to the code won't break anything as the tests are normally ran before any build is released.

### Unit testing with React Testing Library.

We will be using Reacts in-built testing library for our unit tests. It is used in conjunction with Jest, which is a JavaScript testing framework that allows the developer to test API calls, mockups and UI components. (Note that can also be used without Jest)

The structure of the tests is very similar to `Mocha`.

The React Testing Library is a DOM testing library, which means that instead of dealing with instances of rendered React components, it handles DOM elements and how they behave in front of real users.

Some key things to remember when using these tools are:

`it`: describes the test itself. It takes in the name of the test and a function that perfroms the actual test.

`expect`: the condition that the test needs to pass. In our case React testing library will give us access to matcher methods used to compare our expected result.

`matcher`: a function that is applied to the expected condition.

`render`: the method used to render a given component.

`snapshot`: allows us to save the structure of a given component at any point in time and use it to compare for any changes.


## Creating our first test

> Download and open the start point and do an `npm install`

Let's write our first test. Go to the `tests` folder and open `App.test.js`. This naming convention is important. When we run the script `npm test`, React will look in our tests folder for files with a `.test.js` or `.spec.js` extension. This is how it knows which test files to run.

In `App.test.js` we will import a few things.

```js
// App.test.js

import React from 'react'; // ADDED
import {render} from '@testing-library/react' // ADDED
import App from '../App'; // ADDED

```

Here we are importing React as usual along with the component we want to test. But we are also importing a method from the testing library. `render` is what we will use to essentially mount the component so that we can access DOM nodes like we would normally in a browser.

`render` returns us a number of useful methods to use in our tests which we will look at throughout this lesson. To render our component we pass in `JSX` like we normally do in our React components.

Next we will actually render our method and use destructuring to get back a Fragment of the mounted component. We will use the `asFragment` method that is returned as part of `render`.

```js
// App.test.js

import React from 'react';
import {render} from '@testing-library/react'
import App from '../App';


describe('App', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<App />)
    })
}) // ADDED
```

Now that we have our fragment back we can basically take a snapshot of the App component and make sure that matches our Fragment. (This will become clearer in a moment when you actually see the snapshot).

We will use a `matcher` method to check this. This method is called `toMatchSnapshot`

```js
// App.test.js

import React from 'react';
import {render} from '@testing-library/react'
import App from '../App';


describe('App', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment(<App />)).toMatchSnapshot() // ADDED
    })
})
```

Now to run the test, open terminal and in the root of the project run `npm test`.

As a result, it will create a new folder `__snapshots__` and a file `App.test.js.snap` in the src which will look like this:

```js
exports[`App should render react link 1`] = `
<DocumentFragment>
  <div
    class="App"
  >
    <h1
      data-testid="counter"
    >
      0
    </h1>
    <button
      data-testid="button-up"
      id="button-up"
    >
       Up
    </button>
    <button
      data-testid="button-down"
      id="button-down"
    >
      Down
    </button>
    <div>
      <h2>
        Country Container
      </h2>
      <select
        data-testid="country-selector"
        id="country-selector"
      >
        <option
          disabled=""
          selected=""
          value="default"
        >
          Choose a country...
        </option>
      </select>
      <button
        data-testid="favourite-button"
        id="favourite-button"
      >
        Add to Favourites
      </button>
    </div>
  </div>
</DocumentFragment>
`;
```

As you can see this matches our DOM structure in `App.js`. (Note that it renders elements from child components as well)

You will also see that the test runner is now watching. That means if our files change the tests will run again automatically.

(Note that if we were to modify the DOM structure in any way we would need to update our snapshot. This can be done by simply pressing `u` in our terminal while the test runner is watching.)

Snapshots can be useful mainly when you want to make sure your UI does not change unexpectedly. When we are initially developing apps we will be making multiple modifications so we normally wouldn't create snapshots at this point. This would normally be done once the App is developed and about to go live.

Exit the test runner by pressing `q` in the terminal.

## Testing DOM elements.

Take a while to have a look at the code in the project. It is an application with a few moving parts that we will be testing. There is a counter with 2 buttons and a countries section with a drop down. We will be testing the different components in slightly different ways to give you a broad overview of the testing strategies.

Take a particular look at the `Counter.js` and `Countries.js` files in the `components` folder.

## Knowing what to unit test

The most common question about unit testing components is "what exactly should I test?"

For unit testing we will test the methods that we have written and their effect on the data.

For end to end testing we will test the events and the effect on what is rendered in the UI.

We should always start here by identifying the business logic in our app.

For `Counter.js` we will check:

Unit Tests:

- It should start the coutnter state at 0.
- It should be able to increment and decrement the counter

For `Countries.js` we will check:

E2E tests:

- It should render a dropdown of countries
- On change it should display a selected country.
- On button click it should display the selected country in a favourites list.


## Setting up a unit test

In order to test our app component we will have to render the component and get back a container which will then allow us access to our DOM elements. (Similar to how we accessed using `querySelector` in vanilla JS).

React testing best practice says that we should assign our DOM elements a `data-testid` property to allow the test to access them via the container.

In `Counter.js` you will see that we have done this for our H1 and both buttons.

> There are other ways to access elements such as assigning a `role` property, or by text, labels etc.

> These query methods are detailed [here](https://testing-library.com/docs/queries/about/)

Lets start off by rendering our `Counter` component. As we will have multiple tests it is better to render in a `beforeEach` method to make sure our component is reset before each test is ran.

Open `Counter.test.js`. You will see we have started to write the 3 tests we will need.

```js
// Counter.test.js

import Counter from '../components/Counter'
import { render } from '@testing-library/react';

describe('Counter', () => {

    let container; // ADDED
    beforeEach(() => {
     container = render(<Counter />);
    }) // ADDED

    it('should have a counter equal to 0', () => {
    });

    // NO CHANGE

})
```

Now in our `beforeEach` block we have rendered the Counter component. When we call render we are returned a container which holds our mounted component. This gives us access to the DOM elements in the component. We can also call methods that render gives us as well.

Lets complete our first test. We will access the container and find the `H1` by it's test id. We will then make sure that the text content is `0`

To find the element we will call a method `getByTestId` on our container and passing in the id assigned to the element.

```js
// Counter.test.js

 it('should have a counter equal to 0', () => {
    expect(container.getByTestId('counter')).toHaveTextContent(0); // ADDED
  });
```

And now let's run `npm test` in terminal again.

Awesome our tests are passing!


## Testing events

Next we will test that the state is updated when we increment or decrement the count using the buttons. (Essentially we are testing the result of calling the 2 methods inside our component)

In order to simulate a button click to trigger the method call we will need to import another object from react testing library. This object is called `fireEvent`. In this object we have a number of methods to represent the various events that could be triggered; `click`, `change`, etc.


Let's start by modifying our import

```js
// Counter.test.js
import { render, fireEvent } from '@testing-library/react'

```

Now lets add to our increment test and trigger the click event on the up button.

To do this we will again access the element using `getByTestId` and pass it on the `click` trigger.

```js
// Counter.test.js

it('increments counter', () => {
    fireEvent.click(container.getByTestId('button-up'));
  });

```

And now we can check that the H1 element has the text `1`.

```js
// Counter.test.js

it('increments counter', () => {
    fireEvent.click(container.getByTestId('button-up'));
    expect(container.getByTestId('counter')).toHaveTextContent('1');
  });
```

When we save these changes our test runner should trigger again and we should now have 3 passing tests! (1 test from App and 2 from Counter)

### Task

Complete the test to decrement the counter. You should expect the H1 to have the text `-1`.


<details>
<summary>Solution</summary>

```js
// Counter.test.js

it('decrements counter', () => {
    fireEvent.click(container.getByTestId('button-down'));
    expect(container.getByTestId('counter')).toHaveTextContent('-1');
  });
```
</details>

And that is us! We can test any event and the effect that it has on the state of our component.

Ideally we should be testing that our state is set correctly initially and any methods we write that will modify the data or DOM components.

Next we will look at e2e testing to make sure that our UI is displayed correctly.

## Recap

What are some of the advantages of testing?

<details>
<summary>Answer</summary>
Tests help a developer think about how to design a component, or refactor an existing component, and are often run every time code is changed. It also instils confidence in your code.
</details>

<br />

## Conclusion

Now that we can test our React components there is no stopping us!

A good mindset to have when testing components is to assume a test is necessary until proven otherwise.

Here are the questions you can ask yourself:

- Is this part of the business logic?
- Does this directly test the inputs and outputs of the component?
- Is this testing my code, or third-party code?
