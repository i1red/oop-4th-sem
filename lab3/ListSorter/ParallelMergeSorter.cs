using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListSorter
{
    namespace Parallel
    {
        public class ParallelMergeSorter<T> : IListSorter<T>
        {
            private readonly int _tasksCount;
            private readonly IListSorter<T> _sorter;

            public ParallelMergeSorter(int? tasksCount = null)
            {
                int tCount = tasksCount ?? Environment.ProcessorCount;
                if (tasksCount < 2)
                {
                    throw new ArgumentException();
                }
                _tasksCount = tCount;
                _sorter = new OptimizedMergeSorter<T>();
            }
            public List<T> Sort(List<T> list, IComparer<T> comparer = null)
            {
                comparer ??= Comparer<T>.Default;
                if (list.Count < 1024)
                {
                    return _sorter.Sort(list, comparer);
                }

                return SortImplementation(list, comparer);
            }

            private List<T> SortImplementation(List<T> list, IComparer<T> comparer)
            {
                var sortedParts = ParallelSortParts(Utils.SplitList(list, _tasksCount), comparer);
                return ParallelMergeParts(sortedParts.Select(sortedPart => sortedPart.ToArray()).ToList(), comparer);
            }
            private List<List<T>> ParallelSortParts(List<List<T>> parts, IComparer<T> comparer)
            {
                var tasks = new List<Task<List<T>>>();

                foreach (var part in parts)
                {
                    tasks.Add(Task.Run(() => _sorter.Sort(part, comparer)));
                }

                return tasks.Select(task => task.Result).ToList();
            }
            
            private List<T> ParallelMergeParts(List<T[]> sortedParts, IComparer<T> comparer)
            {
                if (sortedParts.Count == 1)
                {
                    return sortedParts[0].ToList();
                }
                
                var mergedArrays = new List<T[]>();
                
                if (sortedParts.Count % 2 != 0)
                {
                    mergedArrays.Add(sortedParts[^1]);
                    sortedParts.RemoveAt(sortedParts.Count - 1);
                }
                
                var tasks = new List<Task>(_tasksCount);
                
                int minTasksPerMerge = 2 * _tasksCount / sortedParts.Count;
                int tasksLeft = _tasksCount;

                foreach (var (firstHalf, secondHalf) in Utils.PairIterator(sortedParts))
                {
                    int tasksForMerge = secondHalf != sortedParts[^1] ? minTasksPerMerge : tasksLeft;
                    tasksLeft -= tasksForMerge;
                    CreateMergeTask(firstHalf, secondHalf, mergedArrays, tasksForMerge, tasks, comparer);
                }

                tasks.ForEach(task => task.Wait());

                return ParallelMergeParts(mergedArrays, comparer);   
            }

            private void CreateMergeTask(
                T[] firstHalf, T[] secondHalf, List<T[]> mergedArrays,
                int tasksForMerge, List<Task> tasks, IComparer<T> comparer
                )
            {
                var mergedArray = new T[firstHalf.Length + secondHalf.Length];
                int partSize = firstHalf.Length / tasksForMerge;
                    
                var partitionFirstHalf = new int[tasksForMerge + 1];
                partitionFirstHalf[0] = 0;
                partitionFirstHalf[^1] = firstHalf.Length;
                    
                var partitionSecondHalf = new int[tasksForMerge + 1];
                partitionSecondHalf[0] = 0;
                partitionSecondHalf[^1] = secondHalf.Length;
                    
                for (int j = 1; j < tasksForMerge; ++j)
                {
                    partitionFirstHalf[j] = j * partSize;
                    partitionSecondHalf[j] = 
                        Utils.BisectRight(secondHalf, firstHalf[partitionFirstHalf[j]], comparer);
                }

                for (int j = 0; j < tasksForMerge; ++j)
                {
                    int k = j;
                    tasks.Add(Task.Run(() => SequentialMerge(
                        firstHalf, partitionFirstHalf[k], partitionFirstHalf[k + 1],
                        secondHalf, partitionSecondHalf[k], partitionSecondHalf[k + 1], 
                        mergedArray, partitionFirstHalf[k] + partitionSecondHalf[k], comparer
                    )));
                }
                    
                mergedArrays.Add(mergedArray);
            }
            
            private void SequentialMerge(
                T[] firstHalf, int firstHalfStart, int firstHalfEnd,
                T[] secondHalf, int secondHalfStart, int secondHalfEnd,
                T[] outputArray, int outputStart, 
                IComparer<T> comparer
                )
            {
                int i = firstHalfStart, j = secondHalfStart, k = outputStart;
                
                while (i < firstHalfEnd && j < secondHalfEnd)
                {
                    T firstHalfCurrentElement = firstHalf[i];
                    T secondHalfCurrentElement = secondHalf[j];
                    if (comparer.Compare(firstHalfCurrentElement, secondHalfCurrentElement) <= 0)
                    {
                        outputArray[k] = firstHalfCurrentElement;
                        ++i;
                    }
                    else
                    {
                        outputArray[k] = secondHalfCurrentElement;
                        ++j;
                    }
                    k++;
                }

                if (i < firstHalfEnd)
                {
                    Array.Copy(firstHalf, i, outputArray, k, firstHalfEnd - i);
                }
                else if(j < secondHalfEnd)
                {
                    Array.Copy(secondHalf, j, outputArray, k, secondHalfEnd - j);
                }
            }
        }
    }
}