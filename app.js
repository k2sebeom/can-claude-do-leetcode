// Problem metadata configuration
const PROBLEMS = [
    {
        id: 'merge-k-sorted-lists',
        title: 'Merge k Sorted Lists',
        description: 'Merge all the linked-lists into one sorted linked-list and return it.',
        file: 'merge-k-sorted-lists.md'
    },
    {
        id: 'substring-with-concatenation-of-all-words',
        title: 'Substring with Concatenation of All Words',
        description: 'A concatenated string is a string that exactly contains all the strings of any permutation of wor...',
        file: 'substring-with-concatenation-of-all-words.md'
    },
    {
        id: 'two-sum',
        title: 'Two Sum',
        description: 'You may assume that each input would have exactly one solution, and you may not use the same elem...',
        file: 'two-sum.md'
    }
];

// Initialize the problems list
function initProblems() {
    const problemsList = document.getElementById('problems-list');
    const problemCount = document.getElementById('problem-count');

    if (!problemsList) return;

    // Update count
    if (problemCount) {
        problemCount.textContent = PROBLEMS.length.toString().padStart(2, '0');
    }

    // Generate problem cards
    PROBLEMS.forEach((problem, index) => {
        const card = createProblemCard(problem, index + 1);
        problemsList.appendChild(card);
    });
}

// Create a problem card element
function createProblemCard(problem, index) {
    const card = document.createElement('a');
    card.href = `problem.html?id=${problem.id}`;
    card.className = 'problem-card';

    card.innerHTML = `
        <div class="problem-card-header">
            <span class="problem-index">№ ${index.toString().padStart(2, '0')}</span>
        </div>
        <h3 class="card-title">${problem.title}</h3>
        <p class="card-description">${problem.description}</p>
        <div class="card-footer">
            <div class="solved-indicator">
                <span class="solved-dot"></span>
                <span>Solved</span>
            </div>
            <span class="view-link">View Solution</span>
        </div>
    `;

    return card;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initProblems);
