package org.example.book_report.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;

@Getter
@RequiredArgsConstructor
public class TokenResponseDto {
    @JsonIgnore
    public static final String ACCESS_TOKEN = "accessToken";
    private final long tokenValidityInSeconds = 60 * 60 * 24 * 30; // 30일
    private final long tokenValidityToLogout = 0;
    private final String accessToken;
    @Value("${cookie.secure}")
    @JsonIgnore
    private boolean secure;

    // 생성된 JWT로 쿠키 생성
    // 헤더에 전송됨
    public ResponseCookie generateCookie() {

        return ResponseCookie
                .from(ACCESS_TOKEN, this.accessToken)
                .httpOnly(true) // XSS(Cross site scripting) attack 방지, 스크립트 코드 삽입 방지
                .secure(secure) // https 에서 암호화된 요청
//                .sameSite("None") // 서로 다른 도메인 간의 쿠키 전송에 대한 보안
                .sameSite("Lax") // 서로 다른 도메인 간의 쿠키 전송에 대한 보안
                .path("/") // 요청 URL에 반드시 포함되어야 하는 경로, 해당 URL이 없으면 쿠키를 보낼 수 없음
                .maxAge(tokenValidityInSeconds)
                .build();
    }

    public ResponseCookie generateLogoutCookie() {
        return ResponseCookie
                .from(ACCESS_TOKEN, null)
                .httpOnly(true) // XSS(Cross site scripting) attack 방지, 스크립트 코드 삽입 방지
                .secure(secure) // https 에서 암호화된 요청
                .sameSite("None") // 서로 다른 도메인 간의 쿠키 전송에 대한 보안
                .sameSite("Lax") // 서로 다른 도메인 간의 쿠키 전송에 대한 보안
                .path("/")
                .maxAge(tokenValidityToLogout)
                .build();
    }

}
