---
title: "How to solve coding problems"
date: "2025-05-09"
featuredImage:
  src: "./images/rubiks-cube-problem-solving.jpg"
  alt: "Photo by Olav Ahrens Røtne on Unsplash"
categories:
  - "problem-solving"
---

One of the most important skills in programming and software development is problem solving. This is something that I've enjoyed learning more about over the years and that I feel will always be improving. However, as I continue trying to improve my skills on solving coding interview problems, I've decided to dedicate some time to the strategy and concepts of problem solving. Here we go!

## The General Strategy

Most videos and articles I've come across seem to reference the approach outlined in the book ["How To Solve It" by George Polya](https://www.thriftbooks.com/w/how-to-solve-it-a-new-aspect-of-mathematical-method-princeton-science-library_george-plya/261545/#edition=1910486&idiq=4039747):

1. Understand the problem
2. Formulate a plan
3. Execute the plan
4. Look back (Review and Refine)

Let's look at these in detail.

### Step 1. Understand the Problem

Read it multiple times and try to define any terms you don't fully understand, to the point that you should be able to teach the problem to someone else or at least be able to fully explain it in your own words. Additionally, here are some helpful points to keep in mind during this step:

- What are the inputs and expected outputs?
- Restate the problem in simple terms (ie. "I need to convert X into Y").
- If you're having trouble understanding "how" the inputs are transformed manually walk through a test case.
- During interviews ask lots of questions. This can help you catch any edge cases.

### Step 2. Formulate a Plan

Using pseudocode write out each step that you'll take in detail. Don't worry about using any code language specific syntax during this stage since you're essentially "prototyping" your solution. Using plain every-day language focus on how you would convert the given data into the desired output. Separating the "planning/problem solving" part from the "coding" part helps you avoid mistakes and can even help when naming variables and functions later based on what that step of the plan is intended to do. Here are some additional tips to keep in mind:

- Break down the problem into small steps
- Make your own examples and even feel free to draw it out if needed.
- If problem provides any constraints these can hint at what data structure or algorithm to use.
- See if you can refine your pseudocode algorithm before moving on to the implementation step.

### Step 3. Execute the Plan

Now it's time to implement your carefully crafted plan. Do so carefully and line-by-line; don't take any shortcuts. You can also test each line (ie. console.log'ing) as you implement it to ensure you're getting the desired results and avoid costly mistakes down the road. [Alex Mitchell from Expert Beacon](https://expertbeacon.com/how-to-solve-coding-problems-with-a-simple-four-step-method/) suggests "emphasizing correctness over efficiency and clarity over conciseness" during this stage. Make sure the core logic is right before optimizing.

### Step 4. Look Back (Review and Refine)

At this point you've implemented an algorithm that solves the problem. But you're not done yet. Here's when you can go back and look for ways to optimize your solution:

- Optimize for time/space complexity
- Are there edge cases you might've missed?
- Can you improve the code's readability?

### BONUS 🤩: Build a Mental Map of Problems to Solutions

One of the most frequent suggestions I saw in multiple tutorials was to gradually begin building a mental, and even physical, catalog of problems you solve and their respective solutions. This will help you begin recognizing patterns when you encounter new problems. Both [Colin Galen's tutorial](https://youtu.be/1f6N2UrCK6o?si=LMPHtox22oUlZjyr) and [Sahil & Sarra's tutorial](https://youtu.be/43i7fk4V74s?si=0JDqgr_TxMuJa76M) use a similar concepts from the book ["Thinking Fast and Slow" by Daniel Kahneman](https://www.thriftbooks.com/w/thinking-fast-and-slow_daniel-kahneman/247754/#edition=7203718&idiq=10487605) to emphasize the importance of deliberate practice to build up pattern recognition. I've not read this book yet but both of the mentioned tutorials talk about the concept of building up your intuition, or "fast brain" like the book says, in a similar way to how you train an AI model:

1. Feed your fast brain a lot of coding problems.
2. Break down these problems into components that can help you predict patterns.
3. Develop your own library of components (ie. a spreadsheet) by solving more and more problems.

## Real Example

Now it's time to apply our strategy to a real code problem and see if it works. I've chosen the problem titled ["Decoding a Message" from Codewars.com](https://www.codewars.com/kata/565b9d6f8139573819000056) which is relatively simple and will help illustrate the strategy in practice.

### Step 1: Understanding the Problem

After reading the problem once I notice that we're given a string (our encoded message) and need to return a string (our decoded message). We're told that the letters of the given string are paired with the letter in the alphabet when the string is reversed (ie. "a" => "z", "b" => "y" etc). Our task is to write a function that will decode the message. Since we're told that each letter in our provided string "corresponds" to another letter of the alphabet in reverse, I automatically think of using a Map to store the corresponding letters and loop through the string checking each character for it's corresponding letter and building up a new decoded string that will be returned at the end.

Reading the problem a second time I begin to think whether there is a way to avoid building a map of the alphabet. Perhaps using ASCII codes? I'll need to do more research to learn how to do this but my thought is that I can write an equation that gets the current character's code and converts it to the corresponding code and then back to a character. This may be a clever solution but not as straight forward.

Reading the problem a third time I catch one important detail: we must remember spaces as we traverse our string. This makes sense since the string is a message but that means we'll need to add a check for whether each character is a letter or a space. We're also told that we don't have to worry about punctuation or capital letters but there's no mention about the length of the provided string. So we must add a check for an empty string and also account for a super long string and try to avoid unnecessary operations.

To summarize we need to convert each "letter" in a provided string like this:

`"r slkv mlylwb wvxlwvh gsrh nvhhztv"`

To a new string like this:

`"i hope nobody decodes this message"`

### Step 2: Formulate a Plan

I decide to go with my first idea and create a map of each letter to it's corresponding "decoded" letter. Here's my pseudocode.

```js
function decode(message) {
  // if 'message' is empty return
  // create a map of corresponding decoded letters {a: z, b: y}
  // create 'solution' empty string
  // for each 'char' in 'message' string
  // if 'char' is NOT a space
  // find corresponding char in decoded letters
  // add decoded letter to 'solution' string
  // return 'solution' string
}
```

I also came up with my own, very simple example to test each line of my plan before I move on to the implementation phase: `wz y => da b`.

### Step 3: Execute the Plan

A few things I had to look-up when converting the plan to actual code:

- Refresh my memory on using a JavaScript `Map` instead of an `Object`.
  - There's likely an easier way to create this alphabet map.
- How to check if a character is a space or a letter and found this solution:

```js
function isLetter(character) {
  return character.match(/[a-z]/i);
}
```

- I also discovered that I had an error in my pseudocode algorithm 😳 - I wasn't adding the spaces to the solution string. Thankfully I caught it before it was too late, but that should serve as a lesson to not rush into implementation and really review your pseudocode and refine it before moving on.

This was my working solution before revision:

```js
function decode(message) {
  if (message.length < 1) return "";

  const decodedLetters = new Map();
  decodedLetters.set("a", "z");
  decodedLetters.set("b", "y");
  decodedLetters.set("c", "x");
  decodedLetters.set("d", "w");
  decodedLetters.set("e", "v");
  decodedLetters.set("f", "u");
  decodedLetters.set("g", "t");
  decodedLetters.set("h", "s");
  decodedLetters.set("i", "r");
  decodedLetters.set("j", "q");
  decodedLetters.set("k", "p");
  decodedLetters.set("l", "o");
  decodedLetters.set("m", "n");
  decodedLetters.set("n", "m");
  decodedLetters.set("o", "l");
  decodedLetters.set("p", "k");
  decodedLetters.set("q", "j");
  decodedLetters.set("r", "i");
  decodedLetters.set("s", "h");
  decodedLetters.set("t", "g");
  decodedLetters.set("u", "f");
  decodedLetters.set("v", "e");
  decodedLetters.set("w", "d");
  decodedLetters.set("x", "c");
  decodedLetters.set("y", "b");
  decodedLetters.set("z", "a");

  let solution = "";

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    let charToAdd = char;
    if (isLetter(char)) {
      charToAdd = decodedLetters.get(char);
    }

    solution += charToAdd;
  }

  return solution;
}

function isLetter(character) {
  return character.match(/[a-z]/i);
}
```

### Step 4: Look Back (Review and Refine)

This is a super important step that gets often overlooked but it can provide the biggest learning opportunity. Looking back at my solution I can tell that it is not as efficient as it can be and that there are some improvements I can make in terms of readability. Here are some of the changes I made:

- Renamed `char` to `currentChar` for readability.
- Realized that my use of the `Map` could be replaced by:
  - Creating a string of the `alphabet`
  - Creating a reversed copy of that alphabet string
  - Getting the index of the `currentChar` within the `alphabet` and then
  - Looking up the corresponding value in the `reversedAlphabet` using the index from the previous step.
- I also switched my `solution` string to an array because I realized that concatenating to a string within the loop would create a new string every time causing the time complexity of the algorithm to be O(n^2). However, with an array I can push new characters (O(1)) and then convert the array to a string using `.join('')` before returning it at the end of the function. Result: O(n) time complexity with O(n) space complexity for the output string. ✨

Here's my solution:

```js
function decode(message) {
  if (message.length < 1) return "";

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const reverseAlphabet = [...alphabet].reverse().join("");

  let solution = [];

  for (let i = 0; i < message.length; i++) {
    const currentChar = message[i];
    let charToAdd = currentChar;

    if (isLetter(currentChar)) {
      const indexOfCurrent = alphabet.indexOf(currentChar);
      const decodedLetter = reverseAlphabet[indexOfCurrent];
      charToAdd = decodedLetter;
    }

    solution.push(charToAdd);
  }
  return solution.join("");
}

function isLetter(character) {
  return character.match(/[a-z]/i);
}
```

## Conclusion and Lessons Learned

I really enjoyed researching this topic and going through this exercise. Taking time to use a strategy when solving coding problems can be incredibly useful and provide both time saving benefits as well as opportunities to learn in an efficient way. Remember to not rush through each step since this can lead to time consuming errors. I hope you enjoyed this post and would love to hear your thoughts in the comments below. Thanks!
