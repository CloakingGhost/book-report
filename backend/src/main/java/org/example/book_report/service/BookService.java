package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.response.SearchBooksPageResponseDto;
import org.example.book_report.entity.Book;
import org.example.book_report.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public SearchBooksPageResponseDto findAllByTitle(String title, Pageable pageable) {

        Page<Book> books = bookRepository.findAllByTitleNormalizedContaining(title, pageable);

        return SearchBooksPageResponseDto.from(books);
    }
}
