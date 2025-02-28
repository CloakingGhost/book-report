package org.example.book_report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.Book;
import org.example.book_report.entity.BookReview;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 감상문 상세페이지
 */
@Getter
@Builder
public class BookReviewDetailResponseDto {

    private final String username;
    private final BookResponseDto items;
    private final String title;
    private final String content;
    private final boolean approved;
    private final LocalDateTime createdAt;



    public static BookReviewDetailResponseDto from(BookReview entity) {
        return BookReviewDetailResponseDto.builder()
                .username(entity.getUser().getUsername())
                .items(BookResponseDto.from(entity.getBook()))
                .title(entity.getTitle())
                .content(entity.getContent())
                .approved(entity.isApproved())
                .createdAt(entity.getCreatedAt())
                .build();
    }


    @Builder
    private static class BookResponseDto{
        private String title;
        private String author;
        private String publisher;

        private static BookResponseDto from(Book entity) {
            return BookResponseDto.builder()
                    .title(entity.getTitle())
                    .author(entity.getAuthor())
                    .publisher(entity.getPublisher())
                    .build();
        }
    }
}
