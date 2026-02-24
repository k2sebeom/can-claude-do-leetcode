# Merge k Sorted Lists Solution

## Code

```python
import heapq
from typing import List, Optional

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []

        for i, head in enumerate(lists):
            if head:
                heapq.heappush(min_heap, (head.val, i, head))

        dummy = ListNode(0)
        current = dummy

        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            current.next = node
            current = current.next

            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))

        return dummy.next
```

## Chain of Thought

**Step 1: Understanding the problem and initial approach**

We have k sorted linked lists and need to merge them into one sorted list. The familiar approach is merging two sorted lists, so my first thought is: merge them sequentially.

```python
def mergeKLists(lists):
    if not lists:
        return None

    result = lists[0]
    for i in range(1, len(lists)):
        result = mergeTwoLists(result, lists[i])

    return result
```

*Consideration:* This works but is inefficient. With k lists and N total nodes, we'd process many nodes multiple times. First merge has n1 nodes, second merge has (n1+n2) nodes, etc. This leads to O(kN) time complexity. Can we do better?

**Step 2: Key insight - we only care about the smallest unprocessed node**

Since each list is sorted, the smallest unprocessed node must be at the head of one of the k lists. We don't need to look at all nodes - just the k current heads.

*Consideration:* We need to efficiently find the minimum among k candidates repeatedly. A min-heap can find the minimum in O(log k) time!

**Step 3: Setting up the min-heap with initial nodes**

Let me initialize a heap with the first node from each list.

```python
import heapq

def mergeKLists(lists):
    min_heap = []

    for head in lists:
        if head:
            heapq.heappush(min_heap, (head.val, head))  # (value, node)

    # TODO: extract minimum nodes and build result
```

*Consideration:* Wait, there's a problem. If two nodes have the same value, Python can't compare ListNode objects directly. I need to add a unique index to break ties.

**Step 4: Fixing the heap comparison issue**

Add an index to each tuple to ensure comparability.

```python
import heapq

def mergeKLists(lists):
    min_heap = []

    for i, head in enumerate(lists):
        if head:
            heapq.heappush(min_heap, (head.val, i, head))  # (value, index, node)

    # Now we can safely compare tuples
```

*Consideration:* The index ensures that even if values are equal, the tuple comparison won't reach the node object.

**Step 5: Building the result list**

Extract the minimum node repeatedly and build the merged list.

```python
import heapq

def mergeKLists(lists):
    min_heap = []

    for i, head in enumerate(lists):
        if head:
            heapq.heappush(min_heap, (head.val, i, head))

    dummy = ListNode(0)  # Dummy head to simplify construction
    current = dummy

    while min_heap:
        val, i, node = heapq.heappop(min_heap)
        current.next = node
        current = current.next

    return dummy.next
```

*Consideration:* This extracts all nodes, but we're not adding the next nodes back to the heap. The heap will empty after k extractions.

**Step 6: Adding next nodes to maintain k candidates**

After extracting a node, add its next node back to the heap.

```python
import heapq
from typing import List, Optional

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []

        for i, head in enumerate(lists):
            if head:
                heapq.heappush(min_heap, (head.val, i, head))

        dummy = ListNode(0)
        current = dummy

        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            current.next = node
            current = current.next

            if node.next:  # Add next node from same list
                heapq.heappush(min_heap, (node.next.val, i, node.next))

        return dummy.next
```

*Consideration:* Now the heap always maintains up to k nodes (one from each list), and we process all N nodes exactly once. This gives us O(N log k) complexity, much better than O(kN)!

## Complexity

**Time Complexity: O(N log k)**
- N = total number of nodes across all lists
- k = number of linked lists
- Each of N nodes is pushed and popped from heap once
- Each heap operation takes O(log k) time
- Total: N × O(log k) = O(N log k)

**Space Complexity: O(k)**
- Heap stores at most k nodes at any time
- Dummy node and pointers use O(1) space
- Total: O(k)

This is significantly better than the sequential merging approach which takes O(kN) time.

## Algorithms

- **Min-Heap / Priority Queue**: Maintains k candidates and efficiently extracts minimum in O(log k) time
- **Merge Pattern**: Similar to merging sorted arrays but with k-way merge instead of 2-way
- **Dummy Node Pattern**: Simplifies linked list construction by avoiding special case for head
- **Alternative: Divide and Conquer**: Merge pairs of lists recursively (also O(N log k) but different constant factors)
