---
title: "Use .run to init objects and perform calculations in one go"
date: "2021-03-10"
featuredImage:
    src: "./images/back-to-the-future-car-sebastiano-piazzi.jpeg"
    alt: "Photo by Sebastiano Piazzi on Unsplash"
categories: 
  - "kotlin"
---

Continuing our journey through the world of Kotlin Scope Functions we now have [`.run`](https://kotlinlang.org/docs/scope-functions.html#run), which comes in two delicious flavors: as an extension function on the provided object, or as a non-extension function.

## As an Extension Function

This allows us to create an object and use it to compute tasks within the corresponding lambda. You're given the context object as a **receiver** (meaning you use the keyword "this" to access the object and its members) and the returned value is the result of the expressions in the lambda.

```kotlin

class TimeMachine(
    val type: String,
    var fuel: String,
    var destinationYear: Int,
) {
    fun changeFuelType(newFuel: String) {
        fuel = newFuel
    }

    fun changeDestinationYear(year: Int) {
        destinationYear = year
    }
}

fun main() {

    fun timeTravel(timeMachine: TimeMachine, traveler: String): String {
        return "Traveled to ${timeMachine.destinationYear} on the ${timeMachine.type} using ${timeMachine.fuel}"
    }

    val adventure = TimeMachine(
        "DeLorean",
        "plutonium",
        1955,
    ).run {
        changeFuelType("⚡️")
        changeDestinationYear(1985)
        timeTravel(this, "Marty McFly")
    }

    println(adventure)
    // Traveled to 1985 on the DeLorean using ⚡️
}
```

## As a Non-Extension Function

You can also use `.run` as a non-extension function to perform several calculations at once and store the result in a variable. Neat and tidy 😎.

```kotlin

// Average age of the cast when making the first film

val averageAge = run {

    val cast = mapOf(
        "Michael J. Fox" to 28,
        "Lea Thompson" to 24,
        "Christopher Lloyd" to 47,
        "Crispin Glover" to 21,
        "Thomas F. Wilson" to 26,
        "Claudia Wells" to 19,
        "Wendie Jo Sperber" to 27,
    )

    cast.values.average().roundToInt()
}

println(averageAge)
```

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgiphy.com%2Fembed%2FMP1TAcYZI1JqYR9rJp%2Ftwitter%2Fiframe&amp;display_name=Giphy&amp;url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FMP1TAcYZI1JqYR9rJp%2Fgiphy-downsized.gif&amp;image=https%3A%2F%2Fi.giphy.com%2Fmedia%2FMP1TAcYZI1JqYR9rJp%2Fgiphy-downsized-large.gif&amp;key=61d05c9d54e8455ea7a9677c366be814&amp;type=text%2Fhtml&amp;schema=giphy&amp;wmode=opaque" width="435" height="326" scrolling="no" title="Giphy embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>
