# Two Sum Solution

## Code

```python
def twoSum(nums, target):
    # Dictionary to store value -> index mapping
    seen = {}

    # Iterate through the array with index and value
    for i, num in enumerate(nums):
        # Calculate the complement needed to reach target
        complement = target - num

        # Check if complement exists in our seen dictionary
        if complement in seen:
            # Return the indices of complement and current number
            return [seen[complement], i]

        # Store current number and its index for future lookups
        seen[num] = i

    # No solution found (shouldn't happen per problem constraints)
    return []
```

## Chain of Thought

When first encountering this problem, the most straightforward approach that comes to mind is the brute force method: check every possible pair of numbers to see if they sum to the target. This would involve nested loops - for each number, iterate through all remaining numbers to find its pair. However, this approach would have O(n²) time complexity, which the problem specifically asks us to improve upon.

The key insight comes from reframing the question: instead of asking "does this number pair with any other number?", we should ask "have I already seen the complement of this number?" For each number we encounter, we calculate what value would be needed to reach the target (target - current number). If we've already seen that complement value, we've found our answer.

This leads to using a hash table (dictionary in Python). As we iterate through the array once, we can:
1. Check if the complement of the current number exists in our hash table (O(1) lookup)
2. If yes, return the indices immediately
3. If no, store the current number and its index for future lookups

This approach trades space for time - we use O(n) extra space to achieve O(n) time complexity, which is a significant improvement over the O(n²) brute force approach. The single-pass nature of this solution makes it optimal.

## Description

**Line-by-line explanation:**

1. **Line 3**: Initialize an empty dictionary `seen` to store each number we've encountered and its index
2. **Line 6**: Loop through the array using `enumerate()` to get both the index `i` and value `num` of each element
3. **Line 8**: Calculate the `complement` - the value we need to find to sum up to the target (target - current number)
4. **Line 11**: Check if this complement already exists in our `seen` dictionary
5. **Line 13**: If found, return a list containing the index of the complement (from our dictionary) and the current index
6. **Line 16**: If not found, store the current number and its index in the dictionary for future lookups
7. **Line 19**: Return empty list if no solution found (this shouldn't happen per problem constraints)

**Algorithm used:** Hash Table (Dictionary) lookup with single-pass iteration

The key insight is that for each number, instead of checking all other numbers to find its pair, we check if we've already seen its complement. This transforms the problem from nested loops to a single pass.

## Algorithms

**Related algorithms and concepts:**
- **Hash Table / Hash Map**: Core data structure for O(1) average-case lookup
- **Two Pointer Technique**: Alternative approach if the array were sorted
- **Complement Search**: Pattern of searching for "target - current" rather than checking all pairs
- **Space-Time Tradeoff**: Trading O(n) space for O(n) time improvement

## Complexity

**Time Complexity: O(n)**
- We traverse the array exactly once
- Each lookup and insertion in the hash table takes O(1) average time
- Total: O(n) where n is the length of the input array

**Space Complexity: O(n)**
- In the worst case, we might store all n elements in the hash table before finding the solution
- The dictionary can grow up to size n-1

**Comparison with brute force:**
- Brute force approach: O(n²) time, O(1) space (nested loops checking all pairs)
- This solution: O(n) time, O(n) space (hash table approach)
- This meets the follow-up challenge of achieving less than O(n²) time complexity
