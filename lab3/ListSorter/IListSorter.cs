using System.Collections.Generic;

namespace ListSorter
{
    public interface IListSorter<T>
    {
        List<T> Sort(List<T> list, IComparer<T> comparer = null);
    }
}