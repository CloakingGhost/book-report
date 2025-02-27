package org.example.book_report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.BookReview;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class BookReviewDetailResponseDto {

    private String username;



    public static BookReviewDetailResponseDto from(BookReview entity) {
        return BookReviewDetailResponseDto.

                builder().build();
    }
}
