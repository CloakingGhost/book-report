package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.requestDto.SignupRequestDto;
import org.example.book_report.entity.User;
import org.example.book_report.global.exception.ResourceConflictException;
import org.example.book_report.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public void signup(SignupRequestDto signupRequestDto) {

        boolean flag = checkExistsUsername(signupRequestDto.getUsername());

        if (flag) {

            throw new ResourceConflictException("입력값 확인 필요");
        }

        User user = signupRequestDto.toEntity();
        String encryptedPassword= passwordEncoder.encode(signupRequestDto.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);
    }


    /**
     *
     * @param userName
     * @return username 중복 여부
     */
    public boolean checkExistsUsername(String userName) {

        return userRepository.existsByUsername(userName);
    }

}
