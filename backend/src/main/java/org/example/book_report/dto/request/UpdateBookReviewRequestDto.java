package org.example.book_report.dto.request;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.BookReview;

@Getter
@Builder
public class UpdateBookReviewRequestDto {
    private final UpdateBookDto book;
    private final UpdateReviewDto review;



    @Getter
    public class UpdateBookDto{
        private Long bookId;
        private String title;
        private String author;
        private String publisher;
    }

    @Getter
    public class UpdateReviewDto{
        private Long cardId;
        private String title;
        private String content;

    }

}
