using System;
using System.Collections.Generic;

namespace ListSorter
{
    public static class Utils
    {
        public static int BisectRight<T>(T[] array, T x, IComparer<T> comparer) {
            return BisectRight(array, x, 0, array.Length, comparer);
        }

        public static int BisectRight<T>(T[] array, T x, int start, int end, IComparer<T> comparer) {
            while (start < end) {
                int mid = (int)(((long)start + end) / 2);
                
                if (comparer.Compare(x , array[mid]) < 0)
                {
                    end = mid;
                }
                else
                {
                    start = mid + 1;
                }
            }
            return start; 
        }
        
        public static List<List<T>> SplitList<T>(List<T> list, int partsCount)
        {
            var parts = new List<List<T>>();
            int partSize = (int)Math.Ceiling((double)list.Count / partsCount);
                
            for (int i = 0, startIndex = 0; i < partsCount; ++i, startIndex += partSize)
            {
                parts.Add(list.GetRange(startIndex, Math.Min(startIndex + partSize, list.Count) - startIndex));
            }

            return parts;
        }

        public static IEnumerable<Tuple<T, T>> PairIterator<T>(IEnumerable<T> iterable)
        {
            T prev = default;
            bool hasPrev = false;
            
            foreach (var item in iterable)
            {
                if (hasPrev)
                {
                    yield return Tuple.Create(prev, item);
                }
                else
                {
                    prev = item;
                }

                hasPrev = !hasPrev;
            }
        }

        public static List<int> RandomList(int listSize)
        {
            var result = new List<int>(listSize);
            var generator = new Random();
            
            for (int i = 0; i < listSize; ++i)
            {
                result.Add(generator.Next(-listSize, listSize));
            }

            return result;
        }
    }
}