from api import fetch_api
from db import execute_query
from dotenv import load_dotenv

for c in range(ord('가'), ord('핳')+1):
    
    query = c
    result = fetch_api(query)

    for dict in result:
        books, images = dict["books"], dict["images"]
        
        # 이미지 중복 체크
        image_check_query = f"SELECT id FROM image WHERE image_url = '{images['image_url']}'"
        image_result = execute_query(image_check_query)
        
        if image_result and image_result:  # 결과가 존재하는지 확인
            # 이미지가 이미 존재함
            if isinstance(image_result, list) and len(image_result) > 0:
                image_id = image_result[0]['id']  # 리스트의 딕셔너리 경우
            else:
                # image_result 자체가 ID일 수 있음
                image_id = image_result
        else:
            # 이미지가 없으면 새로 삽입
            image_id = execute_query(
                f"""INSERT INTO image (type, image_url, created_at, updated_at)
                VALUES ('{images['type']}', '{images['image_url']}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);"""
            )
        
        # 책 중복 체크
        book_check_query = f"SELECT id FROM book WHERE title = '{books['title']}' AND author = '{books['author']}'"
        book_result = execute_query(book_check_query)
        
        if not book_result:  # 결과가 비어있으면 책 삽입
            execute_query(
                f"""INSERT INTO book 
                (member_id, image_id, title, title_normalized, author, publisher, created_at, updated_at)
                VALUES (-1, {image_id}, '{books['title']}', '{books['title'].replace(" ","")}', '{books['author']}'
                , '{books['publisher']}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);"""
            )