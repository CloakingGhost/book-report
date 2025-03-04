package org.example.book_report.repository;

import org.example.book_report.entity.BookReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

    //    @Query("""
//            SELECT DISTINCT br FROM BookReview br
//            JOIN FETCH br.image i
//            LEFT JOIN FETCH i.userImage ui
//            JOIN br.book b
//            WHERE b.titleNormalized LIKE CONCAT('%', :bookTitle, '%')
//            """)
    @Query("""
            SELECT DISTINCT br FROM BookReview br
            JOIN br.book b
            JOIN br.image i
            WHERE b.titleNormalized LIKE CONCAT('%', :bookTitle, '%')
            """)
    Page<BookReview> getBookReviews(@Param("bookTitle") String bookTitle, Pageable pageable);

}
