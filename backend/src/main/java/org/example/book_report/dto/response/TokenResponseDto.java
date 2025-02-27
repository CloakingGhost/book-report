package org.example.book_report.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;

@Getter
@RequiredArgsConstructor
public class TokenResponseDto {
    @JsonIgnore
    public static final String ACCESS_TOKEN = "accessToken";
    private final String accessToken;

    public ResponseCookie generateCookie() {

        return ResponseCookie
                .from(ACCESS_TOKEN, this.accessToken)
                .httpOnly(true) // XSS(Cross site scripting) attack 방지, 스크립트 코드 삽입 방지
                .secure(true) // https 에서 암호화된 요청
                .sameSite("None") // 서로 다른 도메인 간의 쿠키 전송에 대한 보안
//                .path() // 요청 URL에 반드시 포함되어야 하는 경로, 해당 URL이 없으면 쿠키를 보낼 수 없음
                .build();
    }

    public ResponseCookie generateSignOutCookie() {
        return ResponseCookie
                .from("refreshToken", "")
                .maxAge(1)
                .build();
    }

}
