# 사용법

- 독서 감상문 공유 서비스 도서 데이터 저장 문서

## 사용 목적

- 네이버 API를 매번 호출하면 레이턴시와 비용 문제 발생 → 미리 데이터베이스에 도서 데이터를 저장해서 검색 속도 개선
- 자동 완성 기능 등 검색 시 사용자 경험 최적화
- 일일 API 호출 한도 : 일 25,000건

## 네이버 도서 검색 API
- 사용 API : 검색
- WEB 설정 : 프로젝트 IP

### 엔드포인트
- JSON: `https://openapi.naver.com/v1/search/book.json`


### 파라미터
- query: 검색어 (필수)
- display: 표시 결과 수
- start: 시작 위치 (페이지네이션)
- sort: 검색 결과 정렬 (예: 정확도순, 최신순)

### 요청 시 참고 사항
- 요청 헤더에 X-Naver-Client-Id와 X-Naver-Client-Secret 포함
- 응답은 JSON 배열로 도서 정보(제목, 저자, 출판사 등)와 이미지 정보 포함

## 환경 변수 및 외부 라이브러리
### 네이버 API 관련
- NAVER_API_URL: API 엔드포인트 (json 또는 xml 선택)
- NAVER_CLIENT_ID: 클라이언트 아이디
- NAVER_CLIENT_SECRET: 클라이언트 시크릿

### MySQL 관련
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_NAME
- DATABASE_USERNAME
- DATABASE_PASSWORD

### 외부 라이브러리
- python-dotenv: 환경 변수 관리
- mysql-connector-python: MySQL 연동
- requests: API 호출

```
pip install --target=. python-dotenv mysql-connector-python requests

```
> 해당 모듈 설치 방법 대신 가상화를 추천

## 데이터 수집 및 저장 전략
- 데이터 정제 및 중복 제거
  - 기존 데이터와 중복 여부 확인 후 저장
  - 필요에 따라 데이터 스키마에 맞게 정제 (공백 제거)
  - 데이터 저장 (MySQL)
  - 수집한 도서 정보를 books 테이블에 저장
  - 검색 및 자동 완성 기능
  - DB에 저장된 데이터를 기반으로 자동 완성 기능 제공

## 전체 흐름 요약
- 환경 변수로 API 및 DB 정보 관리 → 배치 작업으로 미리 데이터 수집
- 네이버 API 응답 데이터를 정제, 중복 제거 후 MySQL DB에 저장
- 저장된 데이터를 활용해 자동 완성 및 검색 기능 제공 → 사용자 경험 개선