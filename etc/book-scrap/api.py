from requests import get
from dotenv import load_dotenv
import os

load_dotenv()


def fetch_api(query):

    url = os.getenv("NAVER_API_URL")
    cur = -99
    PAGE = 100
    CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
    CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
    total = 10000
    items = []

    while cur + PAGE < total:
        total = data["total"]
        cur += PAGE
        headers = {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
        }
        params = {"query": query, "display": 100, "start": cur}

        response = get(url=url, headers=headers, params=params)
        data = response.json()

        items.append(
            [
                {
                    "books": {
                        "member_id": -1,
                        "title": li["title"].strip(),
                        "author": li["author"].strip(),
                        "publisher": li["publisher"].strip(),
                    },
                    "images": {"type": "BOOK", "image_url": li["image"].strip()},
                }
                for li in data["items"]
            ]
        )

    return items
