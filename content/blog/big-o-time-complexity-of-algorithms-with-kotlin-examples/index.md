---
title: "Big O: Time Complexity of Algorithms with Kotlin examples"
date: "2021-04-07"
featuredImage:
    src: "./images/big-o-banner.png"
    alt: "Big O: Time Complexity of Algorithms with Kotlin examples"
---

One of the most fundamental and important topics I've come across on my journey to become a better engineer and improve my ability to write good scalable code is the subject of Big O. And while there are certainly many excellent resources online that provide great explanations and examples, I wanted to take this opportunity to create a simple reference using Kotlin to give myself some practice as well as help others who might also find this useful.

## What is Big O notation?

The [Fireship.io](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) YouTube channels is one of my favorites to follow, and while it doesn't specifically focus on Android or Kotlin, it does provide concise and helpful explanations. This is probably one of the best and simplest explanations of Big O that I've seen.

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fg2o22C3CRfU&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dg2o22C3CRfU&amp;image=http%3A%2F%2Fi.ytimg.com%2Fvi%2Fg2o22C3CRfU%2Fhqdefault.jpg&amp;key=61d05c9d54e8455ea7a9677c366be814&amp;type=text%2Fhtml&amp;schema=youtube" width="854" height="480" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

As you saw in [Jeff Delaney's](https://developers.google.com/community/experts/directory/profile/profile-jeff_delaney) video, Big O notation is...

> "A way to describe how well an algorithm performs as its input size grows."

Additionally, Jeff's video above explains that Big O can be used to measure both "time complexity" and "space complexity" of an algorithm. However, for this article I'm going to focus specifically on **time complexity** (the amount of time that an algorithm takes to perform) and I'll leave space complexity for a separate article.

## How do you calculate the Big O of an algorithm?

This [awesome article by Maxwell Harvey Croy](https://medium.com/dataseries/how-to-calculate-time-complexity-with-big-o-notation-9afe33aa4c46) provides the following five steps:

1. Break your algorithm/function into individual operations
2. Calculate the Big O of each operation
3. Add up the Big O of each operation together
4. Remove the constants
5. Find the highest order term — this will be what we consider the Big O of our algorithm/function

Let's combine this with an excellent video from Gayle Laakmann McDowell, author of Cracking The Coding Interview, that provides a great visual explanation along with several helpful tips and guidelines to use when performing Big O calculations.

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fv4cd1O4zkGw%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dv4cd1O4zkGw&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fv4cd1O4zkGw%2Fhqdefault.jpg&amp;key=61d05c9d54e8455ea7a9677c366be814&amp;type=text%2Fhtml&amp;schema=youtube" width="854" height="480" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

In the video Gayle mentions these four helpful guidelines to calculate the time complexity of an algorithm and I've added Kotlin examples for each below.

### 1\. Different steps get added

```kotlin
// O(a + b) - Different steps get added
val sweets = listOf("🍩", "🍭", "🍫")
val veggies = listOf("🍅", "🥦", "🥕")

fun printFoods(list1: List<String>, list2: List<String>) {
    list1.forEach { println( it ) } // O(a)
    list2.forEach { println( it ) } // O(b)
}
```

### 2\. Drop constants

```kotlin
// Drop constants
val numbers = listOf(1, 2, 3, 4, 5)
fun findMinAndMax(list: List<Int>): List<Int> {
    val min = list.minOrNull() ?: 0 // O(n)
    val max = list.maxOrNull() ?: 0 // O(n)
    return listOf(min, max)
}
// O(2n) gets simplified to O(n)
```

### 3\. Different inputs? Use different variables to represent them

```kotlin
// O(a * b) - Different inputs = Use different variables
val bugsA = listOf("🐝", "🐛", "🦋", "🐞")
val bugsB = listOf("🪲", "🪰", "🐞", "🦗")

fun similarBugs(groupA: List<String>, groupB: List<String>): Int {
    var count = 0
    groupA.forEach { bugA -> // O(a)
        groupB.forEach { bugB -> // O(b)
            if (bugA == bugB) {
                println(bugA)
                count++
            }
        }
    }
    return count
}
```

### 4\. Drop non-dominant terms

```kotlin
// Drop non-dominant terms
val numbers = listOf(1, 2, 3, 4, 5)

fun crazyFunction(list: List<Int>) {
    // Step 1: O(n)
    val max = list.maxOrNull() ?: 0
    println(max)

    // Step 2: O(n^2)
    list.forEach { num1 -> 
        list.forEach { num2 -> 
            println("$num1, $num2")
        }
    }
}
// O(n + n^2) gets simplified to O(n^2) which is the dominant term
```

## Basic Examples in Kotlin

While doing research for the best definitions and examples I gathered inspiration from these two articles:

- [An Easy-To-Use Guide to Big-O Time Complexity](https://medium.com/@ariel.salem1989/an-easy-to-use-guide-to-big-o-time-complexity-5dcf4be8a444)
- [Time & Space Complexity in Functions – Big O Notation](https://moducode.com/blog/time-space-complexity-functions-big-o-notation/)

### O(1) - Constant Time

The runtime of the algorithm is always the same, no matter the input size. In the example below the size of the `characters` array does not matter as we will always be returning the first element from it.

```kotlin
// O(1) - Constant Time

val characters = arrayOf("donkey kong", "zelda", "mario", "pac-man")
fun firstInLine(line: Array<String>): String {
    return line[0]
}
```

### O(n) - Linear

The runtime of the algorithm is directly proportional to the size of the inputs. In the example below the size of the `desserts` array determines the run time of the algorithm since we'll need to iterate through each element within it.

```kotlin
// O(n) - Linear Time Complexity

val desserts = arrayOf("cinnamon", "cinnamon roll", "flan")
fun contains(array: Array<String>, myFavorite: String) {
    array.forEach {
      if (it == myFavorite) println("Yas! $it is my fave!")
    }
 }
```

### O(log n) - Logarithmic

The runtime of the algorithm is directly proportionally to the logarithm of the input size (most often the algorithm runtime will drop by half of it's input size). (Side note: If you're like me and need a quick refresher on logarithms check out [this video](https://youtu.be/up21mvokyQ4) 🤓).

```kotlin
// O(log n) - Logarithmic
fun halfToZero(input: Int) {
    var i = input
    var operations = 0
    while (i > 0) {
        i /= 2
        println("i is now = $i")
        operations++
    }
    println("$operations total operations")
}

halfToZero(40) // 6 total operations
halfToZero(400) // 9 total operations
halfToZero(4000) // 12 total operations
```

### O(n log (n)) - Log Linear

As mentioned in the [article by Moducode](https://moducode.com/blog/time-space-complexity-functions-big-o-notation/) above Log Linear is a cobination of both _linear_ and _logarithmic_ time. This means that "every instance of **n** must be processed in a **log n** algorithm".

```kotlin
// O(n log n) - Log Linear
val numbers1 = listOf(1, 2, 3, 4, 5)
val numbers2 = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
val numbers3 = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)

fun logLinear(input: List<Int>) {
    var operations = 0
    for (item in input) {
        var i = item
        while (i > 0) {
            i /= 2
            println("i is now = $i")
            operations++
        }
    }
    println("$operations total operations")
}

logLinear(numbers1) // 11 total operations
logLinear(numbers2) // 29 total operations
logLinear(numbers3) // 45 total operations
```

### O(n^2) - Quadratic

The runtime of the algorithm is directly proportional to the square of the size of the inputs. For this example we compare all elements within the array with all elements, thus squaring the number of inputs.

```kotlin
// O(n^2) - Quadratic Time Complexity

val numbers = arrayOf(1, 2, 3, 4, 5)
fun printPairs(collection: Array<Int>) {
    collection.forEach { num1 ->
        collection.forEach { num2 ->
            println("$num1, $num2")
        }
    }
}
```

### O(2^n) - Exponential

The runtime of the algorithm doubles 😵 with each addition to the input data set. [This excellent article](https://developerlife.com/2018/08/16/algorithms-in-kotlin-1/#o2n) also provides the example below as well as a visual representation of the call stack for this algorithm.

```kotlin
// O(2^n) - Exponential
fun fibonacci(number: Int): Int {
    return if (number < 1) {
        number
    } else {
        fibonacci(number - 1) + fibonacci(number - 2)
    }
}
```

### O(n!) - Factorial

The runtime grows in proportion to the product of all numbers included. This one definitely deserves it's own article. However, for reference, one of the most commonly mentioned problems that runs in O(n!) is the [Traveling Salesman](https://en.wikipedia.org/wiki/Travelling_salesman_problem) problem and I found [this neat repo](https://github.com/thomasnield/traveling_salesman_demo) by [Thomas Nield](https://github.com/thomasnield) that uses multiple algorithms to solve it 🤩.

* * *

Thank you for reading and I hope you found these examples useful. Additionally, if you notice any mistakes or information you feel I should add please leave me a comment. I welcome any feedback as it helps me learn.

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgiphy.com%2Fembed%2FDwrnYsZCXspu8%2Ftwitter%2Fiframe&amp;display_name=Giphy&amp;url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FDwrnYsZCXspu8%2Fgiphy.gif&amp;image=https%3A%2F%2Fi.giphy.com%2Fmedia%2FDwrnYsZCXspu8%2F200.gif&amp;key=61d05c9d54e8455ea7a9677c366be814&amp;type=text%2Fhtml&amp;schema=giphy&amp;wmode=opaque" width="435" height="183" scrolling="no" title="Giphy embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>
