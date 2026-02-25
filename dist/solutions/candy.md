# Candy - Solution

## Code

```python
def candy(ratings):
    n = len(ratings)
    if n == 0:
        return 0

    # Initialize all children with 1 candy
    candies = [1] * n

    # Left to right pass: ensure higher rated child gets more than left neighbor
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # Right to left pass: ensure higher rated child gets more than right neighbor
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)
```

## Chain of Thought

**Initial Understanding:**
When I first read this problem, I notice it's about distributing candies with two constraints:
1. Everyone gets at least 1 candy
2. Higher rated children must get more candies than their neighbors

The word "neighbors" is key - a child has up to two neighbors (left and right), and they need more candies than both if they have higher ratings.

**First Attempt - Greedy Approach:**
My first instinct is to try a simple greedy approach - go left to right and give more candies when I see an increase in rating. Let me trace through Example 1: `ratings = [1,0,2]`

Starting with all 1s: `candies = [1,1,1]`
- Position 0→1: rating decreases (1→0), keep as is
- Position 1→2: rating increases (0→2), give more: `candies = [1,1,2]`

Total = 4 candies

But wait, the expected answer is 5. What went wrong?

**Realizing the Issue:**
I only looked at the relationship with the left neighbor. But the child at position 0 has rating 1, which is greater than the child at position 1 (rating 0). So child 0 should have more candies than child 1.

The problem is bidirectional - I need to consider both left and right neighbors.

**Two-Pass Solution:**
I realize I need two passes:
1. **Left-to-right pass**: Ensure each child with higher rating than their left neighbor gets more candies
2. **Right-to-left pass**: Ensure each child with higher rating than their right neighbor gets more candies

For the second pass, I need to take the maximum to preserve constraints from the first pass.

Let me trace Example 1 again: `ratings = [1,0,2]`

Initialize: `candies = [1,1,1]`

**Left-to-right:**
- i=1: ratings[1]=0 < ratings[0]=1, no change → `[1,1,1]`
- i=2: ratings[2]=2 > ratings[1]=0, so candies[2] = candies[1] + 1 = 2 → `[1,1,2]`

**Right-to-left:**
- i=1: ratings[1]=0 < ratings[2]=2, no change → `[1,1,2]`
- i=0: ratings[0]=1 > ratings[1]=0, so candies[0] = max(1, 1+1) = 2 → `[2,1,2]`

Total = 2+1+2 = 5 ✓

Let me verify with Example 2: `ratings = [1,2,2]`

Initialize: `candies = [1,1,1]`

**Left-to-right:**
- i=1: ratings[1]=2 > ratings[0]=1, so candies[1] = 2 → `[1,2,1]`
- i=2: ratings[2]=2 = ratings[1]=2, no change (not greater) → `[1,2,1]`

**Right-to-left:**
- i=1: ratings[1]=2 = ratings[2]=2, no change → `[1,2,1]`
- i=0: ratings[0]=1 < ratings[1]=2, no change → `[1,2,1]`

Total = 1+2+1 = 4 ✓

**Why use max() in the second pass?**
The max() is crucial because we need to satisfy BOTH the left neighbor constraint (from pass 1) and the right neighbor constraint (from pass 2). If a child is at a local peak (higher than both neighbors), the first pass might give them enough candies for the left constraint, and we need to ensure we don't reduce it below what's needed for the right constraint.

**Implementation:**
```python
def candy(ratings):
    n = len(ratings)
    candies = [1] * n

    # Pass 1: Left to right
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # Pass 2: Right to left
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)
```

## Complexity

**Time Complexity:** O(n)
- We make two passes through the array, each taking O(n) time
- The sum operation at the end is also O(n)
- Total: O(n) + O(n) + O(n) = O(n)

**Space Complexity:** O(n)
- We use an additional array `candies` of size n to store the candy count for each child
- No other significant space is used

Note: There exists a more space-efficient O(1) space solution using a single-pass approach with peak-valley detection, but it's significantly more complex to implement and understand. The two-pass solution is optimal for practical purposes.

## Algorithms

**Greedy Algorithm:**
This problem uses a greedy approach where we make locally optimal choices (giving just enough candies to satisfy immediate neighbor constraints) that lead to a globally optimal solution (minimum total candies).

**Two-Pass Algorithm:**
A common pattern for problems with bidirectional constraints. When you need to satisfy conditions in both directions, make one pass in each direction and combine the results appropriately (here using max).

**Related Problems:**
- Trapping Rain Water (two-pointer/two-pass technique)
- Product of Array Except Self (left and right pass)
- Best Time to Buy and Sell Stock variations
