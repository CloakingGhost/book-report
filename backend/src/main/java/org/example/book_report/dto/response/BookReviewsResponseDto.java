package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.BookReview;

import java.util.List;

/**
 * 메인 화면 감상문 목록에서 사용 됨
 * approved == true 인 경우 사용되는 Dto
 */
@Getter
@Builder
public class BookReviewsResponseDto {
    private final Long id;
    private final String title;
    private final String imageUrl;

    public static BookReviewsResponseDto from(BookReview entity) {
        return BookReviewsResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .imageUrl(entity.getImage().getImageUrl())
                .build();
    }
}
