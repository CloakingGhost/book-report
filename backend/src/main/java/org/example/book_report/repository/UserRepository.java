package org.example.book_report.repository;

import java.util.Optional;
import org.example.book_report.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
