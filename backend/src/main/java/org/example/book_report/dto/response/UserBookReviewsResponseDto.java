package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.BookReview;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

/**
유저별 감상문 모음 조회에서 사용됨
 **/

@Getter
@Builder
public class UserBookReviewsResponseDto {
    private List<UserBookReviewsDto> userBookReviews;

    private boolean hasNext;

    public static  UserBookReviewsResponseDto from(Page<BookReview> userBookReviews) {
        return UserBookReviewsResponseDto.builder()
                .userBookReviews(
                        userBookReviews.getContent().stream().map(
                                UserBookReviewsDto::from
                        ).toList()
                )
                .hasNext(userBookReviews.hasNext())
                .build();


    }

    @Getter
    @Builder
    static class UserBookReviewsDto {
        private final Long bookId;
        private final String cardTitle;
        private final String cardImageUrl;
        private final boolean approved;

        public static UserBookReviewsDto from(BookReview entity) {
            return UserBookReviewsDto.builder()
                    .bookId(entity.getId())
                    .cardTitle(entity.getTitle())
                    .cardImageUrl(entity.getImage().getImageUrl())
                    .approved(entity.isApproved())
                    .build();
        }

    }

}
