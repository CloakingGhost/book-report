package org.example.book_report.repository;

import org.example.book_report.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findAllByTitleNormalizedContaining(String title, Pageable pageable);
}
