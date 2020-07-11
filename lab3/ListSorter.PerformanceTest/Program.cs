using System;
using ListSorter.Parallel;

namespace ListSorter.PerformanceTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var testList = Utils.RandomList(1000000);
            
            var tester = new PerformanceTester();
            
            tester.PrintTestResult(() =>
            {
                new MergeSorter<int>().Sort(testList);
            }, "Test classic merge sort");
            
            tester.PrintTestResult(() =>
            {
                new OptimizedMergeSorter<int>().Sort(testList);
            }, "Test optimized merge sort");
            
            tester.PrintTestResult(() =>
            {
                new ParallelMergeSorter<int>(2).Sort(testList);
            }, "Test parallel merge sort, 2 tasks");
            
            tester.PrintTestResult(() =>
            {
                new ParallelMergeSorter<int>(8).Sort(testList);
            }, "Test parallel merge sort, 8 tasks");
        }
    }
}