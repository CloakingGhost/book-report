package org.example.book_report.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.Book;
import org.example.book_report.entity.BookReview;
import org.example.book_report.entity.Image;
import org.springframework.web.multipart.MultipartFile;


@Getter
@NoArgsConstructor
public class CreateReviewRequestDto {
    private BookDto book;
    private ReviewDto review;

    public BookReview toEntity(Image image) {
        return BookReview.builder()
                .book(book.toEntity(image))
                .title(review.getTitle())
                .image(image)
                .content(review.getContent())
                .build();
    }

    // 내부 클래스 정의
    @Getter
    @NoArgsConstructor
    public static class BookDto {
        private Long bookId;
        private String title;
        private String author;
        private String publisher;

        public Book toEntity(Image imageFile) {
            return Book.builder()
                    .id(bookId)
                    .title(title)
                    .author(author)
                    .publisher(publisher)
                    .image(imageFile)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class ReviewDto {
        private Long imageId;
        private String title;
        private String content;
    }
}
