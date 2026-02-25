import argparse
import requests
from models import LeetCodeProblem


API_URL = "https://leetcode-api-pied.vercel.app/"


def main():
    parser = argparse.ArgumentParser(description="Fetch and save LeetCode problem")
    parser.add_argument("problem_id", type=int, help="LeetCode problem ID")
    args = parser.parse_args()

    resp = requests.get(API_URL + f"/problem/{args.problem_id}")
    problem = LeetCodeProblem(**resp.json())
    print(problem.to_markdown())

    display_name = problem.title.lower().replace(' ', '-')

    with open(f'docs/problems/{display_name}.md', 'w') as f:
        f.write(problem.to_markdown())

    with open(f'docs/data/{display_name}.json', 'w') as f:
        f.write(problem.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
