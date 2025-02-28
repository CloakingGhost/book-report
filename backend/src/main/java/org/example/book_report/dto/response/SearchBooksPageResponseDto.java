package org.example.book_report.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.Book;
import org.springframework.data.domain.Page;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchBooksPageResponseDto {
    private boolean hasNext;
    private List<BookListResponseDto> bookList = new ArrayList<>();

    public static SearchBooksPageResponseDto from(Page<Book> books) {
        boolean hasNext = books.hasNext();

        return SearchBooksPageResponseDto.builder()
                .bookList(books.stream().map(BookListResponseDto::from).toList())
                .hasNext(books.hasNext())
                .build();
    }

    @Getter
    @Builder
    private static class BookListResponseDto {
        private Long bookId;
        private String title;
        private String author;
        private String publisher;
        private String imageUrl;

        public static BookListResponseDto from(Book book) {
            return BookListResponseDto.builder()
                    .bookId(book.getId())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .publisher(book.getPublisher())
                    .imageUrl(book.getImage().getImageUrl())
                    .build();
        }
    }
}
