package org.example.book_report.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.requestDto.SignupRequestDto;
import org.example.book_report.dto.responseDto.CheckExistUserNameResponseDto;
import org.example.book_report.exception.ResourceConflictException;
import org.example.book_report.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@RequestBody @Valid SignupRequestDto signupRequestDto) {

        userService.signup(signupRequestDto);

        return ResponseEntity.ok(
                ApiResponse.ok(
                        "회원가입을 성공하였습니다.", "CREATED", null)); // API 명세 TODO
    }

    @GetMapping("/signup/verify")
    public ResponseEntity<ApiResponse<CheckExistUserNameResponseDto>> checkExistUsername(
            @RequestParam String username) {
        if (userService.checkExistsUsername(username)) {

            throw new ResourceConflictException("입력값 확인 필요");
        }

        return ResponseEntity.ok(
                ApiResponse.ok("Ok", "OK",

                        new CheckExistUserNameResponseDto(
                                userService.checkExistsUsername(username)
                        )
                )
        );
    }


}
