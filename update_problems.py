#!/usr/bin/env python3
"""
Automatically update problem list in app.js and problem.js
by scanning problems/ and solutions/ directories.
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Optional


def extract_title_from_markdown(filepath: str) -> Optional[str]:
    """Extract the problem title from markdown file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

            # Look for pattern: "Can you solve this real interview question? Title - Description"
            match = re.search(r'Can you solve this real interview question\? (.+?) -', content)
            if match:
                return match.group(1).strip()

            # Fallback: look for first heading
            match = re.search(r'^#\s+(.+?)$', content, re.MULTILINE)
            if match:
                return match.group(1).strip()

    except Exception as e:
        print(f"Warning: Could not read {filepath}: {e}")

    return None


def extract_description_from_markdown(filepath: str) -> str:
    """Extract a brief description from the markdown."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

            # Get first paragraph after the title line
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if line.strip() and not line.startswith('#') and not line.startswith('Can you solve'):
                    # Get first sentence or first 100 chars
                    desc = line.strip()
                    if '.' in desc:
                        desc = desc.split('.')[0] + '.'
                    if len(desc) > 100:
                        desc = desc[:97] + '...'
                    return desc

    except Exception as e:
        print(f"Warning: Could not extract description from {filepath}: {e}")

    return "Problem description"


def scan_problems() -> List[Dict]:
    """Scan problems and solutions directories and build problem list."""
    problems_dir = Path('problems')
    solutions_dir = Path('solutions')

    if not problems_dir.exists():
        print(f"Error: {problems_dir} directory not found")
        return []

    problems = []
    problem_files = sorted(problems_dir.glob('*.md'))

    for problem_file in problem_files:
        filename = problem_file.stem  # filename without extension
        problem_id = filename

        # Extract title
        title = extract_title_from_markdown(str(problem_file))
        if not title:
            # Fallback: format filename as title
            title = ' '.join(word.capitalize() for word in filename.split('-'))

        # Extract description
        description = extract_description_from_markdown(str(problem_file))

        # Check if solution exists
        solution_file = solutions_dir / f"{filename}.md"
        has_solution = solution_file.exists()

        problem_data = {
            'id': problem_id,
            'title': title,
            'description': description,
            'file': f"{filename}.md",
            'solved': has_solution
        }

        problems.append(problem_data)
        print(f"✓ Found: {title}" + (" [SOLVED]" if has_solution else ""))

    return problems


def format_problems_array(problems: List[Dict]) -> str:
    """Format problems list as JavaScript array."""
    js_objects = []

    for p in problems:
        js_obj = f"""    {{
        id: '{p['id']}',
        title: '{p['title']}',
        description: '{p['description']}',
        file: '{p['file']}'
    }}"""
        js_objects.append(js_obj)

    return "[\n" + ",\n".join(js_objects) + "\n]"


def update_js_file(filepath: str, problems: List[Dict]):
    """Update the PROBLEMS array in a JavaScript file."""
    if not os.path.exists(filepath):
        print(f"Warning: {filepath} not found, skipping")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generate new PROBLEMS array
    new_array = format_problems_array(problems)

    # Replace the PROBLEMS array using regex
    pattern = r'const PROBLEMS = \[[\s\S]*?\];'
    replacement = f'const PROBLEMS = {new_array};'

    new_content = re.sub(pattern, replacement, content)

    if new_content == content:
        print(f"Warning: Could not find PROBLEMS array in {filepath}")
        return

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ Updated {filepath}")


def main():
    """Main function to update problem lists."""
    print("🔍 Scanning for problems...")
    print()

    problems = scan_problems()

    if not problems:
        print("No problems found!")
        return

    print()
    print(f"📊 Found {len(problems)} problem(s)")
    print()

    # Update both JavaScript files
    print("📝 Updating JavaScript files...")
    update_js_file('app.js', problems)
    update_js_file('problem.js', problems)

    print()
    print("✅ Done! Problem list updated successfully.")
    print()
    print("Summary:")
    print(f"  Total problems: {len(problems)}")
    print(f"  Solved: {sum(1 for p in problems if p['solved'])}")
    print(f"  Unsolved: {sum(1 for p in problems if not p['solved'])}")


if __name__ == '__main__':
    main()
