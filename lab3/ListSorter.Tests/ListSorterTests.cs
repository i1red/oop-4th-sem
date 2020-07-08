using System;
using System.Collections.Generic;
using NUnit.Framework;
using ListSorter;
using ListSorter.Parallel;

namespace ListSorter.Tests
{
    public abstract class ListSorterTests
    {
        protected IListSorter<int> Sorter;
        protected int ListSize;
        
        [Test]
        public void Sort_RandomInput_SortedSequence()
        {
            var actual = Utils.RandomList(ListSize);
            
            var expected = new List<int>(actual);
            expected.Sort();
            
            CollectionAssert.AreEqual(expected, Sorter.Sort(actual));
        }
    }
    
    [TestFixture]
    class InsertionSorterTests : ListSorterTests
    {
        [SetUp]
        public void Setup()
        {
            Sorter = new InsertionSorter<int>();
            ListSize = 1000;
        }
    }
    
    [TestFixture]
    class MergeSorterTests : ListSorterTests
    {
        [SetUp]
        public void Setup()
        {
            Sorter = new MergeSorter<int>();
            ListSize = 10000;
        }
    }
    
    [TestFixture]
    class OptimizedMergeSorterTests : ListSorterTests
    {
        [SetUp]
        public void Setup()
        {
            Sorter = new OptimizedMergeSorter<int>();
            ListSize = 10000;
        }
    }
    
    [TestFixture]
    class ParallelMergeSorterTests : ListSorterTests
    {
        [SetUp]
        public void Setup()
        {
            Sorter = new ParallelMergeSorter<int>();
            ListSize = 10000;
        }
    }
}