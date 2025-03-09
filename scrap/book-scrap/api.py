from requests import get
from dotenv import load_dotenv
import os
import traceback

load_dotenv()

url = os.getenv("NAVER_API_URL")
CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")

# print(CLIENT_ID, CLIENT_SECRET, url)

def fetch_api(query):

    cur = 1
    PAGE = 100
    
    
    total = 10000
    items = []
    try:

        while cur < total:
            headers = {
                "X-Naver-Client-Id": CLIENT_ID,
                "X-Naver-Client-Secret": CLIENT_SECRET,
            }
            params = {"query": query, "display": 100, "start": cur}

            response = get(url=url, headers=headers, params=params)
            data = response.json()
            # print(data)
            total = data["total"]

            items.extend(
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
            cur += PAGE

    except Exception as e:
        print("API 요청 오류:", e)
        traceback.print_exc()
    
    return items
