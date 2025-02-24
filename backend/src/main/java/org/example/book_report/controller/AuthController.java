package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @GetMapping("/test")
    public String test() {
        return "test";
    }


}
