package org.example.book_report.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.Role;
import org.example.book_report.entity.User;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    @NotBlank(message="username cannot be empty")
    private String username;
    @NotBlank(message="password cannot be empty")
    private String password;
    @NotBlank(message="name cannot be empty")
    private String name;

    @Length(min=11, max=11, message = "phone number must be 11 digits")
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
