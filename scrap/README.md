# 사용 목적

- 도서 데이터 저장 
- 네이버 API를 매번 호출하면 레이턴시와 비용 문제 발생 → 데이터베이스에 도서 데이터를 저장하여 검색 속도 개선
- 자동 완성 기능 등 검색 시 사용자 경험 최적화

# [네이버 도서 검색 API](https://developers.naver.com/main)
1. 애플리케이션 등록
    - 애플리케이션 이름 : `book-review`
    - 사용 API : `검색`
2. 내 애플리케이션 → API 설정 탭
    - 비로그인 오픈 API 서비스 환경 → WEB 설정 : `https://${DOMAIN}` || `http://localhost:${PORT}` **등록**
3. 내 애플리케이션 → 개요 탭
    - `Client ID`, `Client Secret` **확인**


## 엔드포인트
- JSON: `https://openapi.naver.com/v1/search/book.json`


## 요청 시 참고 사항
- 요청 헤더에 `X-Naver-Client-Id`, `X-Naver-Client-Secret` 포함

# 사전 준비
- 해당 서비스는 Admin 기능이 구현되어 있지 않음
- `member` 테이블에 `-1` 계정 추가
- `docker-compose.yml` 파일 수정
    - 해당 파일 `11번 ~ 12번` 라인
    - `db service` 3307 포트 오픈 : 데이터 삽입 완료 후 삭제
    - AWS 보안그룹 포트 확인 : 데이터 삽입 완료 후 삭제
- `image`, `member_image` 테이블에 `frontend/src/assets/base*.png` 추가(기본이미지 9개)
    - 토큰 + Postman => `-9 ~ -1` 까지 기본이미지 추가
        - Postman<br>
        ![Postman](https://github.com/user-attachments/assets/b68bd250-d1e6-4694-89c4-5bf3490611f0)
        - image Table<br>
        ![image-table](https://github.com/user-attachments/assets/ab8dc174-6f9f-46b4-8f34-98b8cb012ea4)
        - member_image Table<br>
        ![member_image-table](https://github.com/user-attachments/assets/c5c9102e-6ee9-4207-93a9-0ecd8a933a24)


# 환경 변수 (.env 생성)

> `프로젝트/scrap/book-scrap/.env.example` 참고

- **네이버 API 관련**
    - NAVER_API_URL: API 엔드포인트 (json 선택)
    - NAVER_CLIENT_ID: 클라이언트 아이디
    - NAVER_CLIENT_SECRET: 클라이언트 시크릿

- **MySQL 관련**
    - DATABASE_HOST
    - DATABASE_PORT
    - DATABASE_NAME
    - DATABASE_USERNAME
    - DATABASE_PASSWORD

# 외부 라이브러리
- python-dotenv: 환경 변수 관리
- mysql-connector-python: MySQL 연동
- requests: API 호출

# 명령어

> 실행 위치 : `프로젝트/scrap/book-scrap`

1. 가상화면 생성
    ```
    python -m venv venv
    ```
2. 가상환경 활성화
    - Windows (CMD/PowerShell)
      ```
      venv\Scripts\activate
      ```
    - Windows (Git Bash)
      ```
      source venv/Scripts/activate
      ```
    - Mac/Linux(터미널) 
      ```
      source venv/bin/activate
      ```
3. 패키지 설치
    ```
    pip install python-dotenv mysql-connector-python requests
    ```
4. 설치된 패키지 확인
    ```
    pip list
    ```
5. 코드 실행(15분 ~ 25분 소요), 에러코드가 보여도 문제 없음
    ```
    py main.py
    ```
    ```
    # 시작 출력문
    Start Scraping

    # 종료 출력문
    End Scraping
    ```
    - API 호출 최소 10000건 이상, 일일 할당량 확인 필요

## **그 외 명령어**

> 필요시 사용

-  가상환경 비활성화
    ```
    deactivate
    ```
    - 로컬에서 활성화 상태로 `npm run dev` 실행 시 `React`의 `BASE_URL`이 변화 됨
- 가상환경 삭제
    ```
    rm -rf venv  # Mac/Linux/Git Bash
    rmdir /s /q venv  # Windows (CMD)
    ```

# 데이터 수집 및 저장 전략
- 데이터 정제 및 중복 제거
  1. 기존 데이터와 중복 여부 확인 후 저장
  2. 필요에 따라 데이터 스키마에 맞게 정제 (공백 제거)
  3. 데이터 저장 (MySQL)
  4. 수집한 도서 정보를 book 테이블에 저장
  5. 검색 및 자동 완성 기능
  6. DB에 저장된 데이터를 기반으로 자동 완성 기능 제공

# 전체 흐름 요약
1. 환경 변수로 API 및 DB 정보 관리 → 배치 작업으로 미리 데이터 수집
2. 네이버 API 응답 데이터를 정제, 중복 제거 후 MySQL DB에 저장
3. 저장된 데이터를 활용해 자동 완성 및 검색 기능 제공 → 사용자 경험 개선