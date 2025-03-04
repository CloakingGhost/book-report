package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.BookReview;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 메인 화면 감상문 목록에서 사용되는 Dto
 */
@Getter
@Builder
public class BookReviewsWithPageResponseDto {
    private List<BookReviewsResponseDto> items;

    private boolean hasNext;

    public static BookReviewsWithPageResponseDto from(Page<BookReview> bookReviews) {
        return BookReviewsWithPageResponseDto.builder()
                .items(
                        bookReviews.getContent().stream().map(
                                BookReviewsResponseDto::from
                        ).toList()
                )
                .hasNext(bookReviews.hasNext())
                .build();
    }

    @Getter
    @Builder
    static class BookReviewsResponseDto {
        private final Long id;
        private final String title;
        private final String imageUrl;
        private final boolean approved;


        public static BookReviewsResponseDto from(BookReview entity) {
            return BookReviewsResponseDto.builder()
                    .id(entity.getId())
                    .title(entity.getTitle())
                    .imageUrl(entity.getImage().getImageUrl())
                    .approved(entity.isApproved())
                    .build();
        }
    }
}
