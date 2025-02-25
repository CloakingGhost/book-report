package org.example.book_report.global.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;


    private final String secretKey = "1qy1q7y1q7y1q7y1q7y1q7y17qy1q7y1q7y1q7y1q7y1q7y1q7y1q7y1q7y1q7y";

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider(secretKey);
    }


    @Test
    void createToken() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");

        String token = jwtTokenProvider.createToken(authentication);
        assertNotNull(token);
        assertFalse(token.isEmpty());

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Base64.getEncoder().encodeToString(secretKey.getBytes()).getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        assertEquals("testUser", claims.getSubject());
        assertNotNull(claims.getExpiration());
    }
}