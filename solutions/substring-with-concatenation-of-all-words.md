# Substring with Concatenation of All Words

## Code

```python
def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    word_count = len(words)
    total_len = word_len * word_count
    result = []

    # Count frequency of words
    word_freq = {}
    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1

    # Try starting from each offset (0 to word_len-1)
    for offset in range(word_len):
        left = offset
        right = offset
        current_freq = {}
        count = 0

        while right + word_len <= len(s):
            # Add word from right
            word = s[right:right + word_len]
            right += word_len

            if word in word_freq:
                current_freq[word] = current_freq.get(word, 0) + 1
                count += 1

                # If we have too many of this word, shrink from left
                while current_freq[word] > word_freq[word]:
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len

                # Check if we have a valid window
                if count == word_count:
                    result.append(left)
                    # Shrink from left to find next valid window
                    left_word = s[left:left + word_len]
                    current_freq[left_word] -= 1
                    count -= 1
                    left += word_len
            else:
                # Reset if word not in words array
                current_freq.clear()
                count = 0
                left = right

    return result
```

## Chain of Thought

When first reading this problem, it seems daunting: we need to find all positions where a concatenation of ALL words (in any order) appears as a substring. The immediate brute force idea is to check every possible starting position in the string, extract a substring of the required total length, and verify if it contains exactly the words we need.

However, this naive approach would be very slow. For each starting position, we'd need to parse the substring into words and compare frequencies, leading to potentially O(n * m * k) complexity where n is string length, m is word length, and k is number of words.

The breakthrough comes from recognizing this as a sliding window problem with a twist. Unlike typical sliding window problems that move one character at a time, we should move word-by-word since we're looking for concatenations of whole words. But there's a catch: the valid substring might start at any position within the first word_length characters. So we need to try all possible starting offsets (0 to word_len-1).

For each offset, we can use the standard sliding window technique:
- Maintain a frequency map of words in the current window
- Expand the window by adding words from the right
- When a word appears too many times or isn't in our target words, shrink from the left
- When the window contains exactly the right words with right frequencies, record the starting index

This approach ensures each character is processed at most a constant number of times (specifically, at most word_len times across all offsets), giving us O(n * m) time complexity, which is much better than the brute force approach.

## Description

**Line 1-2:** Handle edge cases - return empty list if string s or words array is empty.

**Line 4-7:** Calculate key values: `word_len` is the length of each word (all words have same length), `word_count` is the number of words we need to match, `total_len` is the total length of concatenated substring, and `result` stores the answer.

**Line 9-12:** Build a frequency map `word_freq` that counts how many times each word appears in the `words` array. This is used to validate if a substring contains the correct word frequencies.

**Line 14:** The outer loop iterates through different starting offsets from 0 to word_len-1. This ensures we check all possible positions since we're moving word by word (not character by character).

**Line 15-18:** Initialize sliding window pointers (`left`, `right`), a frequency map for the current window (`current_freq`), and a counter (`count`) for the number of valid words in the current window.

**Line 20:** The inner loop slides the window through the string, moving word_len characters at a time.

**Line 21-23:** Extract the next word from position `right` and move the right pointer forward by `word_len`.

**Line 25:** Check if the extracted word exists in our target words.

**Line 26-27:** Add the word to current window's frequency map and increment the count.

**Line 29-34:** If we have too many occurrences of the current word (exceeds the required frequency), shrink the window from the left until the frequency is valid again. This maintains the sliding window invariant.

**Line 36-42:** If the count equals the total number of words needed, we found a valid concatenated substring. Record the starting index (`left`). Then shrink the window from left by one word to continue searching for the next valid window.

**Line 43-47:** If the word is not in our target words array, reset the window completely since no valid concatenation can include this word.

**Line 49:** Return all found starting indices.

## Algorithms

- **Sliding Window**: The core technique used to efficiently scan through the string without checking every possible substring independently.
- **Hash Map / Frequency Counter**: Used to track word frequencies both for the target words and the current window, enabling O(1) word lookups and frequency comparisons.
- **Two Pointers**: The `left` and `right` pointers define the current window, with `right` expanding the window and `left` contracting it when necessary.

## Complexity

**Time Complexity:** O(n * m) where n is the length of string s and m is the length of each word.
- The outer loop runs m times (for each offset from 0 to word_len-1)
- For each offset, the inner loop processes each character in s at most once
- Each word extraction and map operation is O(m), but since we do this n/m times per offset, it's O(n) per offset
- Total: O(m * n)

**Space Complexity:** O(k * m) where k is the number of unique words in the words array.
- `word_freq` map stores at most k words, each of length m
- `current_freq` map also stores at most k words
- Other variables use constant space
- The result array in worst case could store O(n) indices, but this is output space and typically not counted
