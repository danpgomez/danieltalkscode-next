---
title: "Quick start guide to writing Espresso UI tests on Android - Android Testing Part 4"
date: "2024-02-09"
featuredImage:
  src: "./images/espresso-testing.png"
  alt: "Quick start guide to writing Espresso UI tests on Android - Android Testing Part 4"
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/_bEfTbAxRHA?si=DsgrCbQ8PijnLa8J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In this tutorial we’ll be going over how to get started writing Android UI tests using [Espresso](https://developer.android.com/training/testing/espresso). We’ll continue adding tests to the [ImportantTodos app](https://github.com/danpgomez/ImportantTodos) repository.

Here are a few useful resources when attempting to write Espresso tests:
- [Layout Inspector documentation](https://developer.android.com/studio/debug/layout-inspector): Useful for finding IDs and attributes of views you’re trying to match.
- [Espresso Basics documentation](https://developer.android.com/training/testing/espresso/basics): Great explanation of the anatomy of an Espresso test as well as some best practices.
- [Espresso Setup documentation](https://developer.android.com/training/testing/espresso/setup): We’ll go over this step by step in this tutorial.

To get started it is recommended to disable animations on your Android Virtual Device to avoid flakiness in your tests. To do this launch your virtual device and go to Settings > Developer Options and disable the following:
- Window animation scale
- Transition animation scale
- Animator duration scale

Next you’ll want to add the following dependencies to your **app/build.gradle** file:

```groovy
androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
androidTestImplementation 'androidx.test:runner:1.5.2'
androidTestImplementation 'androidx.test:rules:1.5.0'
```
Then make sure this line is also listed under the **android.defaultConfig** block of the same **app/build.gradle** file:

```groovy
testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
```
Now it’s time to write our first test. Navigate to the **app/src/androidTest** directory and add a new file called **TodosIntegrationTest.kt**. Within our file we can declare a new class that will contain our tests, add a rule that will launch our MainActivity class, and since our app is so simple, we can essentially write a single integration test that will cover most of the core user flows.

```kotlin
@RunWith(AndroidJUnit4::class)
class TodosIntegrationTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun addTodo_updateIt_and_deleteIt() {
        val originalTitle = "Buy chocolate chip cookies"
        val newTitle = "Buy ice cream"

        // Add list item
        onView(withId(R.id.todo_title)).perform(typeText(originalTitle))
        onView(withId(R.id.todo_save_button)).perform(click())


        onView(allOf(withId(R.id.todo_name), withText(originalTitle)))
            .check(matches(isDisplayed()))
            .perform(click())

        // Update it
        onView(withId(R.id.todo_name)).perform(replaceText(newTitle))
        onView(withId(R.id.update_button)).perform(click())
        onView(allOf(withId(R.id.todo_name), withText(newTitle)))
            .check(matches(isDisplayed()))

        // Delete it
        onView(withId(R.id.todo_name)).perform(click())
        onView(withId(R.id.delete_button)).perform(click())
        onView(withId(R.id.todos_list)).check(matches(not(hasDescendant(withText(newTitle)))))
    }
}
```
This was a brief introduction to using Espresso for writing integration tests on Android. I hope you found it useful and if you have any tips or suggestions please let me know down in the comments. Thank you for reading!
