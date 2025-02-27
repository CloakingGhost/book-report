package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.BookReview;

@Builder
@Getter
public class BookReviewToggleApprovedResponseDto {
    private boolean approved;


    public static BookReviewToggleApprovedResponseDto from(BookReview entity) {
        return BookReviewToggleApprovedResponseDto.builder()
                .approved(entity.isApproved())
                .build();
    }
}
