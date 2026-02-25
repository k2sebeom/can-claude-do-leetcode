# Two Sum - Solution

## Code

```python
def twoSum(nums, target):
    # Hash map to store number -> index mapping
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        # Check if complement exists in our hash map
        if complement in seen:
            return [seen[complement], i]

        # Store current number and its index
        seen[num] = i

    # Should never reach here given problem constraints
    return []
```

## Chain of Thought

### Initial Understanding
When I first read this problem, I need to find two numbers in an array that add up to a target value, and return their indices. The key constraints are:
- There's exactly one solution
- I can't use the same element twice
- Order of returned indices doesn't matter

### First Approach: Brute Force
My immediate thought is to check every possible pair of numbers. Let me sketch this out:

```python
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

This works, but with nested loops, it's O(n²) time complexity. The follow-up asks if I can do better than O(n²), so let me think about optimization.

### Key Insight: The Complement Problem
Wait a minute... for each number `nums[i]`, I'm really asking: "Does `target - nums[i]` exist somewhere in the array?"

If I'm at index `i` looking at value `7`, and my target is `9`, I need to find if `2` exists in the array. Instead of searching through the entire array each time (which would still be O(n²)), what if I could check instantly?

### Optimized Approach: Hash Map
This is where a hash map comes in! I can use a dictionary to store numbers I've already seen along with their indices. Then, for each new number:

1. Calculate its complement: `complement = target - current_number`
2. Check if this complement already exists in my hash map (O(1) lookup!)
3. If yes: return the indices
4. If no: add current number to hash map and continue

Let me trace through Example 1 to verify:
```
nums = [2,7,11,15], target = 9

i=0, num=2:
  complement = 9 - 2 = 7
  seen = {}
  7 not in seen
  Add 2 → seen = {2: 0}

i=1, num=7:
  complement = 9 - 7 = 2
  seen = {2: 0}
  2 IS in seen!
  Return [seen[2], 1] = [0, 1] ✓
```

Perfect! The beauty of this approach is that I'm building my lookup table as I go, so by the time I encounter the second number of the pair, the first one is already stored.

### Edge Cases to Consider
Let me think about potential edge cases:

**What if there are duplicate numbers?** (Example 3: `[3,3]`, target=6)
```
i=0, num=3:
  complement = 6 - 3 = 3
  seen = {}
  3 not in seen
  Add 3 → seen = {3: 0}

i=1, num=3:
  complement = 6 - 3 = 3
  seen = {3: 0}
  3 IS in seen!
  Return [0, 1] ✓
```

This works fine because when I hit the second `3`, the first `3` is already in my hash map.

**What if the complement equals the current number?** (e.g., single element `[5]`, target=10)
This can't happen because constraints guarantee at least 2 elements, and we check the hash map BEFORE adding the current element, so we never use the same element twice.

### Final Implementation
The final solution uses a single pass through the array with O(1) hash map lookups, achieving O(n) time complexity. This is much better than the O(n²) brute force approach.

## Complexity

**Time Complexity: O(n)**
- Single pass through the array: O(n)
- Hash map lookup and insertion are both O(1) on average
- Total: O(n)

**Space Complexity: O(n)**
- In the worst case, we might store nearly all elements in the hash map before finding the pair
- The hash map can grow up to size n-1

## Algorithms

**Related Algorithms:**

1. **Hash Table/Dictionary**
   - Core data structure enabling O(1) average-case lookups
   - Trades space for time efficiency

2. **Complement Pattern**
   - Transform "find two numbers that sum to X" into "for each number, check if its complement exists"
   - Common pattern in many sum-based problems

3. **Single-Pass Algorithm**
   - Build the solution incrementally in one iteration
   - More efficient than multi-pass approaches

4. **Two-Pointer Technique** (Alternative Approach)
   - If the array were sorted, could use two pointers from start and end moving inward
   - Would be O(n log n) due to sorting, or O(n) if already sorted
   - Uses O(1) space but requires sorted array

**Similar Problems:**
- Three Sum (3Sum)
- Four Sum (4Sum)
- Two Sum II - Input Array Is Sorted (use two pointers)
- Two Sum III - Data Structure Design
- Two Sum IV - Input is a BST
