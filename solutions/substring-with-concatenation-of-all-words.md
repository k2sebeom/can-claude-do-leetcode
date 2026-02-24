# Substring with Concatenation of All Words

## Code

```python
def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    word_count = len(words)
    result = []

    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1

    for offset in range(word_len):
        left = offset
        right = offset
        current_freq = {}
        count = 0

        while right + word_len <= len(s):
            word = s[right:right + word_len]
            right += word_len

            if word in word_freq:
                current_freq[word] = current_freq.get(word, 0) + 1
                count += 1

                while current_freq[word] > word_freq[word]:
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len

                if count == word_count:
                    result.append(left)
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len
            else:
                current_freq.clear()
                count = 0
                left = right

    return result
```

## Chain of Thought

**Step 1: Understanding the problem and brute force**

We need to find all starting indices where a concatenation of ALL words (in any order) appears. The obvious approach: check every position.

```python
def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    total_len = word_len * len(words)
    result = []

    for i in range(len(s) - total_len + 1):
        substring = s[i:i + total_len]
        # Check if substring contains all words
        if is_valid(substring, words, word_len):
            result.append(i)

    return result
```

*Consideration:* For each position, I'd need to parse the substring and check word frequencies. This is O(n × m × k) where n = string length, m = word length, k = word count. Too slow!

**Step 2: Recognizing the sliding window pattern**

Wait, this is a sliding window problem! But unlike typical character-by-character sliding windows, I should move word-by-word since we're matching whole words.

*Consideration:* If I move word-by-word, I might miss valid positions. For example, if word_len = 3, a valid concatenation could start at index 0, 1, or 2. Solution: try all offsets from 0 to word_len-1.

**Step 3: Setting up word frequency map**

First, count how many times each word appears in the words array.

```python
def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    word_count = len(words)
    result = []

    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1

    # TODO: sliding window for each offset
    return result
```

*Consideration:* This lets me quickly check if a word should be in our concatenation and how many times.

**Step 4: Implementing the sliding window for one offset**

Let me implement the sliding window logic for offset 0 first.

```python
def findSubstring(s, words):
    # ... previous setup code ...

    left = 0
    right = 0
    current_freq = {}  # frequency of words in current window
    count = 0  # number of valid words in window

    while right + word_len <= len(s):
        word = s[right:right + word_len]
        right += word_len

        if word in word_freq:
            current_freq[word] = current_freq.get(word, 0) + 1
            count += 1

            if count == word_count:  # Found valid concatenation
                result.append(left)

    return result
```

*Consideration:* This adds words but never removes them. I need to shrink the window when it's invalid.

**Step 5: Handling excess word occurrences**

When a word appears too many times, shrink from the left.

```python
while right + word_len <= len(s):
    word = s[right:right + word_len]
    right += word_len

    if word in word_freq:
        current_freq[word] = current_freq.get(word, 0) + 1
        count += 1

        # Shrink if too many occurrences
        while current_freq[word] > word_freq[word]:
            left_word = s[left:left + word_len]
            current_freq[left_word] -= 1
            count -= 1
            left += word_len

        if count == word_count:
            result.append(left)
            # Shrink to find next valid window
            left_word = s[left:left + word_len]
            current_freq[left_word] -= 1
            count -= 1
            left += word_len
```

*Consideration:* After finding a valid window, I shrink by one word to continue searching.

**Step 6: Handling invalid words**

If we encounter a word not in our target words, reset completely.

```python
if word in word_freq:
    # ... previous logic ...
else:
    # Word not in target words, reset window
    current_freq.clear()
    count = 0
    left = right
```

*Consideration:* No valid concatenation can include this word, so we start fresh from the current position.

**Step 7: Trying all offsets**

Wrap the sliding window logic in a loop for all offsets.

```python
def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    word_count = len(words)
    result = []

    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1

    for offset in range(word_len):
        left = offset
        right = offset
        current_freq = {}
        count = 0

        while right + word_len <= len(s):
            word = s[right:right + word_len]
            right += word_len

            if word in word_freq:
                current_freq[word] = current_freq.get(word, 0) + 1
                count += 1

                while current_freq[word] > word_freq[word]:
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len

                if count == word_count:
                    result.append(left)
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len
            else:
                current_freq.clear()
                count = 0
                left = right

    return result
```

*Consideration:* Each character is processed at most word_len times (once per offset), giving O(n × m) complexity!

## Complexity

**Time Complexity: O(n × m)**
- n = length of string s
- m = length of each word
- k = number of words
- Outer loop runs m times (for each offset 0 to word_len-1)
- For each offset, we process each character at most once
- Each word extraction is O(m), but we do n/m extractions per offset
- Total: m × (n/m × m) = O(n × m)

**Space Complexity: O(k × m)**
- word_freq stores k unique words, each of length m
- current_freq also stores at most k words
- Result array can store O(n) indices in worst case (output space)

This is much better than the brute force O(n × m × k) approach.

## Algorithms

- **Sliding Window**: Core technique for efficiently scanning the string by maintaining a valid window and expanding/contracting it
- **Hash Map / Frequency Counter**: Tracks word frequencies for both target words and current window, enabling O(1) lookups
- **Two Pointers**: left and right pointers define the current window boundaries
- **Multi-offset Strategy**: Running the sliding window from multiple starting positions to cover all possible concatenation locations
