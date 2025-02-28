# 빌드 스테이지
# 베이스 이미지
# 작업 디렉토리
# 의존성 설치
# 소스코드 복사
# 소스코드 빌드

# Build stage
FROM openjdk:21-jdk-slim AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY gradlew ./gradlew
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon


COPY src ./src
RUN ./gradlew build --no-daemon -x test

# 실행 스테이지
# 작업 디렉토리
# 빌드 스테이지의 결과 복사
# 포트 명시
# 실행

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar ./app.jar

EXPOSE 8080

CMD [ "java", "-jar", "app.jar" ]