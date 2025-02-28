package org.example.book_report.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.LoginRequestDto;
import org.example.book_report.dto.response.TokenResponseDto;
import org.example.book_report.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(@RequestBody LoginRequestDto requestDto) {

        TokenResponseDto token = authService.login(requestDto);

        return ResponseEntity.ok()
                .header(SET_COOKIE, token.generateCookie().toString())
                .body(ApiResponse.ok(token));

    }

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse<TokenResponseDto>> logout() {
        TokenResponseDto token = authService.logout();
        return ResponseEntity.ok()
                .header(SET_COOKIE, token.generateLogoutCookie().toString())
                .body(ApiResponse.ok(token));

    }


}
