package org.example.book_report.repository;

import org.example.book_report.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.titleNormalized LIKE %:title% AND b.user.id = -1")
    Page<Book> findAllByTitleNormalizedContaining(String title, Pageable pageable);
}
