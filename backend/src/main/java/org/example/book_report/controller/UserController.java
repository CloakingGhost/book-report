package org.example.book_report.controller;

import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.requestDto.SignupRequestDto;
import org.example.book_report.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@RequestParam SignupRequestDto signupRequestDto) {

        userService.signup(signupRequestDto);
        return ResponseEntity.ok(
                ApiResponse.ok(
                        "회원가입을 성공하였습니다.", "CREATED", null));
    }
}
