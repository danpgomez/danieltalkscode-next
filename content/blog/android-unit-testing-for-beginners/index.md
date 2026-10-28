---
title: "Android Unit Testing for Beginners"
date: "2024-01-29"
featuredImage:
  src: "./images/unit-testing.png"
  alt: "Android Unit Testing for Beginners"
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/O8lBbmAj5Ac?si=h7udua07gejgoRbK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Let’s write some Unit Tests! Hello, Daniel here, and in this video we’ll begin to explore how to write Unit Tests for a ViewModel class that uses LiveData and Coroutines. You’ll learn how to setup your project with the necessary and a few handy dependencies as well as how to best structure your tests for efficiency and readability.

## The TodosViewModel
Let's add a unit test to our [Important Todos App](https://github.com/danpgomez/ImportantTodos) starting with the TodosViewModel.kt file. This file is responsible for the state and business logic of our TodosFragment.kt file. In other words, the TodosFragment.kt is constantly monitoring the changes in the TodosViewModel.kt in order to know when it should perform some of its actions, such as display the list of Todo items or navigate to the details fragment when the user taps on one of the items in the list.

In our TodosViewModel.kt we can see that it has three methods that we can test and that we are getting the list of Todo items using the **dao.getAll()** function and storing that list inside of the **todos** property. Additionally, we have a **newTodoTitle** property that just gets initialized with an empty string. And as a reminder, we update the value of this property directly from the **fragment_todos** XML layout file using DataBinding whenever the user creates a new Todo item.

## Dependencies
To write our first unit test, we'll need some additional tools. Let's open our build.gradle file and add the following dependencies:

- **JUnit4**: Should already be included with the project, so we'll just make sure it's there.
- **Truth**: This is an assertion library which will make our tests more readable.
- **MockK**: A mocking library for Kotlin. We'll need to create a mock version or our DAO object to give to the TodosViewModel to make sure we only focus on testing the functionality of the TodosViewModel and not the DAO.
- **Arch Core**: Has helper functions to test things like LiveData, which we're using in the properties of our TodosViewModel.

```kotlin
dependencies {
    testImplementation 'junit:junit:4.13.2' // The testing framework
    testImplementation "com.google.truth:truth:1.2.0" // Assertion library
    testImplementation 'io.mockk:mockk:1.13.8' // Kotlin mocking library
    testImplementation 'androidx.arch.core:core-testing:2.2.0' // Utilities for LiveData testing
}
```
_Also, don't forget to sync your project's Gradle files afterwards._

## Generate A Test
Now we can open up our TodosViewModel.kt file, and right click anywhere in the editor, or use the keyboard shortcut Control + N, and select "Generate" and then "Test". In the popup that opens, make sure JUnit4 is selected and click "Ok", then in the "Destination" screen, make sure the test is being added to the "unitTest" directory and not the "androidTest" one and click "Ok".

Android Studio will generate a test file and place it in the correct directory for you. Now we can begin writing our test by first declaring an **instantTaskExecutorRule** at the top of the file.

```kotlin
@get:Rule
val instantTaskExecutorRule = InstantTaskExecutorRule()
```
When we test functions that deal with LiveData, which is a way to manage and observe data changes in Android apps, these operations can take some time to finish since they happen asynchronously. The **instantTaskExecutorRule** ensures that when we run our tests, the tasks related to LiveData happen immediately and in order. This way, our tests get the data they need exactly when they expect it.

For the next step, remember that we're only testing the TodosViewModel functionality right now. But when this view model class is created, it needs a DAO object, and it makes a call to the dao.getAll() method. We need to create fake, or mock, instances of these and a real version of our view model to test it. Let's create three variables as follows:

```kotlin
@MockK
private lateinit var testDao: TodosDao // Notice the @MockK annotation that creates a mock instance of the TodosDao here
private lateinit var todosViewModel: TodosViewModel // Real instance of the view model we're going to test
private val emptyLiveDataList = MutableLiveData<List<Todo>>() // An empty MutableLiveData list which we'll use to mock the call to dao.getAll()
```
Now we can create a **setup()** function that will:

initialize our mock **testDao** (using the MockKAnnotations.init function)
declare to our program that the **dao.getAll()** call needs to always return an emptyLiveDataList in our tests
and it will create an instance of our TodosViewModel using the mocked DAO we created earlier.

```kotlin
@Before
fun setup() {
  MockKAnnotations.init(this)
  every { testDao.getAll() } returns emptyLiveDataList
  todosViewModel = TodosViewModel(testDao)
}
```
We'll also annotate this setup function with **@Before** to make sure it gets called before each of our tests so that it can perform these setup steps for each test.

## Write Your First Test
Now we're ready to write our first test, and so we'll use the @Test annotation and write a new function below it. Since this is a Unit test Kotlin allows us to write the name of the function either using camel case, which is the usual way we write function names, or as a full sentence using backticks around it. This is pretty handy because it makes our tests more readable.

For this first test, we're going to check that the **onTodoItemClicked()** method from the ViewModel changes the value of the **navigateToTodo** property to the value of the **todoId** we give it. We can write our test using the "Given, When, Then" pattern which helps to improve our test readability and structure. This means that our test basically reads like a paragraph in English:

“Given we have a **todoId** of 1, When we call the onTodoItemClicked method with that ID value, Then we assert that the value of navigateToTodo is equal to that ID we provided”.

```kotlin
@Test
fun `onTodoItemClicked sets todoId LiveData`() {
// Given
val todoId = 1L

// When
todosViewModel.onTodoItemClicked(todoId)

// Then
assertThat(todosViewModel.navigateToTodo.value).isEqualTo(todoId)
}
```
There you have it! Our first Unit test! Well done! 🎉

Using the same structure we can now add another test for the **onTodoItemNavigated** to make sure that the **navigateToTodo** property's value gets reset back to **null**. This test will read as:

“Given the onTodoItemClicked method is called with a value of 1L, When onTodoItemNavigated is called, Then we assertThat the value of navigateToTodo is **null**".

```kotlin
@Test
fun `onTodoItemNavigated resets the navigateToTodo value to null`() {
// Given
todosViewModel.onTodoItemClicked(1L)

// When
todosViewModel.onTodoItemNavigated()

// Then
assertThat(todosViewModel.navigateToTodo.value).isNull()
}
```
That’s two tests down! Well done! 👏

## Testing Coroutines
Now let's add a test for one of the most important parts of the TodosViewModel, which is adding Todo items to the database. This uses the ****addTodo**** function from the view model which needs to execute the **insert** function from the TodosDAO file. And because the operations from the database need to happen asynchronously, we run this code inside of a coroutine. And so to test the **addTodo** method we'll need to add the Coroutines Test library to the dependencies in our build.gradle file. This gives us some handy utilities for testing coroutines such as the **runTest** function.

```kotlin
testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.0-RC2'
```
Now one of the main goals when writing tests is that they should be deterministic. Which means that if we give them the same initial conditions the results of the tests should be the same. However, since coroutines run asynchronously the time they take to execute can vary. To make this duration more consistent for testing, we can use something called a TestDispatcher. So back in our test file we can create a new variable and use the function StandardTestDispatcher that we got from our Coroutines Test library to create a new TestDispatcher.

```kotlin
private val testDispatcher = StandardTestDispatcher()
```
Then, inside of our **setup()** method we can set the dispatcher for our tests using:

```kotlin
@Before
fun setup() {
  MockKAnnotations.init(this)
  Dispatchers.setMain(testDispatcher)  👈
  every { testDao.getAll() } returns emptyLiveDataList
  todosViewModel = TodosViewModel(testDao)
}
```
And we also want to add a **teardown()** method, and annotate it with @After so that it runs after all tests in our file. Inside this function we can reset the dispatcher back to the original Main dispatcher:

```kotlin
@After
fun teardown() {
  Dispatchers.resetMain()
}
```
Now we can write our test. Here, we want to validate that the **dao.insert()** function gets called only once. This is going to make sure that our **addTodo()** method is working as expected. So our test is going to first declare what our expected behavior is. We're going to use this **coEvery** function from our MockK library to declare that every time we call **dao.insert()**, and we pass it any type of object, this method **just runs**. Then we're going to create a new title for our Todo object using a random string value such as "Make testing YouTube videos". And we're going to assign it to the **newTodoTitle** property in the "TodosViewModel". Then I'm going to launch a coroutine scope, and then I'm going to call "**addTodo()**". This should create a new "Todo" object with the title that we just provided. We then need to call "advanceUntilIdle()" function to make sure that the operation of adding the Todo to the database completes before we do the verification.

Now, we can write our assertion using "coVerify", which is also from our MockK library and is used for testing coroutines. This allows us to assert that the dao.insert() gets called exactly one time when we call the "addTodo()" method.

Finally, we can click the Play button at the top of our class to run all of our tests.

## Conclusion
Hopefully this was a brief but helpful introduction into Unit Testing on Android. I highly recommend using libraries such as MockK for mocking, Truth for assertions, and the Given-When-Then pattern to make test writing easier and improve the readability and structure of your tests.

Stay tuned for my next video where we’ll discuss testing the Data Access Object and the interactions with our Room database.

Thanks for reading! Take care!
