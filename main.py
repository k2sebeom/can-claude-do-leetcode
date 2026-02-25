import requests
import json
from models import LeetCodeProblem

API_URL = "https://leetcode-api-pied.vercel.app/"


def main():
    resp = requests.get(API_URL + f"/problem/{1}")
    problem = LeetCodeProblem(**resp.json())
    print(problem.to_markdown())

    display_name = problem.title.lower().replace(' ', '-')

    with open(f'dist/problems/{display_name}.md', 'w') as f:
        f.write(problem.to_markdown())
    
    with open(f'dist/data/{display_name}.json', 'w') as f:
        f.write(problem.model_dump_json(indent=2))
    

if __name__ == "__main__":
    main()
