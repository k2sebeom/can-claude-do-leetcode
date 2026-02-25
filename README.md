# Can Claude Do LeetCode?

An automated LeetCode problem solver and study guide generator powered by Claude Code. This project fetches LeetCode problems, generates comprehensive solutions with detailed explanations, and presents them through an elegant web interface.

## Overview

This project demonstrates Claude Code's ability to solve algorithmic problems by:
- Fetching LeetCode problems via API
- Generating optimal solutions with working code
- Providing detailed chain-of-thought explanations
- Creating a beautiful, browsable study guide

## Features

- **Automated Problem Fetching**: Retrieve any LeetCode problem by ID
- **AI-Powered Solutions**: Claude Code generates efficient solutions with explanations
- **Chain of Thought Analysis**: Detailed breakdowns showing the problem-solving process
- **Web Interface**: Browse problems and solutions through a modern web UI
- **Study Guide Generation**: Comprehensive guides with complexity analysis and related algorithms

## Project Structure

```
.
├── main.py                 # Fetch problems from LeetCode API
├── models.py              # Pydantic models for problem data
├── update_problems.py     # Generate manifest of all problems
├── pyproject.toml         # Project dependencies
└── docs/                  # Generated content & web interface
    ├── index.html         # Main web interface
    ├── problem.html       # Individual problem viewer
    ├── app.js            # Frontend logic
    ├── problems/         # Problem descriptions (markdown)
    ├── solutions/        # Solution guides (markdown)
    ├── data/             # Problem data (JSON)
    └── problems-manifest.json  # Index of all problems
```

## Installation

### Prerequisites

- Python 3.11 or higher
- [uv](https://github.com/astral-sh/uv) (recommended) or pip

### Setup

1. Clone the repository:
```bash
git clone https://github.com/k2sebeom/can-claude-do-leetcode.git
cd can-claude-do-leetcode
```

2. Install dependencies:
```bash
# Using uv (recommended)
uv sync

# Or using pip
pip install -r requirements.txt
```

## Usage

### Fetching a Problem

Fetch a LeetCode problem by its ID:

```bash
python main.py <problem_id>
```

Example:
```bash
python main.py 1  # Fetches "Two Sum"
```

This will:
1. Fetch the problem from the LeetCode API
2. Save the problem description to `docs/problems/<problem-name>.md`
3. Save the raw data to `docs/data/<problem-name>.json`

### Solving with Claude Code

After fetching a problem, use Claude Code to analyze and solve the problem:

1. Open the problem markdown file in `docs/problems/`
2. Use Claude Code to analyze and solve the problem
3. Save the solution with chain-of-thought explanation to `docs/solutions/`

### Updating the Web Interface

After adding new problems/solutions, regenerate the manifest:

```bash
python update_problems.py
```

This scans `docs/data/` and updates `docs/problems-manifest.json`.

### Viewing the Study Guide

Open `docs/index.html` in your web browser to browse all problems and solutions. You can also deploy the `docs` folder to GitHub Pages or any static hosting service.

## Solution Format

Each solution includes:

1. **Code**: Clean, optimized implementation
2. **Chain of Thought**: Step-by-step problem-solving process
   - Initial understanding
   - First approach (often brute force)
   - Key insights leading to optimization
   - Final optimized approach
   - Edge case considerations
3. **Complexity Analysis**: Time and space complexity breakdown
4. **Related Algorithms**: Similar patterns and alternative approaches

## Example Problems

Currently includes:
- Two Sum (Easy)
- Remove Element (Easy)
- Candy (Hard)

## Dependencies

- **requests**: HTTP requests to LeetCode API
- **pydantic**: Data validation and serialization
- **html-to-markdown**: Convert HTML problem descriptions to Markdown

## API

This project uses the unofficial [LeetCode API](https://leetcode-api-pied.vercel.app/) to fetch problem data.

## Contributing

Feel free to contribute by:
- Adding more LeetCode problems
- Improving solution explanations
- Enhancing the web interface
- Fixing bugs or typos

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Powered by [Claude Code](https://www.anthropic.com/claude)
- LeetCode API by [leetcode-api-pied](https://github.com/alfaarghya/alfa-leetcode-api)
- Problems and original descriptions from [LeetCode](https://leetcode.com)
