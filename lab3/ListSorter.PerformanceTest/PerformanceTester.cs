using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Xml.XPath;

namespace ListSorter.PerformanceTest
{
    public class PerformanceTester
    {
        public int IterationsPerLoop { get; set; }
        public int LoopsCount { get; set; }

        public PerformanceTester(int loopsCount = 10, int iterationsPerLoop = 5)
        {
            LoopsCount = loopsCount;
            IterationsPerLoop = iterationsPerLoop;
        }

        public (double, double) GetTestResult(Action codeToExecute)
        {
            return GetTestResult(codeToExecute, LoopsCount, IterationsPerLoop);
        }

        public static (double, double) GetTestResult(Action codeToExecute, int loopsCount, int iterationsPerLoop)
        {
            WarmUp();
            var executionTimes = new List<double>();
            for (int i = 0; i < loopsCount; ++i)
            {
                var timer = new Stopwatch();
                timer.Start();
                for (int j = 0; j < iterationsPerLoop; ++j)
                {
                    codeToExecute();
                }
                timer.Stop();
                executionTimes.Add((double)timer.ElapsedMilliseconds / iterationsPerLoop);
            }
            double avg = executionTimes.Average();
            double std = Math.Sqrt(executionTimes.Sum(time => (time - avg) * (time - avg)) / Math.Max(loopsCount - 1, 1));
            
            return (avg, std);
        }

        public void PrintTestResult(Action codeToExecute, string testTitle)
        {
            PrintTestResult(codeToExecute, testTitle, LoopsCount, IterationsPerLoop);
        }

        public static void PrintTestResult(Action codeToExecute, string testTitle, int loopsCount, int iterationsPerLoop)
        {
            Console.WriteLine(testTitle);
            Console.WriteLine($"Loops count: {loopsCount}, iterations per loop: {iterationsPerLoop}");
            var (avg, std) = GetTestResult(codeToExecute, loopsCount, iterationsPerLoop);
            Console.WriteLine($"Average time: {avg:0.##} ms, standard deviation: {std:0.##} ms");
            Console.WriteLine();
        }

        private static void WarmUp()
        {
            const int warmUpLoopsCount = 200000;
            
            for (int i = 0; i < warmUpLoopsCount; ++i)
            {
                _ = i * i / 2 + i;
            }
        }
    }
}