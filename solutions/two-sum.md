# Two Sum Solution

## Code

```python
def twoSum(nums, target):
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i

    return []
```

## Chain of Thought

**Step 1: Understanding the problem**

We need to find two numbers in an array that add up to a target. The first thought is the brute force approach: check every pair.

```python
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

*Consideration:* This works but has O(n²) time complexity. The problem asks for better than O(n²), so I need a different approach.

**Step 2: Reframing the problem**

Instead of asking "what pairs sum to target?", I should ask "for each number, have I seen its complement?" The complement is `target - current_number`. If I've seen it before, I found the answer.

*Consideration:* This means I need to remember what I've seen. A hash table (dictionary) gives O(1) lookup time.

**Step 3: Setting up the hash table**

I'll use a dictionary to store numbers I've seen and their indices.

```python
def twoSum(nums, target):
    seen = {}  # maps value -> index

    for i, num in enumerate(nums):
        # TODO: check for complement and store current number

    return []
```

*Consideration:* I need to iterate through the array once, checking each number.

**Step 4: Checking for complement**

For each number, calculate its complement and check if it exists in the dictionary.

```python
def twoSum(nums, target):
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]  # Found it!

    return []
```

*Consideration:* If the complement exists, I return immediately with both indices.

**Step 5: Storing the current number**

If the complement doesn't exist yet, store the current number for future lookups.

```python
def twoSum(nums, target):
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i  # Store for future lookups

    return []
```

*Consideration:* By storing after checking, I avoid using the same element twice. This completes the solution with a single pass through the array.

## Complexity

**Time Complexity: O(n)**
- Single pass through the array with n elements
- Each hash table lookup and insertion is O(1) average case
- Total: O(n)

**Space Complexity: O(n)**
- Hash table stores up to n elements in worst case
- Each entry is a key-value pair (number and its index)

This is a significant improvement over the O(n²) brute force approach, trading O(n) extra space for linear time complexity.

## Algorithms

- **Hash Table / Hash Map**: Core data structure enabling O(1) average-case lookup and insertion
- **Complement Search Pattern**: For each element, search for (target - element) instead of checking all pairs
- **Single-pass Algorithm**: Processes each element exactly once
- **Space-Time Tradeoff**: Uses additional O(n) space to achieve O(n) time complexity
