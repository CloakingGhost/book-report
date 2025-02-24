package org.example.book_report.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.Role;
import org.example.book_report.entity.User;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    // validation TODO
    private String username;
    private String password;
    private String name;
    private String phoneNumber;

    public User toEntity() {

        return User.builder()
                .username(username)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .role(Role.ROLE_USER)
                .build();
    }
}
