package org.example.book_report.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


import org.example.book_report.dto.request.LoginRequestDto;
import org.example.book_report.dto.response.TokenResponseDto;
import org.example.book_report.global.security.jwt.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import org.example.book_report.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    public TokenResponseDto login(LoginRequestDto requestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDto.getUsername(),
                        requestDto.getPassword()
                )
        );

//        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.createToken(authentication);

        return new TokenResponseDto(jwt);
    }

    public TokenResponseDto logout(){


        return new TokenResponseDto(null);
    }
}