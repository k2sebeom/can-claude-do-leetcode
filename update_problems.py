#!/usr/bin/env python3
"""
Scan the dist/data directory and generate a manifest file
that lists all available problems for the frontend.
"""

import json
import os
from pathlib import Path


def scan_problems():
    """Scan dist/data directory and generate manifest."""
    data_dir = Path("dist/data")

    if not data_dir.exists():
        print(f"Error: {data_dir} directory not found")
        return

    problems = []

    # Scan all JSON files in the data directory
    for json_file in sorted(data_dir.glob("*.json")):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                problem_data = json.load(f)

            # Extract slug from filename
            slug = json_file.stem

            # Add slug to problem data
            problem_summary = {
                "slug": slug,
                "questionId": problem_data.get("questionId", ""),
                "title": problem_data.get("title", ""),
                "difficulty": problem_data.get("difficulty", ""),
                "url": problem_data.get("url", "")
            }

            problems.append(problem_summary)
            print(f"✓ Loaded: {slug}")

        except Exception as e:
            print(f"✗ Error loading {json_file.name}: {e}")

    # Sort by question ID
    problems.sort(key=lambda x: int(x["questionId"]) if x["questionId"].isdigit() else 999999)

    # Write manifest file
    manifest_path = Path("dist/problems-manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump({
            "problems": problems,
            "count": len(problems),
            "generated": True
        }, f, indent=2)

    print(f"\n✓ Manifest generated: {manifest_path}")
    print(f"  Total problems: {len(problems)}")


if __name__ == "__main__":
    scan_problems()
