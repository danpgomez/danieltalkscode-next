---
title: "Morning coffee with Kotlin Coroutines ☕️"
date: "2023-11-20"
featuredImage:
  src: "./images/coroutines-thumbnail.png"
  alt: "Morning coffee with Kotlin Coroutines ☕️"
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/fkw1-nYSnhE?si=ldbX4FOSm5bcmb7s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

When you make breakfast in the morning, do you start your coffee machine and watch it brew the coffee before starting to do any other task? No judgement if you do 😂, but I bet you probably do other things like maybe toast a bagel, heat up milk, feed your dog, and once the coffee is done brewing you make yourself a cup of coffee. Right?

Well that's great, because today I'm going to give you a brief introduction to asynchronous programming using Kotlin coroutines while building a useful script to convert audio files from the WAV format to MP3s.

## What are Coroutines?
Coroutines are a way to write asynchronous code that is both efficient and easy to understand. They allow developers to write code that can be suspended and resumed later without blocking the main thread of operations. This is particularly useful for tasks that involve waiting for external resources, such as file input/output, network requests, or database operations.

If you watched my ToDo list app tutorial, we used Coroutines in the first video to set up our Room Database.

## Why Use Coroutines?
Traditional asynchronous programming often involves callbacks or complex threading mechanisms. Coroutines provide a structured and sequential way to write asynchronous code by alleviating the complexity of nested callbacks and streamlining error handling in asynchronous workflows.

## WAV to MP3 Batch Audio Converter
In this tutorial, I'm going to walk you through how to build a simple program that converts multiple WAV audio files to the MP3 format. You'll simply provide the path to the directory where the files are stored and the path to where you want your converted files to end up. Our AudioConverter will take care of the rest!

### Step 1. Setup
Create a simple Kotlin project. I'm using IntelliJ IDEA Community Edition and for my project settings I've selected the Kotlin language, Gradle as my build system, and Kotlin DSL.

Then go ahead and open the build.gradle.kts file and within the dependencies block, you'll want to declare implementations for Kotlin Coroutines and for the Jave library which we'll use to convert our audio files.

```kotlin
dependencies {   
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")  
  implementation("ws.schild:jave-all-deps:3.4.0")  
}
```
Here are the links to the latest versions of both libraries:

- [Coroutines](https://github.com/Kotlin/kotlinx.coroutines/blob/master/README.md#using-in-your-projects)
- [Jave](https://mvnrepository.com/artifact/ws.schild/jave-all-deps/3.4.0)

_Don't forget to sync your project afterwards._

### Step 2. Using 'suspend' with functions
Within the _src/main/kotlin_ directory, create a new class file called _AudioConverter.kt_ and inside the brackets create a new function called _convertWavToMp3()_. This function should have two arguments of type File - one for the inputDirectory where our WAV files are currently located and another for the outputDirectory where the converted MP3 files will end up.

Because we want to use coroutines inside this function, and want to be able to pause and resume coroutine execution without blocking the main thread, we want to mark this function with the **suspend** keyword. This also allows us to use other coroutines features such as the coroutinesScope builder. You can think of the scope as a stage and each coroutine as an actor performing on that stage independently. We'll use the "launch" block inside the function to signal to our coroutine to begin executing or "performing" their parts.

```kotlin
class AudioConverter {  
    suspend fun convertWavToMp3(inputDirectory: File, outputDirectory: File) = coroutineScope {  
        launch {  
           // Code in here won't block the main thread. 
        }  
    }
}
```

### Step 3. Create Helper Methods
Now let's create three helper methods to set the audio and encoding attributes and process each file. The first method will create an AudioAttributes object and set the codec, bitrate, channels, and sampling rate.

```kotlin
private fun createAudioAttributes(): AudioAttributes {  
    val audioAttributes = AudioAttributes()  
    audioAttributes.setCodec("libmp3lame")  
    audioAttributes.setBitRate(128000) // 128 kbps  
    audioAttributes.setChannels(2)  
    audioAttributes.setSamplingRate(44100)  
    return audioAttributes  
}
```

The second method creates and returns an EncodingAttributes object, with the 'mp3' output format,  and the audio attributes from the previous method.

```kotlin
private fun createEncodingAttributes(audioAttributes: AudioAttributes): EncodingAttributes {  
    val encodingAttributes = EncodingAttributes()  
    encodingAttributes.setOutputFormat("mp3")  
    encodingAttributes.setAudioAttributes(audioAttributes)  
    return encodingAttributes  
}
```
And the third method takes the input file name and the output directory, which we'll use to define how to create the output file. Then inside the function we'll use our other two helper functions to create the audio attributes and the encoding attributes. And we'll use an Encoder object to finally encode and process our inputFile using the outputFile template, and encodingAttributes we defined.

And since these operations can fail, we'll wrap them in a try/catch block.

```kotlin
private fun processFile(inputFile: File, outputDirectory: File) {  
    try {  
        val outputFileName = "${inputFile.nameWithoutExtension}.mp3"  
        val outputFile = File(outputDirectory, outputFileName)  

        val audioAttributes = createAudioAttributes()  
        val encodingAttributes = createEncodingAttributes(audioAttributes)  

        Encoder().encode(MultimediaObject(inputFile), outputFile, encodingAttributes)  

    } catch (exception: Exception) {  
        println("Error converting file ${inputFile.name}: ${exception.message}")  
    }  
}
```
### Step 4. Build the Coroutine
Back in the launch block of the convertWavToMp3() function, we can begin building our coroutine. We'll create a try/catch block, and inside the "try" we'll first create the output directory using the outputDirectory argument.

```kotlin
outputDirectory.mkdirs()
```

We can then check that the input directory both exists and is in fact a directory, otherwise we'll print an error message to the user.

```kotlin
if (!inputDirectory.exists() || !inputDirectory.isDirectory) {  
    println("Input directory does not exist or is not a directory.")  
    return@launch  
}
```
From there we can get an array of all the files we need to process by using the "listFiles" method and filter by the file extension "wav".

```kotlin
val files = inputDirectory.listFiles { file ->  
    file.extension == "wav"  
} ?: arrayOf()
```
And finally we can loop through our files array using "forEach" and call the processFile method we created earlier providing the file, and the outputDirectory.

```kotlin
files.forEach { inputFile ->  
    processFile(inputFile, outputDirectory)  
}
```
Here's the completed function with error handling in the catch block:

```kotlin
suspend fun convertWavToMp3(inputDirectory: File, outputDirectory: File) = coroutineScope {  
        launch {  
            try {  
                outputDirectory.mkdirs()  

                if (!inputDirectory.exists() || !inputDirectory.isDirectory) {  
                    println("Input directory does not exist or is not a directory.")  
                    return@launch  
                }  

                val files = inputDirectory.listFiles { file ->  
                    file.extension == "wav"  
                } ?: arrayOf()  

                files.forEach { inputFile ->  
                    processFile(inputFile, outputDirectory)  
                }  

            } catch (error: Exception) {  
                println("Error converting files: ${error.message}")  
            }  
        }  
    }
```
### Step 5. Create the Main Function
To run our AudioConverter we'll need to define a main function where we'll define the input directory and output directory paths. From there we can create an instance of the AudioConverter and call our convertWavToMp3() method passing the two directories as arguments. Also, as a fun experiment, I'll time how long the execution takes using the measureTimeMillis function and print the result to the console.

```kotlin
fun main() {  
    runBlocking {  
        val inputDirectoryPath = File("/Users/danpgomez/Desktop/WAV_Files")  
        val outputDirectoryPath = File("/Users/danpgomez/Desktop/WAV_Files/MP3s")  

        val time = measureTimeMillis {  
            AudioConverter().convertWavToMp3(inputDirectoryPath, outputDirectoryPath)  
        }  
        println("Completed in $time ms")  
        // "Completed in 13598 ms"     
    }  
}
```
### Step 6. Make it concurrent using 'async' and 'await'
If you open the MP3 output directory while the program is running, you'll probably notice that it is processing each file one by one. While these are being processed inside of a coroutine, we can drastically improve the performance using a feature called "concurrency". To do this, we'll make a small modification to our conversion function. We'll take our files array and use the map function to create a new array. Inside of map we'll transform each file into a Job by telling it to execute the processing of the file asynchronously using the "async" keyword. We'll also tell it to use the IO Dispatcher which defines the thread where the coroutine should execute. The IO dispatcher is good for things like reading from or writing to files, making network requests, or interacting with databases

We'll collect all the jobs inside of a "jobs" variable, which we can then use to call jobs.awaitAll() to wait for all the jobs to complete before exiting the program.

```kotlin
val jobs = files.map { inputFile ->  
    async(Dispatchers.IO) {  
        processFile(inputFile, outputDirectory)  
    }  
}  

jobs.awaitAll()
```
Now when we run the program it processes all the audio files at the same time (concurrently) and runs in 4703 ms which is less than half the time it did previously 😀.

Coroutines can be a bit tricky to understand at the beginning but hopefully this gave you a good start and maybe even a useful project to practice with. Let me know if you have any questions in the comments.