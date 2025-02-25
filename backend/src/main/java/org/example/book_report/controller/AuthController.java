package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.LoginRequestDto;
import org.example.book_report.dto.response.TokenResponseDto;
import org.example.book_report.service.AuthService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(@RequestBody LoginRequestDto requestDto) {
        final String SET_COOKIE = "Set-Cookie";

        TokenResponseDto token = authService.login(requestDto);

        return ResponseEntity.ok()
                .header(SET_COOKIE, token.generateCookie().toString())
                .body(ApiResponse.ok(token));

    }

    @GetMapping("/logout")
    public String logout(@CookieValue(TokenResponseDto.ACCESS_TOKEN) String accessToken) {

        return "logout";
    }


}
