package org.example.book_report.repository;

import org.example.book_report.entity.BookReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

    @Query("""
            SELECT br FROM BookReview br
            LEFT JOIN br.image i
            LEFT JOIN i.userImage ui
            JOIN br.book b
            WHERE b.titleNormalized LIKE concat('%',:bookTitle,'%')
            order by br.createdAt DESC
            """)
    Page<BookReview> getBookReviews(@Param("bookTitle") String bookTitle, Pageable pageable);

    @Query("""
                SELECT br FROM BookReview br
                JOIN FETCH br.image i
                LEFT JOIN FETCH i.userImage ui
                JOIN br.user u
                WHERE u.username = :username
                  AND ( u.username=:loginedUsername OR br.approved = true)
                ORDER BY br.createdAt DESC
            """)
    Page<BookReview> getUserBookReviews(@Param("username") String username, Pageable pageable, @Param("loginedUsername") String loginedUsername);

    @Query("""
            SELECT br FROM BookReview br
            JOIN br.book b
            JOIN b.user u
            WHERE br.id=:reviewId
            """)
    Optional<BookReview> findByIdWithUser(@Param("reviewId") Long reviewId);

}
