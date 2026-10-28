---
title: "A Brief Overview of Android Automated Testing"
date: "2024-01-21"
featuredImage:
  src: "./images/android-testing-blue.png"
  alt: "A Brief Overview of Android Automated Testing"
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/d8FrwMZs74s?si=RxfpBbXrmBMeYCKR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I recently got a great suggestion in a comment to create a video about automated tests for Android. However, because this is such a broad topic, I decided to create a playlist where I'll begin by covering some of the main test types and perhaps, as time passes and I learn more tips and tricks related to automated testing, I'll go ahead and add more videos to this list.

In this video we'll begin exploring some of the main types of tests and their purpose, starting with...

## Why write automated tests in the first place?
Well first, they help us prevent previously written code from breaking, which is known as a regression, and they also serve as documentation for our code. This means that a new team member can read through the tests to figure out how our program is intended to work.

## The 3 Main Types of Tests We'll Cover
### Unit Tests
These evaluate the smallest pieces of code that can be isolated and tested. As an example, if we were building a calculator app, a unit would be something like the addition function which takes two numbers and adds them together. These tests are typically considered more cost-effective and easier to implement and so it is recommended to try to cover as many possible units in your code with these tests. On Android we usually write unit tests with frameworks like JUnit and use mocking libraries like MockK or Mockito.

### Integration Tests
These test that the different components of our program work correctly when combined. For example, if we had a weather app that displayed the current weather conditions as well as a forecast for the upcoming days, an integration test could check that when the user selects their preferred location, the current conditions and the forecast show the accurate weather information for that location. This test would potentially cover the connection, or integration, between multiple components such as:

1. accurately saving the user's preferred location
1. fetching weather data for that location
1. and if we switch locations, checking that the weather data is updated correctly

On Android we usually write integration tests with frameworks like Espresso.

### End to End Tests
Speaking of end-to-end tests, these can evaluate an entire screen or user flow from start to finish, simulating real world scenarios. If you imagine that we have a shopping app, an end-to-end test would simulate a customer searching for a product, adding it to the cart, and going through the checkout flow. On Android we usually write end-to-end tests using frameworks like Espresso or Appium.

## Conclusion
Ok, so this was a general overview of the main types of tests we'll be writing in this series. Stay tuned for the next video where we'll begin writing Unit tests for our ImportantTodos app. Thanks so much for watching! Take care!