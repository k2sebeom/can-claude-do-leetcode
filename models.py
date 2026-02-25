from pydantic import BaseModel
from typing import Literal

from html_to_markdown import convert as h2mconvert


class LeetCodeProblem(BaseModel):
    questionId: str
    title: str
    content: str
    difficulty: Literal["Easy", "Medium", "Hard"]
    url: str

    def to_markdown(self) -> str:
        return f"""# {self.title}

## Problem
{h2mconvert(self.content)}
"""
