using System;
using System.Collections.Generic;

namespace ListSorter
{
    public class OptimizedMergeSorter<T> : MergeSorter<T>
    {
        private readonly IListSorter<T> _smallListSorter;
        private readonly int _smallListSize;
        
        public OptimizedMergeSorter(int smallListSize) : this(null, smallListSize) {}
        public OptimizedMergeSorter(IListSorter<T> smallListSorter = null, int smallListSize = 16)
        {
            if (smallListSize <= 0)
            {
                throw new ArgumentException();
            }
            _smallListSorter = smallListSorter ?? new InsertionSorter<T>();
            _smallListSize = smallListSize;
        }
        protected override List<T> SortImplementation(List<T> list, IComparer<T> comparer)
        {
            if (list.Count <= _smallListSize)
            {
                return _smallListSorter.Sort(list, comparer);
            }
            
            int countOfHalf = list.Count / 2;
            return Merge(SortImplementation(list.GetRange(0, countOfHalf), comparer), 
                SortImplementation(list.GetRange(countOfHalf, list.Count - countOfHalf), comparer), comparer);
        }
    }
}