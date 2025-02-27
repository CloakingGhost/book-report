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

    private DataDto data;
    private MultipartFile imageFile;

    @Getter
    @NoArgsConstructor
    public static class DataDto {
        private BookDto book;
        private ReviewDto review;

    }







    @Getter
    @NoArgsConstructor
    public static class BookDto {
        private Long bookId;
        private String title;
        private String author;
        private String publisher;

        public Book toEntity() {

            return Book.builder()
                    .title(title)
                    .author(author)
                    .publisher(publisher)
                    .build();
        }
    }


    @Getter
    @NoArgsConstructor
    public static class ReviewDto {
        private Long imageId;
        private String title;
        private String content;

        public BookReview toEntity(Image image, Book book) {
            return BookReview.builder()
                    .image(image)
                    .book(book)
                    .title(title)
                    .content(content)
                    .build();
        }
    }
}
