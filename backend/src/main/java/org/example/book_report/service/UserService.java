package org.example.book_report.service;

import java.util.Optional;
import org.example.book_report.dto.requestDto.SignupRequestDto;
import org.example.book_report.entity.User;
import org.example.book_report.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {
    UserRepository userRepository;


    public void signup(SignupRequestDto signupRequestDto) {

        checkExistUsername(signupRequestDto);
        // 디비 한번 찌르고 유저 생성 TODO

    }

    /**
     * username 중복 확인
     *
     * @param signupRequestDto 유저 회원가입 정보
     */
    private boolean checkExistUsername(SignupRequestDto signupRequestDto) {

        return userRepository.findByUsername(signupRequestDto.getUsername()).isPresent();
    }
}
