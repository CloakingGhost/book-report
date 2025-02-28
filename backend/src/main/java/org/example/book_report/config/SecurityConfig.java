package org.example.book_report.config;

import lombok.RequiredArgsConstructor;
import org.example.book_report.global.security.handler.CustomAccessDeniedHandler;
import org.example.book_report.global.security.handler.JwtAuthenticationEntryPoint;
import org.example.book_report.global.security.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
                "/api/auth/login",
                "/api/auth/signup",
                "/api/auth/signup/verify",
                "/error"
        );
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//
//                        ).permitAll()
                        .anyRequest().authenticated()
                )


                // 유효한 jwt인지 확인
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling(exception -> exception
                        // 권한이 없는 리소스 접근 시
                        .accessDeniedHandler(accessDeniedHandler)
                        // 인증되지 않은 사용자가 보호된 리소스에 접근 시
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )

        ;


        return http.build();
    }

    /**
     * 비밀번호 암호화
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 사용자 정보 확인
     * JWT 생성 전 로그인 입력값 확인 절차 수행
     *
     * @param userDetailsService 사용자 확인 비즈니스 로직 수행
     * @param passwordEncoder    암호화 방식 지정
     */
    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authProvider);
    }
}
