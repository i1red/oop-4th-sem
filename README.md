## Fundamentals of OOP

### lab2: sort algorithms visualization
This is a web application, which shows how quicksort and selection sort work.\
It's written in typescript. Application has a simple GUI, so I'm not using any TS/JS frameworks.\
If you want to work with that project you should have **node** and **npm** installed.\
To install project dependencies(listed in *package.json*) run:
```
npm install
```
To build application(**webpack** will generate *bundle.js* file in *public* directory) use command:
```
npm run build
```
To run unit tests for sort algorithms(non-GUI; written using **mocha/chai**) use command:
```
npm test
```
Note: I assume you running these commands from xxx/lab2 directory.\
You can check this app via link: https://i1red.github.io/

### lab3: parallel merge sort
This is a C# solution, with some sorting algorithms available

I've implemented:
* Insertion sort(algorithm has high complexity, but it works fast with arrays of size 10-20)
* Merge sort(classic implementation)
* Optimized merge sort(uses additional algorithm, for example insertion sort, to sort small arrays faster)
* Parallel merge sort, which is described below

Note: for parallel work I use C# tasks, especially Task.Run method, it starts the task on C# thread pool(which is already created), so there is no need to create your own threads.

How the algorithm works?

Step 1: it accepts an algorithm for sequential sort(default is optimized merge sort) and number of tasks ***n*** it can use(default is number of cores/threads on your machine).\
Step 2: it divides input list into ***n*** parts and sorts them in separate tasks, using sequential sort algorithm.\
Step 3: it applies *parallel merge* (recursively) to sorted parts. It's similar to https://en.wikipedia.org/wiki/Merge_algorithm#Parallel_merge , but parametrized with number of tasks.\
For example, ***n=4***(4 lists, 4 tasks):\
merges 2 pairs of lists using 2 tasks for each pair, result is 2 sorted lists;\
merges 2 lists with 4 tasks(divides both lists in 4 parts, merges first part of first list with first part of second list...), result is sorted list;

To run unit tests(**NUnit**) run next project:
```
ListSorter.Tests
```
I've written custom performance test, run:
```
ListSorter.PerformanceTest
```
For me the output was(1000000 integers, 4 cores/8 threads laptop):
```
Test classic merge sort
Loops count: 10, iterations per loop: 5
Average time: 341.74 ms, standard deviation: 14.53 ms

Test optimized merge sort
Loops count: 10, iterations per loop: 5
Average time: 213.92 ms, standard deviation: 2.57 ms

Test parallel merge sort, 2 tasks
Loops count: 10, iterations per loop: 5
Average time: 141.14 ms, standard deviation: 3.66 ms

Test parallel merge sort, 8 tasks
Loops count: 10, iterations per loop: 5
Average time: 80 ms, standard deviation: 1.64 ms

```
