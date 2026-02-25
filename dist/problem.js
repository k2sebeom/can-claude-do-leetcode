// Problem metadata configuration (duplicated from app.js for standalone page)
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

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load and display problem details
async function loadProblemDetails() {
    const problemId = getUrlParameter('id');

    if (!problemId) {
        showError('No problem ID specified');
        return;
    }

    // Find problem metadata
    const problem = PROBLEMS.find(p => p.id === problemId);

    if (!problem) {
        showError('Problem not found');
        return;
    }

    // Update page header
    updateHeader(problem);

    // Load problem description and solution
    await Promise.all([
        loadProblemDescription(problem.file),
        loadSolution(problem.file)
    ]);
}

// Update the problem header
function updateHeader(problem) {
    const problemNumber = document.getElementById('problem-number');
    const problemTitle = document.getElementById('problem-title');

    const index = PROBLEMS.findIndex(p => p.id === problem.id) + 1;

    if (problemNumber) {
        problemNumber.textContent = `№ ${index.toString().padStart(2, '0')}`;
    }

    if (problemTitle) {
        problemTitle.textContent = problem.title;
    }
}

// Load problem description from markdown file
async function loadProblemDescription(filename) {
    const contentDiv = document.getElementById('problem-content');

    if (!contentDiv) return;

    try {
        const response = await fetch(`problems/${filename}`);

        if (!response.ok) {
            throw new Error('Failed to load problem description');
        }

        const markdown = await response.text();
        const html = marked.parse(markdown);

        contentDiv.innerHTML = html;
    } catch (error) {
        contentDiv.innerHTML = `<p class="loading-text" style="color: var(--color-accent);">Error loading problem: ${error.message}</p>`;
    }
}

// Load solution from markdown file
async function loadSolution(filename) {
    const contentDiv = document.getElementById('solution-content');

    if (!contentDiv) return;

    try {
        const response = await fetch(`solutions/${filename}`);

        if (!response.ok) {
            throw new Error('Solution not available yet');
        }

        const markdown = await response.text();
        const html = marked.parse(markdown);

        contentDiv.innerHTML = html;
    } catch (error) {
        contentDiv.innerHTML = `<p class="loading-text" style="color: var(--color-accent);">Error loading solution: ${error.message}</p>`;
    }
}

// Show error message
function showError(message) {
    const problemTitle = document.getElementById('problem-title');
    const problemContent = document.getElementById('problem-content');
    const solutionContent = document.getElementById('solution-content');

    if (problemTitle) {
        problemTitle.textContent = 'Error';
    }

    if (problemContent) {
        problemContent.innerHTML = `<p class="loading-text" style="color: var(--color-accent);">${message}</p>`;
    }

    if (solutionContent) {
        solutionContent.innerHTML = '';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProblemDetails);
