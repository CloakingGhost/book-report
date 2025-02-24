package org.example.book_report.repository;

import java.util.Optional;
import org.example.book_report.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);
}
