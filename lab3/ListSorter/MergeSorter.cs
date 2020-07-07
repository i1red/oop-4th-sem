using System.Collections.Generic;

namespace ListSorter
{
    public class MergeSorter<T> : IListSorter<T>
    {
        public List<T> Sort(List<T> list, IComparer<T> comparer = null)
        {
            return SortImplementation(list, comparer ?? Comparer<T>.Default);
        }
        
        protected virtual List<T> SortImplementation(List<T> list, IComparer<T> comparer)
        {
            if (list.Count <= 1)
            {
                return new List<T>(list);
            }
            
            int countOfHalf = list.Count / 2;
            return Merge(SortImplementation(list.GetRange(0, countOfHalf), comparer), 
                SortImplementation(list.GetRange(countOfHalf, list.Count - countOfHalf), comparer), comparer);
        }

        protected List<T> Merge(List<T> firstHalf, List<T> secondHalf, IComparer<T> comparer)
        {
            var resultList = new List<T>(firstHalf.Count + secondHalf.Count);

            int i = 0;
            int j = 0;

            while (i < firstHalf.Count && j < secondHalf.Count)
            {
                T firstHalfCurrentElement = firstHalf[i];
                T secondHalfCurrentElement = secondHalf[j];
                if (comparer.Compare(firstHalfCurrentElement, secondHalfCurrentElement) <= 0)
                {
                    resultList.Add(firstHalfCurrentElement);
                    ++i;
                }
                else
                {
                    resultList.Add(secondHalfCurrentElement);
                    ++j;
                }
            }

            while (i < firstHalf.Count)
            {
                resultList.Add(firstHalf[i++]);
            }

            while (j < secondHalf.Count)
            {
                resultList.Add(secondHalf[j++]);
            }
            
            return resultList;
        }
}