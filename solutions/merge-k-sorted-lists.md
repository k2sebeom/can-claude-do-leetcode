# Merge k Sorted Lists Solution

## Code

```python
import heapq
from typing import List, Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Min-heap to store (node value, index, node)
        # Index is used to break ties when values are equal
        min_heap = []

        # Initialize heap with the first node from each list
        for i, head in enumerate(lists):
            if head:
                heapq.heappush(min_heap, (head.val, i, head))

        # Dummy node to simplify result list construction
        dummy = ListNode(0)
        current = dummy

        # Process nodes until heap is empty
        while min_heap:
            # Extract minimum node
            val, i, node = heapq.heappop(min_heap)

            # Add to result list
            current.next = node
            current = current.next

            # If the extracted node has a next node, add it to heap
            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))

        return dummy.next
```

## Chain of Thought

Seeing this problem for the first time, the challenge is clear: we have k sorted linked lists and need to merge them into one sorted list. Since we're familiar with merging two sorted lists (a classic problem), the immediate thought is: can we just merge them two at a time?

Yes, we could merge list1 with list2, then merge that result with list3, and so on. But this approach would be inefficient. If we have k lists and N total nodes, merging sequentially would result in O(kN) time complexity because we'd be processing many nodes multiple times.

The key observation is that at any point in time, the smallest unprocessed node must be at the head of one of the k lists (since each list is already sorted). Instead of comparing all nodes, we only need to compare the current heads of all k lists and repeatedly pick the smallest one.

This insight leads to using a min-heap (priority queue). We can maintain at most k nodes in the heap - one "candidate" from each list (specifically, the current head). The heap allows us to efficiently:
1. Find the minimum among k elements: O(log k)
2. Remove the minimum and add the next node from that same list: O(log k)

We repeat this process N times (once for each node), giving us O(N log k) time complexity, which is much better than O(kN) for sequential merging. The trade-off is using O(k) extra space for the heap, which is reasonable since k is typically much smaller than N.

## Description

**Line-by-line explanation:**

1. **Import heapq**: Use Python's heap queue algorithm (priority queue) module
2. **Initialize min_heap**: Create an empty list to serve as our min-heap
3. **Populate initial heap**: Iterate through all k linked lists and push the first node from each non-empty list into the heap. We store tuples of (value, index, node) where the index helps break ties when values are equal (ListNode objects aren't directly comparable)
4. **Create dummy node**: Use a dummy head node to simplify the construction of the result linked list
5. **Main loop**: While the heap is not empty, repeatedly extract the minimum node
6. **Extract minimum**: Pop the smallest element from the heap (O(log k) operation)
7. **Add to result**: Append the extracted node to the result list
8. **Push next node**: If the extracted node has a next pointer, push that next node into the heap to maintain all k lists' current positions
9. **Return result**: Return dummy.next, which points to the actual head of the merged list

**Algorithm used**: Min-Heap (Priority Queue)

The solution uses a min-heap to efficiently find the smallest element among the current heads of all k lists. At any time, the heap contains at most k nodes (one from each list), ensuring efficient extraction of the minimum.

## Algorithms

- **Heap/Priority Queue**: Used to maintain and efficiently extract the minimum element among k candidates
- **Divide and Conquer** (alternative approach): Merge lists pairwise recursively
- **Two-pointer merge** (component): Each extraction and insertion is similar to merging two sorted arrays

## Complexity

**Time Complexity**: O(N log k)
- N = total number of nodes across all lists
- k = number of linked lists
- Each of the N nodes is pushed to and popped from the heap once
- Each heap operation (push/pop) takes O(log k) time
- Total: N × O(log k) = O(N log k)

**Space Complexity**: O(k)
- The heap stores at most k nodes at any time (one from each list)
- The dummy node and pointers use O(1) additional space
- Total: O(k)

**Note**: An alternative divide-and-conquer approach (merging pairs of lists recursively) also achieves O(N log k) time complexity but may have better cache locality in practice.
