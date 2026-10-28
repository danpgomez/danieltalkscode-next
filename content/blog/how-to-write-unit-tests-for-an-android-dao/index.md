---
title: "How to write Unit Tests for the Database Access Object on Android"
date: "2024-01-29"
featuredImage:
  src: "./images/dao.png"
  alt: "How to write Unit Tests for the Database Access Object on Android"
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/KI1btlExM50?si=1-aJVLePGyGCZslE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

A DAO is a [Data Access Object](https://developer.android.com/training/data-storage/room/accessing-data) we create that facilitates working with a database. It is a common pattern when working with the Room library on Android.

When it comes to writing Unit Tests for the database Google recommends to use what’s called an in-memory database and execute the tests on an Android device.

```kotlin
val context = ApplicationProvider.getApplicationContext<Context>()
val database = Room.inMemoryDatabaseBuilder(
    context, TestDatabase::class.java).build()
val dao = database.getDao()
```
## Dependencies
In this tutorial we’ll be adding a few Unit Tests for the **TodosDao.kt** file in our [ImportantTodos app](https://github.com/danpgomez/ImportantTodos). We’re going to use the Room Testing library which provides helper methods for testing Room databases, as well as the Kotlinx Coroutines Test library which has helper methods for testing coroutines.

```groovy
dependencies { 
    // Kotlin Coroutines testing support (we added this in the last tutorial)
    androidTestImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.0-RC2'

    // Since this needs to run on an Android device we must add this one to get the RunWith(AndroidJUnit4::class)
    androidTestImplementation "androidx.test.ext:junit:1.1.5"

    // To test LiveData we also need Arch Core
    androidTestImplementation "androidx.arch.core:core-testing:2.2.0"

    // Assertion library for more readable assertions
    androidTestImplementation "com.google.truth:truth:1.2.0"

    // Espresso Core - needed for AndroidJUnit4 runner
    androidTestImplementation "androidx.test.espresso:espresso-core:3.5.1"
}
```
No we can create a **TodosDaoTest** test class within the _app/src/androidTest/java/com/example/importanttodos_ directory. Within the class we can add an InstantTaskExecutorRule() since we’re going to be dealing with LiveData and can also add the variables we’ll need to test: the TodosDao and the TodosDatabase.

```kotlin
private val instantTaskExecutorRule = InstantTaskExecutorRule()
private lateinit var testDatabase: TodosDatabase
private lateinit var testDao: TodosDao
```

Now let’s make sure we have a database instance before each test executes. We can do this by declaring a function that builds the database and annotate it with **@Before**.
```kotlin
@Before
fun createDatabase() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    testDatabase = Room.inMemoryDatabaseBuilder(
        context,
        TodosDatabase::class.java
    ).allowMainThreadQueries().build()
    testDao = testDatabase.todosDao
}
```
Note that for the purposes of testing (and only for testing) we want to allow queries to the database to occur on the Main thread. This is because queries to the database usually happen asynchronously and we also have a few LiveData properties that are updated using the values from those queries. To simplify tests and make sure that our data is available when we expect it within the test in order to make assertions, we allow the database queries to happen on the Main thread.

And we also want to add a function to close the database and annotate it with **@After** so that it is executed after each **@Test** method.

```kotlin
@After
fun closeDatabase() = testDatabase.close()
```
We can now begin to write our first test using [camel snake case](https://www.pluralsight.com/blog/software-development/programming-naming-conventions-explained). For readability we can use the following pattern when writing test function names: <system under test> <expected result> <action taken>. We’ll also want to use the **runTest** function from the **Coroutines Test** library. I’ll first show you the “long” way of writing this test using an **Observer** and then we’ll go over Google’s recommended solution to avoid boilerplate code.

```kotlin
@Test
    @Throws(Exception::class)
    fun database_returnsOneItemAndCorrectTitle_afterInsertion() = runTest {
        val newTodo = Todo(
            1L,
            "Buy chocolate chip cookies 🍪",
            false
        )

        val observer = Observer<List<Todo>> {
            assertThat(it.size).isEqualTo(1)
            assertThat(it.first().title).isEqualTo(newTodo.title)
        }

        testDao.insert(newTodo)
        testDao.getAll().observeForever(observer)
        testDao.getAll().removeObserver(observer)
    }
```
This seems like a simple solution but having to create an Observer each time can get a little tedious. Because of this, Google suggests adding this [LiveDataTestUtil.kt](https://github.com/google/iosched/blob/main/androidTest-shared/src/main/java/com/google/samples/apps/iosched/androidtest/util/LiveDataTestUtil.kt) utility function to your codebase to use in these situations. There’s also a great blog post from Android Developers [here](https://medium.com/androiddevelopers/unit-testing-livedata-and-other-common-observability-problems-bb477262eb04) with the full explanation of this utility. I’ll go ahead and add this to my **androidTest** directory and call it within my test as follows:

```kotlin
@Test
    @Throws(Exception::class)
    fun database_returnsOneItemAndCorrectTitle_afterInsertion() = runTest {
        val newTodo = Todo(
            1L,
            "Buy chocolate chip cookies 🍪",
            false
        )

        testDao.insert(newTodo)

        val todos = testDao.getAll().getOrAwaitValue()
        assertThat(todos.size).isEqualTo(1)

        val insertedTodo = testDao.get(1).getOrAwaitValue()
        assertThat(insertedTodo.title).isEqualTo(newTodo.title)
    }
```
Lastly we can add two more tests using our new **getOrAwaitValue()** util to validate the other methods from our **TodosDao.kt** as follows:

```kotlin
@Test
    @Throws(Exception::class)
    fun database_returnsZeroSize_afterAllItemsDeleted() = runTest {
        val newTodo = Todo(
            1L,
            "Buy peanut butter cookies 🥜",
            false
        )

        testDao.insert(newTodo)
        testDao.delete(newTodo)
        val todosListSize = testDao.getAll().getOrAwaitValue().size
        assertThat(todosListSize).isEqualTo(0)
    }

    @Test
    @Throws(Exception::class)
    fun database_returnsUpdatedTodoItem_afterUpdate() = runTest {
        val newTodo = Todo(
            1L,
            "Buy ice cream 🍦",
            false
        )

        testDao.insert(newTodo)
        newTodo.title = "Buy chocolate ice cream 🍦🍫"
        newTodo.completed = true
        testDao.update(newTodo)
        val updatedTodo = testDao.get(1).getOrAwaitValue()
        assertThat(updatedTodo.title).isEqualTo("Buy chocolate ice cream 🍦🍫")
        assertThat(updatedTodo.completed).isTrue()
    }
```

Hope you enjoyed this tutorial and please let me know if you have any feedback or ideas of other tutorials you’d like to see.

Happy coding! 😎