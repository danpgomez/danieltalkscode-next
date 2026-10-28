---
title: "The great power of .with"
date: "2021-03-12"
featuredImage:
    src: "./images/avengers-ironman-ryan-yoo.jpeg"
    alt: "Photo by Ryan Yoo on Unsplash"
---

And now we've come to the last of the Kotlin scope functions in our journey: [`with()`](https://kotlinlang.org/docs/scope-functions.html#with). The context object is passed in as an argument to it, but inside the corresponding lambda you can access it as a receiver using the keyword `this`. Additionally, `with` as it turns out, is not an extension function, and it has two neat uses.

The first is to use the given object to perform a set of calculations or tasks and return the result. For example, let's say I had a list of users and wanted to sort the list and then print certain properties from each user. I could do something like this.

```kotlin

data class Avenger(
    val alias: String,
    val realName: String,
)

fun main() {
    val avengers = mutableListOf(
        Avenger("Captain America", "Steve Rogers"),
        Avenger("Black Widow", "Natasha Romanoff"),
        Avenger("Iron Man", "Tony Stark"),
        Avenger("Scarlet Witch", "Wanda Maximoff"),
    )

    with(avengers) {
        this.sortBy { it.alias }
        this.forEach { println("${it.alias}: ${it.realName}") }
    }

    // Black Widow: Natasha Romanoff
    // Captain America: Steve Rogers
    // Iron Man: Tony Stark
    // Scarlet Witch: Wanda Maximoff
}
```

A second neat option for using `with()` that is outlined in the [official documentation](https://kotlinlang.org/docs/scope-functions.html#with) is create a helper object and use its properties and methods to calculate a value. For my example, I'll pretend that there was a tournament between all the Avengers and the first person on the list was the winner. I could write the following.

```kotlin

  val tourneyResults = with(avengers) {
       "${first().alias} won the tournament over ${last().alias}"
   }

    println(tourneyResults)
    // Black Widow won the tournament over Scarlet Witch
```

I know what you're thinking, those are some pretty controversial tourney results 😆. But regardless, it's an awesome use case.

Lastly, this article would not be complete without the following joke.

```kotlin

val greatPower = "great responsibility"
with(greatPower) {
    println("With great power comes $this")
}
// With great power comes great responsibility
```

 

![Spiderman](https://media.giphy.com/media/hW4pOhW4dK7JI7hFno/giphy.gif)

