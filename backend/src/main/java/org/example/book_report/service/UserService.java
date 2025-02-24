package org.example.book_report.service;

import org.example.book_report.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    UserRepository userRepository;


    public void signup() {
        // 디비 한번 찌르고 유저 생성 TODO
    }
}
