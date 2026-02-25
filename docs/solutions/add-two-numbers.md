# Add Two Numbers - Solution

## Code

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy
        carry = 0

        while l1 or l2 or carry:
            # Get values from current nodes, or 0 if node is None
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            # Calculate sum and new carry
            total = val1 + val2 + carry
            carry = total // 10
            digit = total % 10

            # Create new node with the digit
            current.next = ListNode(digit)
            current = current.next

            # Move to next nodes if they exist
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next

        return dummy.next
```

## Chain of Thought

### Initial Understanding

When I first see this problem, I notice a few key things:
1. The digits are stored in **reverse order** - this is actually helpful!
2. We need to add two numbers represented as linked lists
3. We need to return the result as a linked list

The reverse order is crucial. For example, `[2,4,3]` represents 342 (not 243). This means the first node contains the least significant digit.

### Why Reverse Order Helps

Let me think about how we add numbers by hand:
```
  342
+ 465
-----
```

We add from right to left (least significant digit first), carrying values forward. Since the linked lists are already in reverse order, we can traverse from the beginning and naturally process digits from least to most significant. Perfect!

### Initial Approach - Simultaneous Traversal

My first thought is to traverse both linked lists at the same time:
- Add corresponding digits
- Handle the carry
- Create new nodes for the result

Let me sketch out the basic structure:

```python
def addTwoNumbers(l1, l2):
    # Start traversing both lists
    while l1 and l2:
        # Add l1.val + l2.val
        # Create new node
        # Move to next
```

### Handling the Carry

Wait, I need to track the carry! When adding 7 + 8 = 15, I need to:
- Store 5 in the current position
- Carry 1 to the next position

Let me refine:

```python
def addTwoNumbers(l1, l2):
    carry = 0
    while l1 and l2:
        total = l1.val + l2.val + carry
        carry = total // 10  # Integer division gives us the carry
        digit = total % 10   # Modulo gives us the digit to store
```

### Edge Case: Different Lengths

Looking at Example 3: `[9,9,9,9,9,9,9]` + `[9,9,9,9]`, the lists have different lengths!

My current approach only works while both `l1` and `l2` exist. What happens when one list ends?

I need to continue processing the longer list. But wait, I could simplify this by checking if each node exists and using 0 if it doesn't:

```python
while l1 or l2:
    val1 = l1.val if l1 else 0
    val2 = l2.val if l2 else 0
    total = val1 + val2 + carry
```

This is cleaner! Now I can handle different lengths naturally.

### Edge Case: Final Carry

What if there's a carry after both lists are exhausted? For example:
- `[9,9,9,9]` + `[9,9,9,9]` = `[8,9,9,9,1]`
- After processing all nodes: 9+9+1(carry) = 19, giving digit=9, carry=1
- We still have carry=1 left over!

I need to continue the loop while there's a carry:

```python
while l1 or l2 or carry:
    # ... process
```

### Building the Result List

I need to build a new linked list for the result. A common pattern is to use a dummy head node to simplify edge cases:

```python
dummy = ListNode(0)
current = dummy

# In the loop:
current.next = ListNode(digit)
current = current.next

# Return dummy.next (skip the dummy)
return dummy.next
```

### Moving Through the Lists

I need to advance the pointers, but only if the nodes exist:

```python
if l1:
    l1 = l1.next
if l2:
    l2 = l2.next
```

### Putting It All Together

Let me trace through Example 1: `[2,4,3]` + `[5,6,4]`

**Iteration 1:**
- val1=2, val2=5, carry=0
- total = 2+5+0 = 7
- digit=7, carry=0
- Result: [7]

**Iteration 2:**
- val1=4, val2=6, carry=0
- total = 4+6+0 = 10
- digit=0, carry=1
- Result: [7,0]

**Iteration 3:**
- val1=3, val2=4, carry=1
- total = 3+4+1 = 8
- digit=8, carry=0
- Result: [7,0,8]

**Iteration 4:**
- l1=None, l2=None, carry=0
- Loop exits

Perfect! Result is `[7,0,8]` which represents 807.

Let me verify with Example 3: `[9,9,9,9,9,9,9]` + `[9,9,9,9]`

This would give us carries throughout, and the final carry creates the last digit [1]. The solution handles this because of the `or carry` condition in the while loop.

## Complexity

**Time Complexity: O(max(m, n))**
- Where m and n are the lengths of the two linked lists
- We traverse each list once
- We process at most max(m,n) + 1 nodes (the +1 accounts for a final carry)
- Each iteration does constant work

**Space Complexity: O(max(m, n))**
- We create a new linked list to store the result
- The result list has at most max(m,n) + 1 nodes
- We use O(1) extra space for variables (carry, current, etc.)
- If we don't count the output list, the space complexity is O(1)

## Algorithms

### Related Algorithms and Concepts:

1. **Linked List Traversal**
   - Basic linked list manipulation and traversal
   - Simultaneous traversal of multiple linked lists
   - Dummy node pattern for simplified list construction

2. **Elementary Addition Algorithm**
   - Digit-by-digit addition with carry propagation
   - This mimics how we add numbers by hand
   - Similar to adding binary numbers

3. **Two Pointers Technique**
   - Processing two data structures simultaneously
   - Handling structures of different lengths

4. **Carry Propagation**
   - Managing overflow/carry in arithmetic operations
   - Common in low-level arithmetic implementations
   - Related to ripple-carry addition in hardware

### Related Problems:
- **Add Two Numbers II** (445) - Same problem but digits are in normal order (most significant first)
- **Add Strings** (415) - Adding two numbers represented as strings
- **Multiply Strings** (43) - Similar digit manipulation but with multiplication
- **Plus One** (66) - Adding 1 to a number represented as an array
