from api import fetch_api
from db import execute_query
from dotenv import load_dotenv

query = "가"
result = fetch_api(query)
books = result["books"]
images = result["images"]

# for book in books:
#     execute_query(book)

# for image in images:
#     execute_query(image)

print(
    execute_query(
        f"INSERT INTO "
        )
    )
print(1)
