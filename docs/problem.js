// Problem detail page script

// Get problem ID from URL
function getProblemId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Initialize the page
async function init() {
    const problemId = getProblemId();

    if (!problemId) {
        showError('No problem ID specified');
        return;
    }

    await Promise.all([
        loadProblem(problemId),
        loadSolution(problemId)
    ]);
}

// Load problem data
async function loadProblem(problemId) {
    try {
        const response = await fetch(`data/${problemId}.json`);

        if (!response.ok) {
            throw new Error('Problem not found');
        }

        const problem = await response.json();
        renderProblem(problem);
        renderMeta(problem);

        // Update page title
        document.title = `${problem.title} - Algorithm Study Guide`;
    } catch (error) {
        console.error('Error loading problem:', error);
        showError('problemContent', 'Failed to load problem data');
    }
}

// Load solution markdown
async function loadSolution(problemId) {
    try {
        const response = await fetch(`solutions/${problemId}.md`);

        if (!response.ok) {
            throw new Error('Solution not found');
        }

        const markdown = await response.text();
        renderSolution(markdown);
    } catch (error) {
        console.error('Error loading solution:', error);
        showError('solutionContent', 'Failed to load solution data');
    }
}

// Render problem content
function renderProblem(problem) {
    const contentDiv = document.getElementById('problemContent');
    contentDiv.innerHTML = problem.content;
}

// Render problem metadata
function renderMeta(problem) {
    const metaDiv = document.getElementById('problemMeta');

    metaDiv.innerHTML = `
        <h1 class="meta-title">${problem.title}</h1>

        <div class="meta-item">
            <div class="meta-label">Problem ID</div>
            <div class="meta-value">#${problem.questionId}</div>
        </div>

        <div class="meta-item">
            <div class="meta-label">Difficulty</div>
            <div class="difficulty-badge ${problem.difficulty.toLowerCase()}">
                ${problem.difficulty}
            </div>
        </div>

        <div class="meta-item">
            <div class="meta-label">Original Problem</div>
            <a href="${problem.url}" target="_blank" rel="noopener noreferrer" class="meta-link">
                View on LeetCode
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L12 8M12 4L8 4M12 4L6 10" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
                    <path d="M10 12H4V6" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
                </svg>
            </a>
        </div>
    `;
}

// Render solution from markdown
function renderSolution(markdown) {
    const solutionDiv = document.getElementById('solutionContent');

    // Configure marked options
    marked.setOptions({
        highlight: function(code, lang) {
            return code;
        },
        breaks: true,
        gfm: true
    });

    // Convert markdown to HTML
    const html = marked.parse(markdown);
    solutionDiv.innerHTML = html;

    // Enhance code blocks
    enhanceCodeBlocks(solutionDiv);
}

// Enhance code blocks with language labels
function enhanceCodeBlocks(container) {
    const codeBlocks = container.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const pre = block.parentElement;

        // Add language label if available
        const className = block.className;
        const match = className.match(/language-(\w+)/);

        if (match) {
            const language = match[1];
            const label = document.createElement('div');
            label.style.cssText = `
                font-family: var(--font-mono);
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--color-text-light);
                margin-bottom: 0.5rem;
                font-weight: 500;
            `;
            label.textContent = language;
            pre.insertBefore(label, block);
        }
    });
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="loading">
            <p style="color: var(--color-hard);">${message}</p>
        </div>
    `;
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
