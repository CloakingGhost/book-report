package org.example.book_report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.book_report.entity.BookReview;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewResponseDto {
    private Long bookReviewId;

    public static CreateReviewResponseDto from(BookReview review) {

        return CreateReviewResponseDto.builder()
                .bookReviewId(review.getId())
                .build();
    }
}
