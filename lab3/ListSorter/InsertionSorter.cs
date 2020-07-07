using System.Collections.Generic;

namespace ListSorter
{
    public class InsertionSorter<T> : IListSorter<T>
    {
        public List<T> Sort(List<T> list, IComparer<T> comparer)
        {
            comparer ??= Comparer<T>.Default;
            
            var listCopy = new List<T>(list);
            for (int i = 1; i < listCopy.Count; ++i)
            {
                T currentElement = listCopy[i];
                int j = i - 1;
                for (; j >= 0 && comparer.Compare(currentElement, listCopy[j]) < 0; --j)
                {
                    listCopy[j + 1] = listCopy[j];
                }

                listCopy[j + 1] = currentElement;
            }

            return listCopy;
        }
    }
}