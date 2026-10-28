---
title: "The Usefulness of the .let Scope Function"
date: "2021-03-11"
featuredImage:
    src: "./images/lotr-hobbit-thandy-yung.jpeg"
    alt: "Photo by Thandy Yung on Unsplash"
categories: 
  - "kotlin"
---

Another multi-use scope function that Kotlin offers is [`.let`](https://kotlinlang.org/docs/scope-functions.html#let). This is probably the one that I’ve used the most so far, however, I wasn’t aware of its other two benefits. Essentially I've mostly used it when combined with the safe call operator "?" to execute code using its non-null values. However, `.let` can also save you from having to declare additional variables. You are provided the context object as an argument to be accessed with the "it" keyword, and what you get back is the result of the lambda evaluation.

For example, if I received a long string that I wanted to run a set of operations on and later print, I could do something like this.

```kotlin

val characters = "gandalf, gollum, frodo, sam, pippin, merry, aragorn, gimli, legolas"
    characters
        .split(",")
        .map { it.trim(' ') }
        .filter { it.startsWith("g") }
        .let { println(it) }
        // [gandalf, gollum, gimli]
```

Notice that I only declared a single variable called `characters` and then chained multiple operations on it, including printing it to the console. ✨

## Local Scope Variables for Readability

You can also improve code readability by replacing the "it" keyword provided by the `.let` scope function with something more meaningful.

```kotlin

    val travelers = listOf("frodo", "sam", "gollum")
    val meal = travelers.contains("sam").let { samIsCooking ->
        if (samIsCooking) "a delicious stew 🥘" else "lembas bread"
    }

    println("We ate $meal")
    // We ate a delicious stew 🥘
```

## Working with the Safe Call Operator "?"

Lastly, and possibly the most common use case for `.let` is to execute a block of code after checking that an optional value is not `null`. Usually the variable will use the safe call operator "?" in this situation and you can chain the `.let` scope function afterwards as follows.

```kotlin

val theOneRing: String? = "💍"
theOneRing?.let { println("🧙 Keep it secret. Keep it safe") }
```

I hope this shines a light on the many additional uses of the `.let` scope function. If there's anything I missed, please leave me a comment below.

 

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgiphy.com%2Fembed%2FmwqZDaM3PkWc0%2Ftwitter%2Fiframe&amp;display_name=Giphy&amp;url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FmwqZDaM3PkWc0%2Fsource.gif&amp;image=https%3A%2F%2Fi.giphy.com%2Fmedia%2FmwqZDaM3PkWc0%2F200.gif&amp;key=61d05c9d54e8455ea7a9677c366be814&amp;type=text%2Fhtml&amp;schema=giphy&amp;wmode=opaque" width="435" height="190" scrolling="no" title="Giphy embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>
